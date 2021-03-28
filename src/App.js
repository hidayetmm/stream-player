import "antd/dist/antd.css";
import React, { useState } from "react";
import {
  createStream,
  fetchOne,
  fetchStreams,
  startStream,
  stopStream,
} from "./API/wowza";
import { Button, Space, Modal, message } from "antd";
import "./App.css";
// import StreamPlayer from "./StreamPlayer/StreamPlayer";
import Video from "./StreamPlayer/Video";

function App() {
  const [stream, setStream] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const stopStreamHandler = (id) => {
    stopStream(id)
      .then((res) => {
        setStream();
        message.info("Stream successfully stopped.");
      })
      .catch((error) => {
        message.error("Something went wrong. " + error);
      });
  };

  const startStreamHandler = (live_stream) => {
    startStream(live_stream.id).then((res) => {
      console.log(live_stream);
      // console.log(live_stream);

      console.log(res);
      setStream({
        // source: live_stream.direct_playback_urls.hls[0].url,
        source: live_stream.player_hls_playback_url,
        streamKey: live_stream.source_connection_information.stream_name,
        username: live_stream.source_connection_information.username,
        password: live_stream.source_connection_information.password,
        streamURL: `rtmp://${live_stream.source_connection_information.primary_server}/${live_stream.source_connection_information.application}`,
        streamId: live_stream.id,
      });
      setLoading(false);
      setIsModalVisible(true);
    });
  };

  const handleStream = () => {
    setLoading(true);

    fetchStreams()
      .then((res) => {
        if (res.data.live_streams.length === 0) {
          createStream()
            .then(({ data: { live_stream } }) => {
              startStreamHandler(live_stream);
            })
            .catch((error) => {
              console.log(error);
              setLoading(false);
            });
        } else {
          // console.log(res);
          fetchOne(res.data.live_streams[0].id)
            .then(({ data: { live_stream } }) => {
              startStreamHandler(live_stream);
            })
            .catch((error) => {
              setLoading(false);
              console.log(error);
            });
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  //stream.direct_playback_urls.hls[0].url

  return (
    <div className="App">
      <div className="App-header">
        <Space direction="vertical">
          <Video videoSrc={stream ? stream.source : null} />
          <Space size="large">
            <Button
              disabled={stream}
              loading={loading}
              onClick={handleStream}
              type="primary"
            >
              Start stream
            </Button>
            <Button
              disabled={!stream}
              onClick={() => stopStreamHandler(stream.streamId)}
            >
              Stop stream
            </Button>
          </Space>
        </Space>
        {stream ? (
          <Modal
            title="Stream configuration"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <p>Stream Key: {stream.streamKey}</p>
            <p>Stream URL: {stream.streamURL}</p>
            <p>Username: {stream.username}</p>
            <p>Password: {stream.password}</p>
          </Modal>
        ) : null}
      </div>
    </div>
  );
}

export default App;
