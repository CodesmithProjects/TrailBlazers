import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { BrowserRouter } from "react-router-dom";


const container = document.getElementById('root') as HTMLElement;
ReactDOM.createRoot(container).render(
  <React.Fragment>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.Fragment>
)






//04/22 ---latest code from previous group
//Keep a copy of the previous code here, as a fallback
// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.Fragment>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </React.Fragment>
// );
