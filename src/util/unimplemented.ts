import { Context } from "hono";

export const unimplemented = (ctx: Context) => ctx.text("Not implemented yet", 501);