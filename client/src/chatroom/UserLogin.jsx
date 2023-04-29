import React, { useState } from "react";
import _ from "lodash";
import { Button, TextField } from "@mui/material";

export default function UserLogin({ setUser }) {
  const [user, setAUser] = useState("");

  const handleSetUser = () => {
    localStorage.setItem("user", user);
    setUser(user);
    localStorage.setItem(
      "avatar",
      `https://picsum.photos/id/${_.random(1, 1000)}/200/300`
    );
  };

  return (
    <div>
      <h1>Socket.io Chat demo</h1>
      <TextField
        style={{ margin: 10, width: "25%" }}
        value={user}
        onChange={(e) => setAUser(e.target.value)}
        placeholder="input name"
        variant="outlined"
      />
      <Button onClick={() => handleSetUser()}>Login</Button>
    </div>
  );
}
