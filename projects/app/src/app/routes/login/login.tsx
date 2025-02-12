import environment from '../../../environment';
import { useEffect } from 'react';

export function Login() {
  const redirectToDiscordLogin = () => {
    // fetch login url from the server
    const redirectUri = encodeURIComponent(
      environment.appBaseUrl + '/login/callback'
    );
    const url = `${environment.apiBaseUrl}/api/auth?redirect_uri=${redirectUri}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        window.location.href = data.url;
      });
  };

  useEffect(() => {
    redirectToDiscordLogin();
  }, []);

  return (
    <div>
      <h1>Login with Discord</h1>
    </div>
  );
}
