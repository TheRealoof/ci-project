import environment from '../../../environment';
import { useEffect, useRef } from 'react';

export function LoginCallback() {
  const code = new URLSearchParams(window.location.search).get('code');

  const hasFetchedToken = useRef(false);

  const fetchToken = () => {
    if (hasFetchedToken.current) {
      return;
    }
    hasFetchedToken.current = true;

    const redirectUri = encodeURIComponent(
      environment.appBaseUrl + '/login/callback'
    );
    const url = `${environment.apiBaseUrl}/api/auth/token?code=${code}&redirect_uri=${redirectUri}`;
    fetch(url, {
      method: 'POST',
      credentials: 'include',
    })
      .then(async (response) => {
        if (response.ok) {
          window.location.href = '/';
        } else {
          throw new Error('Failed to fetch token');
        }
      })
  };

  useEffect(() => {
    fetchToken();
  }, [fetchToken]);

  return <div>Logging in... (code: {code})</div>;
}
