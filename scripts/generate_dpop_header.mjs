import { createDpopHeader, generateDpopKeyPair } from '@inrupt/solid-client-authn-core';
const cssUrl = `http://idp-1.localhost:8080/`
const dpopKey = await generateDpopKeyPair();
const tokenUrl = `${cssUrl}.oidc/token`;
const dpopHeader = await createDpopHeader(tokenUrl, 'POST', dpopKey);
console.log(dpopHeader)


