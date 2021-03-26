import "antd/dist/antd.css";
import "./App.css";
import StreamPlayer from "./StreamPlayer/StreamPlayer";

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <StreamPlayer videoSrc="//vjs.zencdn.net/v/oceans.mp4" />
      </div>
    </div>
  );
}

export default App;
