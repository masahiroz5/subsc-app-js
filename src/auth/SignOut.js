import { useState } from "react";
import { signout } from "../firebase/firebase";

const SignOut = () => {
  return (
    <div>
      <button type={"button"} onClick={signout}>
        サインアウト
      </button>
    </div>
  );
};

export default SignOut;
