import environment from '../environment';

export default {
  getDiscordAuthUrl(redirectUri: string): string {
    const clientId = environment.discordClientId;
    const scope = 'guilds identify';
    const params = new URLSearchParams({
      client_id: clientId,
      response_type: 'code',
      redirect_uri: redirectUri,
      scope: scope,
    });
    const url = `https://discord.com/oauth2/authorize`;
    return `${url}?${params}`;
  },

  async exchangeToken(code: string, redirectUri: string): Promise<string> {
    const clientId = environment.discordClientId;
    const clientSecret = environment.discordClientSecret;
    const params = new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: "authorization_code",
      code: code,
      redirect_uri: redirectUri,
    });
    const url = `https://discord.com/api/oauth2/token`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept-Encoding': 'application/x-www-form-urlencoded',
      },
      body: params,
    });
    const json = await response.json();
    if (!response.ok) {
      throw new Error(json);
    }

    return json.access_token;
  }
};
