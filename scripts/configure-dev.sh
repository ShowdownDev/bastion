#!/bin/sh

# This script is used to configure the development environment. It downloads the JWK keys from the Keycloak server and saves them to the .dev.vars file.
# As the development keycloak server is ephemeral, the JWK keys are not persisted and need to be downloaded every time the server is started.

set -e

echo "Downloading JWK keys from http://localhost:8080/realms/Showdown/protocol/openid-connect/certs and saving them to .dev.vars"

JWK_KEYS=$(curl -s http://localhost:8080/realms/Showdown/protocol/openid-connect/certs | jq .keys[1] -c)
echo "AUTHORIZATION_TOKEN_JWK='$JWK_KEYS'" > .dev.vars