import { useEffect, useState } from 'react';
import environment from '../../../environment';

export function Messages() {
  const [guilds, setGuilds] = useState([]);

  const fetchGuilds = async () => {
    const url = `${environment.apiBaseUrl}/api/messages`;
    const response = await fetch(url, {
      credentials: 'include',
    });
    return await response.json();
  };

  useEffect(() => {
    if (guilds.length) return;

    fetchGuilds().then((data) => {
      if (data.length) {
        setGuilds(data);
      }
    });
  }, [guilds]);

  const guildClicked = (guild: never) => {
    console.log(guild);
  };

  return (
    <div>
      <h1>Messages</h1>

      <div>
        <h2>Serveurs</h2>
        {guilds.map((guild) => (
          <button
            onClick={() => guildClicked(guild)}
            key={guild['id']}
            className={'accordion-button'}
          >
            {guild['name']}
          </button>
        ))}
      </div>
    </div>
  );
}
