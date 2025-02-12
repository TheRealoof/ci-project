// Uncomment this line to use CSS modules
// import styles from './app.module.scss';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from './routes/home/home';
import { Login } from './routes/login/login';
import { LoginCallback } from './routes/login-callback/login-callback';

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/callback" element={<LoginCallback />} />
      </Routes>
    </Router>
  );
}

export default App;
