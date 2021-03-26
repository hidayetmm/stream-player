import React, { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import { Button, Row, Col, Space } from "antd";

function StreamPlayer(props) {
  const { videoSrc } = props;
  const playerRef = useRef();

  useEffect(() => {
    const player = videojs(
      playerRef.current,
      {
        autoplay: false,
        playbackRates: [0.5, 1, 1.25, 1.5, 2],
        width: 720,
        height: 480,
        controls: true,
      },
      () => {
        player.src(videoSrc);
      }
    );

    return () => {
      player.dispose();
    };
  }, []);

  return (
    <Row>
      <Col span={24}>
        <Space direction="vertical" size="large">
          <div data-vjs-player>
            <video ref={playerRef} className="video-js" playsInline />
          </div>
          <Space size="large">
            <Button type="primary">Start stream</Button>
            <Button>Stop stream</Button>
          </Space>
        </Space>
      </Col>
    </Row>
  );
}

export default StreamPlayer;
