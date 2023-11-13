const idpHost = 'http://idp-1.localhost:8080';
// const idpHost = process.env.IDP_HOST || 'http://idp-1.localhost:8080';

const requestOptions = {
  method: 'GET',
  headers: {
    'Accept': 'application/json',
    'Sec-Fetch-Dest': 'webidentity',
  }
};


describe('Identity Provider HTTP API', () => {
  describe('the Well-Known file', () => {
    const wellKnownFileURL = idpHost + '/.well-known/web-identity';
    it('should return well-known file', async () => {
      const response = await fetch(wellKnownFileURL, requestOptions);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(Array.isArray(data.provider_urls)).toBeTruthy();
    });
  })

  describe('the config file', () => {
    // const configFileURL = idpHost + '/config.json';
    const configFileURL = idpHost + '/fedcm.json';
    it('should return config file', async () => {
      const response = await fetch(configFileURL, requestOptions);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.accounts_endpoint).toEqual(expect.any(String));
      expect(data.client_metadata_endpoint).toEqual(expect.any(String));
      expect(data.id_assertion_endpoint).toEqual(expect.any(String));
      expect(data.branding).toEqual(expect.any(Object));
    });
  })

  describe('accounts list endpoint', () => {
    // const accountsEndpointURL = idpHost + '/accounts_list';
    const accountsEndpointURL = idpHost + '/fedcm/accounts_endpoint';
    it('should return accounts list', async () => {
      const response = await fetch(accountsEndpointURL, requestOptions);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(Array.isArray(data.accounts)).toBe(true);
    });
  })

  describe('client metadata', () => {
    // const clientMetadataEndpointURL = idpHost + '/client_metadata';
    const clientMetadataEndpointURL = idpHost + '/fedcm/client_metadata_endpoint';
    it('should return client metadata', async () => {
      const response = await fetch(clientMetadataEndpointURL, {
        ...requestOptions,
        headers: {
          ...requestOptions.headers,
          'Origin': 'https://rp.test/',
        },
      });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.privacy_policy_url).toEqual(expect.any(String));
      expect(data.terms_of_service_url).toEqual(expect.any(String));
    });
  })

  describe.skip('TODO: wip identity assertion endpoint', () => {
    // const idAssertionEndpointURL = idpHost + '/fedcm_assertion_endpoint';
    const idAssertionEndpointURL = idpHost + '/fedcm/token_endpoint';
    let authCookie = null;

    beforeAll(async () => {
      authCookie = await getIdpSessionCookie();
    });

    it('should return identity assertion', async () => {
      if (!authCookie) {
        throw new Error('Authentication cookie not obtained');
      }

      const response = await fetch(idAssertionEndpointURL, {
        ...requestOptions,
        method: 'POST',
        headers: {
          ...requestOptions.headers,
          'Origin': 'https://rp.test/',
          'Content-Type': 'application/x-www-form-urlencoded',
          'Cookie': authCookie
        },
        body: new URLSearchParams({
          client_id: 'your_client_id',
          nonce: 'Ct60bD',
          account_id: '123',
          disclosure_text_shown: 'true',
        }),
      });

      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.token).toEqual(expect.any(String));
    });
  })

});

async function getIdpSessionCookie() {
  const loginEndpointURL = idpHost + '/api/auth/signin'
  const email = process.env.IDP_USER || 'foobar@example.org'
  const password = process.env.IDP_PASSWORD || 'password'
  let authCookie;

  const signInResponse = await fetch(loginEndpointURL, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      secret: password,
    }),
  });

  if (signInResponse.ok) {
    const setCookieHeader = signInResponse.headers.get('set-cookie');
    authCookie = setCookieHeader ? setCookieHeader.split(';')[0] : null;
  } else {
    console.error('Failed to sign in');
  }

  console.log(">>>>>>", authCookie)

  return authCookie;
}
