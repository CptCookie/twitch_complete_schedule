import React from "react";
import logo from "./logo.svg";
import "./App.css";
import TwitchConnectButton from "./TwitchConnectButton";
import ReadSubs from "./ReadSubs";
import { AuthProvider } from "./components/AuthProvider";
import Router from "./components/Router";

function App() {
  console.log("render app");
  return (
    <div className="App">
      <AuthProvider>
        <Router />
      </AuthProvider>
    </div>
  );
}

export default App;
