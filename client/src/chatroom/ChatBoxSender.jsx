import React from "react";
import { Avatar } from "@mui/material";

export default function ChatBoxSender({ avatar, user, message }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
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
          backgroundColor: "#FFFFFF99",
          borderRadius: 10,
          maxWidth: "60%",
          marginLeft: 10,
          color: "black",
        }}
      >
        <strong style={{ fontSize: 13 }}>{user}</strong>
        <br />
        {message}
      </div>
    </div>
  );
}
