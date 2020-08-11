export const environment = {
    production: false,
    apiSearchUrl: 'https://localhost:44316/api/search',
    apiFavoritesUrl: 'https://localhost:44316/api/favorites',
    authority: "https://localhost:44316",
    client_id: "github-search-app",
    scope: 'openid profile email roles api',
    response_type: 'id_token token',
    redirect_uri: "https://localhost:44316/assets/oidc-login-redirect.html",
    post_logout_redirect_uri: "https://localhost:44316/index.html?postLogout=true",
  };
  