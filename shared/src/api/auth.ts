import Config from "../config";

export function googleAuth(selectAccount?: boolean, state?: string) {
  const params = new URLSearchParams({
    client_id: Config.GOOGLE_OAUTH_CLIENT_ID,
    redirect_uri: `${window.location.origin}/auth/callback`,
    response_type: "code",
    scope: "openid email profile",
    access_type: "offline",
    state:
      state ??
      encodeURIComponent(
        window.location.pathname + window.location.search + window.location.hash
      )
  });

  if (selectAccount) {
    params.set("prompt", "select_account");
  }

  window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}
