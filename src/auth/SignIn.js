import { useState } from "react";
import { signinWithEmailAndPassword } from '../firebase/firebase';


const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
  const singin = async (event) => {
    event.preventDefault();
    const user = await signinWithEmailAndPassword(email, password);
    console.log('サインインuser情報', user);
  };

  return (
    <div>
      <form onSubmit={singin}>
        <input
          type="text"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit">サインイン</button>
      </form>
    </div>
  );
};

export default SignIn;
