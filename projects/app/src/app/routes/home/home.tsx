import { useNavigate } from 'react-router-dom';

export function Home() {

  const navigate = useNavigate();

  const getUser = async () => {
    const response = await fetch('http://localhost:3333/api/user', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();
    console.log(json);
  }

  return (
    <div>
      <h1>Welcome to your new app!</h1>
      <button onClick={() => navigate('/login')}>Login with Discord</button>
      <button onClick={getUser}>Get User</button>
    </div>
  );
}
