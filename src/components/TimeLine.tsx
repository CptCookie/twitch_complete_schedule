import { useEffect, useMemo, useState } from "react";
import { validate_user } from "../Twitch";
import { useAuth } from "./AuthProvider";
import API from "../Twitch";
import { Channel, UserFollow } from "../Twitch/twitch.interface";

type ChannelState = { [key: string]: Channel };
const TimeLine = () => {
  const { auth, setAuth } = useAuth();
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [follows, setFollows] = useState<UserFollow[]>();
  const [channels, setChanels] = useState<ChannelState>({});

  const twitch_api = useMemo(() => {
    if (auth?.access_token) return new API(auth?.access_token);
  }, [auth]);

  useEffect(() => {
    if (auth?.access_token) {
      validate_user(auth?.access_token)
        .then((resp) => {
          // token valid, put into the Context for the App
          console.log("token is fine");
          setUserId(resp.data.user_id);
        })
        .catch(() => {
          // could not validate, remove tht token from the storage
          setAuth(undefined);
        });
    }
  }, [auth, setAuth]);

  useEffect(() => {
    if (userId && twitch_api) {
      twitch_api.read_following(userId).then((resp) => {
        setFollows(resp.data.data);
      });
    }
  }, [userId]);

  useEffect(() => {
    if (follows && twitch_api) {
      twitch_api
        .read_channels(follows.map((value) => value.to_id))
        .then((resp) => {
          console.debug(resp);
          const entries = resp.data.data.map((value) => {
            return [value.id, value];
          });
          setChanels(Object.fromEntries(entries));
        });
    }
  }, [follows]);

  console.debug(userId, follows, channels);

  return (
    <div>
      <h1>Timeline</h1>
    </div>
  );
};

export default TimeLine;
