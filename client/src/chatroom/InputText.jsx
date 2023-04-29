import React, { useState } from "react";
import { Button, TextareaAutosize } from "@mui/material";

export default function InputText({ addMessage }) {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    addMessage({
      message,
    });
    setMessage("");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TextareaAutosize
        rows={6}
        placeholder="write something..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{
          width: "60%",
          height: 40,
          borderRadius: 10,
          borderWidth: 0,
          padding: 10,
          fontSize: 14,
          fontFamily: "Roboto",
          marginRight: 10, // Add marginRight here to control spacing
        }}
      />
      <Button
        onClick={() => sendMessage()}
        style={{
          width: "8%",
          height: 40,
          fontWeight: "bold",
          borderRadius: 10,
          fontSize: 12,
          backgroundColor: "#03A9F4",
          borderWidth: 0,
          color: "#fff",
          fontFamily: "Roboto",
        }}
      >
        Send
      </Button>
    </div>
  );
}
