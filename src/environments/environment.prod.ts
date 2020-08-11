export const environment = {
  production: true,
  apiSearchUrl: 'https://githubsearchapp.azurewebsites.net//api/search',
  apiFavoritesUrl: 'https://githubsearchapp.azurewebsites.net//api/favorites',
  authority: "https://githubsearchapp.azurewebsites.net/:44316",
  client_id: "github-search-app",
  scope: 'openid profile email roles api',
  response_type: 'id_token token',
  redirect_uri: "https://githubsearchapp.azurewebsites.net//assets/oidc-login-redirect.html",
  post_logout_redirect_uri: "https://githubsearchapp.azurewebsites.net//index.html?postLogout=true",
};
 