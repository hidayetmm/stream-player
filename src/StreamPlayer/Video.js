import React, { Component } from "react";

import ReactHlsPlayer from "react-hls-player";
import axios from "axios";

export default class Video extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startPlay: false,
    };
  }

  checkFile = () => {
    console.log("checkFile");
    if (this.props.videoSrc) {
      axios
        .get(this.props.videoSrc, {})
        .then((res) => {
          this.setState({
            startPlay: true,
          });
        })
        .catch((err) => {
          if (err.response.status === 404) {
            setTimeout(() => {
              this.checkFile();
            }, 2000);
          }
        });
    }
  };

  componentWillReceiveProps = () => {
    console.log("prop changed");
    this.checkFile();
  };

  componentDidMount = () => {
    console.log("didMount");
    this.checkFile();
  };

  render() {
    const { startPlay } = this.state;

    console.log("startPlay", startPlay);

    return (
      <div>
        <ReactHlsPlayer
          src={startPlay ? this.props.videoSrc : "#"}
          autoPlay={true}
          muted={false}
          controls={true}
          width="720px"
          height="480px"
          hlsConfig={{
            maxLoadingDelay: 4,
            minAutoBitrate: 0,
            lowLatencyMode: true,
          }}
        />
      </div>
    );
  }
}
