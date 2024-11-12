import { createMiddleware } from "hono/factory";
import { HTTPException } from "hono/http-exception";
import { JWK, jwtVerify } from "jose";
import { JWTExpired } from "jose/errors";
import { verify } from "jsonwebtoken";

type User = {
  id: string;
  email: string;
  roles: string[];
};

const verifyJwtToken = async ({token, jwk, issuer, audience}: {token: string, jwk: string, issuer: string, audience: string}): Promise<User> => {
  const parsedJwk = JSON.parse(jwk) as JWK;

  try {
    const jwt = await jwtVerify<{ asdf: string}>(token, parsedJwk,
      {
        issuer,
        audience
      }
    );

    if (!jwt.payload.sub || typeof jwt.payload.email !== 'string' || !Array.isArray(jwt.payload.roles)) {
      throw new HTTPException(401, { message: "Invalid JWT token." });
    }
  
    return {
      id: jwt.payload.sub,
      email: jwt.payload.email,
      roles: jwt.payload.roles
    }
  
  } catch (error) {
    if (error instanceof JWTExpired) {
      throw new HTTPException(401, { message: "Expired JWT token." });
    }

    console.warn({ message: "Received invalid JWT token in request.", error });
    throw new HTTPException(401, { message: "Invalid JWT token." });
  }
}

export const auth = createMiddleware<{Bindings: Env, Variables: {
  user: {
    id: string;
    email: string;
  }
}}>(async (c, next) => {
  const authorization = c.req.header("Authorization");

  if (!authorization) {
    throw new HTTPException(401, { message: "Missing 'Authorization' header." });
  }

  const [scheme, token] = authorization.split(" ");

  if (!scheme || !token) {
    throw new HTTPException(401, { message: "Unexpected 'Authorization' header." });
  }

  switch (scheme) {
    case "Bearer":
      const user = await verifyJwtToken({
        token,
        jwk: c.env.AUTHORIZATION_TOKEN_JWK,
        issuer: c.env.AUTHORIZATION_TOKEN_ISSUER,
        audience: c.env.AUTHORIZATION_TOKEN_AUDIENCE
      })

      c.set("user", user);
      break;
    case "Token":
      throw new HTTPException(405, { message: "Token authentication not supported yet." });
    default:
      throw new HTTPException(401, { message: "Unexpected 'Authorization' scheme." });
  }

  next();
});