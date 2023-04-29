import React from "react";
import { Avatar } from "@mui/material";

export default function ChatBoxReciever({ avatar, user, message }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        flexDirection: "row",
      }}
    >
      <Avatar
        sx={{ width: 45, height: 45 }}
        src={avatar}
        alt={user}
      />
      <div
        style={{
          padding: 10,
          backgroundColor: "#03A9F4",
          borderRadius: 10,
          maxWidth: "60%",
          marginLeft: 10,
          color: "white",
        }}
      >
        <strong style={{ fontSize: 13 }}>{user}</strong>
        <br />
        {message}
      </div>
    </div>
  );
}