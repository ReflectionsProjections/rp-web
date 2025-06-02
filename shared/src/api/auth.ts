export function googleAuth(clientId: string, selectAccount?: boolean) {
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: `${window.location.origin}/auth/callback`,
    response_type: "code",
    scope: "openid email profile",
    access_type: "offline",
    state: encodeURIComponent(window.location.pathname + window.location.search)
  });

  if (selectAccount) {
    params.set("prompt", "select_account");
  }

  window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}
