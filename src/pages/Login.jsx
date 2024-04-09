import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/FakeAuthContext";
import PageNav from "../components/PageNav";

import styles from "./Login.module.css";
import Button from "../components/button/Button";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const {isAuthenticated, login} = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");

  useEffect(() => {
    if(isAuthenticated) navigate("/app", { replace: true })
  }, [isAuthenticated, navigate])
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log({email, password});
    if(email && password) 
      login(email, password);
    
    // if(!isAuthenticated) {
    //   alert('Wrong email or password');
    //   return;
    // }      
  }

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type='primary'>Login</Button>
        </div>
      </form>
    </main>
  )
}
