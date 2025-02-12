import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export function Header() {

  const navigate = useNavigate();

  const [user, setUser] = useState(undefined);

  const getUser = async () => {
    const response = await fetch('http://localhost:3333/api/user', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();
    // set user
    setUser(json);
    console.log(json);
  }

  return (
    <div className={"d-flex justify-content-end p-3 bg-dark text-white"}>
      <div>
        <button className="btn btn-primary" onClick={() => navigate('/login')}>Login with Discord</button>
        <button className="btn btn-primary" onClick={getUser}>Get User</button>
      </div>
    </div>
  );
}
