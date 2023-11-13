// TODO: Would be cool if these interfaces could be matched against what the FedCM IdP is returning.

interface IdentityProviderWellKnown {
  provider_urls: string[];
}

interface IdentityProviderIcon {
  url: string;
  size?: number; // Optional property
}

interface IdentityProviderBranding {
  background_color?: string; // Optional property
  color?: string; // Optional property
  icons: IdentityProviderIcon[];
  name?: string; // Optional property
}

interface IdentityProviderAPIConfig {
  accounts_endpoint: string;
  client_metadata_endpoint: string;
  id_assertion_endpoint: string;
  login_url: string; // Assuming login_url is a required property (not mentioned in the provided dictionary)
  branding: IdentityProviderBranding;
}
