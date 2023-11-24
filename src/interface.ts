interface IdentityProviderWellKnown {
  provider_urls: string[];
}

interface IdentityProviderIcon {
  url: string;
  size?: number;
}

interface IdentityProviderBranding {
  background_color?: string;
  color?: string;
  icons: IdentityProviderIcon[];
  name?: string;
}

interface IdentityProviderAPIConfig {
  accounts_endpoint: string;
  client_metadata_endpoint: string;
  id_assertion_endpoint: string;
  login_url: string;
  branding: IdentityProviderBranding;
}

interface IdentityProviderAccount {
  id: string;
  name: string;
  email: string;
  given_name: string;
  picture: string;
  approved_clients: string[];
  login_hints: string[];
}

interface IdentityProviderAccountList {
  accounts: IdentityProviderAccount[];
}

