import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";



function Login(props) {
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [usernameInput, setUsernameInput] = useState("");

  const history = useHistory();
  useEffect(() => {
    if (username) {
      history.push('/review');
    }
  }, [history, username]);


  const takeMeThere = () => {
    localStorage.setItem("username", usernameInput);
    setUsername(usernameInput);
    history.push("/review");
  };

  return (
    <div>
        <label className="user">Username:</label>
        <input
          value={props.usernameInput}
          onChange={(e) => setUsernameInput(e.target.value)}
      />
      <button onClick={takeMeThere}>Submit</button>
    </div>
  )
}

export default Login