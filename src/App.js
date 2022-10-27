import { useState } from 'react';
import { VideoPlayer } from './lib/index.js';
import './App.css';

function App() {
  const [theaterActive, setTheaterActive] = useState(false);

  function handleTheaterChange(value) {
    setTheaterActive(value);
  }

  return (
    <div className={"App " + (theaterActive ? "TheatreMode" : "")}>
      <VideoPlayer
        src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
        backgroundColor="lightgreen"
        progressBarColor="rgb(24, 146, 0)"
        handleTheaterModeChange={handleTheaterChange}
      />
    </div>
  );
}

export default App;
