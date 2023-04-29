import React, { useState } from "react";
import { Button, TextareaAutosize } from "@mui/material";
import { useTheme } from '@mui/material/styles';


export default function InputText({ addMessage }) {
  const [message, setMessage] = useState("");
  const theme = useTheme();
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
        marginTop: "1.75rem",
        marginBottom: "0.75rem",
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
          padding: 10,
          fontSize: 14,
          fontFamily: "Roboto",
          marginRight: 10,
          borderWidth: 2,
          border: "1px solid #2c5601",
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
          backgroundColor: theme.palette.primary.main,
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
