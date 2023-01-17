import { AxiosInstance } from "axios";
import axios from "axios";

const client_id = "wdcgouh30a0u2shuppiwpfp40uwyv3";
export const validate_user = (token: string) => {
  const url = "https://id.twitch.tv/oauth2/validate";
  let header = new Headers();
  header.set("Authorization", `Bearer ${token}`);

  return fetch(url, { headers: header }).then((data) => data.json());
};

class API {
  token: string;
  axios: AxiosInstance;

  constructor(token: string) {
    this.token = token;
    this.axios = axios.create({
      headers: {
        "Client-Id": client_id,
        Authorization: `Bearer ${token}`,
      },
    });
  }
  read_following = () => {
    return this.axios.get(
      "https://api.twitch.tv/helix/users/follows?from_id=88027169&first=100"
    );
  };

  read_schedul = (from_id: string) => {
    return this.axios.get(
      `https://api.twitch.tv/helix/schedule?broadcaster_id=${from_id}`
    );
  }

  read_channel = (from_id: string | string[]) => {
    let search_string = from_id
    if (Array.isArray(from_id)){
      search_string = from_id.join("&id=")
    }

    return this.axios.get(
      `https://api.twitch.tv/helix/users?id=${search_string}`
    );
  }
}

export default API;
