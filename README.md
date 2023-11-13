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

```sh
npm run test
```

**Not yet supported:**

```sh
# IdP to test
export IDP_HOST=http://idp-1.localhost:8080
# An RP configured with the IdP
export RP_HOST=http://rp.localhost:7080

./scripts/run-idp-test
```
