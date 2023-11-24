#!/bin/bash

IDP_HOST="http://idp-1.localhost:8080"
AUTH_ENDPOINT="${IDP_HOST}/api/auth/signin"
EMAIL=foobar@example.org
PASSWORD=password

# Perform authentication and extract the session cookie
COOKIE=$(curl "${AUTH_ENDPOINT}" \
  -H "Content-Type: application/json" \
  -d "{\"email\": \"${EMAIL}\", \"secret\": \"${PASSWORD}\"}" \
  -i | grep -i 'Set-Cookie' | awk -F': ' '{gsub(/;.*/, "", $2); print $2}')

if [ -z "$COOKIE" ]; then
  echo "Authentication failed. Check your credentials and authentication endpoint."
fi

export FEDCM_IDP_AUTH_COOKIE="${COOKIE}"
export FEDCM_IDP_HOST="${IDP_HOST}"

echo "IDP_HOST: ${IDP_HOST}"
echo "AUTH_ENDPOINT: ${AUTH_ENDPOINT}"
echo "Cookie: ${COOKIE}"
echo "Authentication successful. Cookie: ${FEDCM_IDP_AUTH_COOKIE}"
echo "API URL: ${FEDCM_IDP_HOST}"

