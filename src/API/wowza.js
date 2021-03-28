import axios from "axios";

const headers = {
  headers: {
    "wsc-api-key": process.env.REACT_APP_WOWZA_WSC_API_KEY,
    "wsc-access-key": process.env.REACT_APP_WOWZA_WSC_ACCESS_KEY,
  },
};

export const createStream = () => {
  const url = process.env.REACT_APP_WOWZA_BASE_URL + "/live_streams";
  return axios.post(
    url,
    {
      live_stream: {
        aspect_ratio_height: 720,
        aspect_ratio_width: 1280,
        billing_mode: "pay_as_you_go",
        broadcast_location: "eu_germany",
        encoder: "wowza_gocoder",
        name: "My Live Stream",
        transcoder_type: "transcoded",
        closed_caption_type: "none",
        delivery_method: "push",
        delivery_type: "single-bitrate",
        disable_authentication: false,
        hosted_page: true,
        hosted_page_description: "My Hosted Page Description",
        hosted_page_sharing_icons: true,
        hosted_page_title: "My Hosted Page",
        low_latency: false,
        password: "68332313",
        player_countdown: true,
        player_countdown_at: "2020-02-01T17:00:00.000Z",
        player_logo_position: "top-right",
        player_responsive: false,
        player_type: "wowza_player",
        player_width: 640,
        recording: true,
        remove_hosted_page_logo_image: true,
        remove_player_logo_image: true,
        remove_player_video_poster_image: true,
        source_url: "xyz.streamlock.net/vod/mp4:Movie.mov",
        target_delivery_protocol: "hls-https",
        use_stream_source: false,
        username: "client2",
        vod_stream: true,
      },
    },
    headers
  );
};

export const fetchStreams = () => {
  const url = `${process.env.REACT_APP_WOWZA_BASE_URL}/live_streams`;
  return axios.get(url, headers);
};

export const fetchOne = (id) => {
  const url = `${process.env.REACT_APP_WOWZA_BASE_URL}/live_streams/${id}`;
  return axios.get(url, headers);
};
export const startStream = (id) => {
  const url = `${process.env.REACT_APP_WOWZA_BASE_URL}/live_streams/${id}/start`;
  return axios.put(url, null, headers);
};

export const stopStream = (id) => {
  const url = `${process.env.REACT_APP_WOWZA_BASE_URL}/live_streams/${id}/stop`;
  return axios.put(url, null, headers);
};

export const fetchStatus = (id) => {
  const url = `${process.env.REACT_APP_WOWZA_BASE_URL}/live_streams/${id}/state`;
  return axios.get(url, headers);
};
