import { useState } from "react";
import { signupWithEmailAndPassword } from '../firebase/firebase';


const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
  const signup = async (event) => {
    event.preventDefault();
    const user = await signupWithEmailAndPassword(email, password);
    console.log('サインアップuser情報', user); 
  };

  return (
    <div>
      <form onSubmit={signup}>
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
        <button type="submit">登録</button>
      </form>
    </div>
  );
};

export default SignUp;
