import React from "react";
import logo from "./logo.svg";
import "./App.css";
import TwitchConnectButton from "./TwitchConnectButton";
import ReadSubs from "./ReadSubs";

function App() {
  const token = Object.fromEntries(
    document.location.hash
      .slice(1)
      .split("&")
      .map((pair) => pair.split("=").map((v) => decodeURIComponent(v)))
  );

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <TwitchConnectButton />
        {token && <ReadSubs token={token} />}
      </header>
    </div>
  );
}

export default App;
