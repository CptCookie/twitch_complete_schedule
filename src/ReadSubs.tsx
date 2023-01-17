import React, { useEffect, useMemo } from "react";
import API, { validate_user } from "./Twitch";

interface TwitchToken {
  access_token: string;
  scope: string;
  state: string;
  token_type: string;
}

interface Props {
  token: TwitchToken;
}

const ReadSubs: React.FC<Props> = ({ token }) => {
  const twitch_api = useMemo(() => {
    return new API(token.access_token);
  }, [token]);

  const read_subs = () => {
    twitch_api.read_following().then((data) => console.debug(data));
  };

  return (
    <>
      <button onClick={() => validate_user(token.access_token)}>
        {" "}
        validate User{" "}
      </button>
      <button onClick={read_subs}> Fetch Follows </button>
    </>
  );
};

export default ReadSubs;
