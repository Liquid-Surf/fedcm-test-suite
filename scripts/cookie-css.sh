#!/bin/bash
# require jq

IDP_HOST="http://idp-1.localhost:8080"
AUTH_ENDPOINT=$(curl ${IDP_HOST}/.account/ | jq -r .controls.password.login)
EMAIL=foobar@example.org
PASSWORD=password
# Perform authentication and extract the session cookie
COOKIE=$(curl "${AUTH_ENDPOINT}" \
  -H "Content-Type: application/json" \
  -d "{\"email\": \"${EMAIL}\", \"password\": \"${PASSWORD}\"}" \
  | jq -r .authorization
  )

COOKIE="css-account=$COOKIE"
echo COOKIE $COOKIE

if [ -z "$COOKIE" ]; then
  echo "Authentication failed. Check your credentials and authentication endpoint."
fi

export FEDCM_IDP_AUTH_COOKIE="${COOKIE}"
# We use nonce to pass the DPoP header, see
# https://github.com/fedidcg/FedCM/issues/572
export FEDCM_IDP_NONCE="$(node ./scripts/generate_dpop_header.mjs)"
export FEDCM_IDP_HOST="${IDP_HOST}"

echo "IDP_HOST: ${IDP_HOST}"
echo "AUTH_ENDPOINT: ${AUTH_ENDPOINT}"
echo "Nonce: ${FEDCM_IDP_NONCE}"
echo "Authentication successful. Cookie: ${FEDCM_IDP_AUTH_COOKIE}"
echo "API URL: ${FEDCM_IDP_HOST}"

