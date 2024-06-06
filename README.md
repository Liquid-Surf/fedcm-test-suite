# FedCM Test Suite

Tests if your IdP implements all FedCM endpoints according to the [spec](https://fedidcg.github.io/FedCM/).

## Supported

The test suite is currently only used against the [FedCM Prototyping IdP](https://github.com/asr-enid/fedcm-idp-typescript).

- [x] [The Well-Known File that points to a Manifest](https://fedidcg.github.io/FedCM/#idp-api-well-known)
- [x] [The config file in an agreed upon location that points to](https://fedidcg.github.io/FedCM/#idp-api-config-file)
- [x] [Accounts list endpoint](https://fedidcg.github.io/FedCM/#idp-api-accounts-endpoint)
- [x] [Client Metadata endpoint](https://fedidcg.github.io/FedCM/#idp-api-client-id-metadata-endpoint)
- [ ] [Identity assertion endpoint](https://fedidcg.github.io/FedCM/#idp-api-id-assertion-endpoint)

## How to Run

Follow the instructions on [FedCM Prototyping IdP](https://github.com/asr-enid/fedcm-idp-typescript) to start the IdP with FedCM support.

For some endpoints an auth cookie is needed. Make sure to register an account with the IdP that can be used for testing. In the repo we use the following account:
email: foobar@example.org
password: password

```sh
. ./scripts/cookie.sh
```

This script sets a few ENVs that will be needed to run the test suite. Update with your information.

```sh
npm ci
npm run test
```


## TODO
 - more explicit when cookie is not set

 - add fedcm-idp-typescript as a submodul, or create a monorepo
 - add script to start test with achim's code
 - add fedcm css as submodule
 - add script to test with css
