import { useState } from 'react';
import { VideoPlayer } from './lib/index.js';
import './App.css';

function App() {
  const [theaterActive, setTheaterActive] = useState(false);

  function handleTheaterChange(value) {
    setTheaterActive(value);
  }

  return (
    <div className={"App " + (theaterActive ? "TheaterMode" : "")}>
      <VideoPlayer
        src={/*"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"*/  `http://${window.location.hostname}:5000/video/original`}
        lowResSrc="http://localhost:5000/video/compressed"
        /* Test M3U8: https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8 */
        progressBarColor="DarkTurquoise"
        handleTheaterChange={handleTheaterChange}
        poster="https://www.technopixel.org/wp-content/uploads/2021/09/wallpaper-engine-coming-to-android-0-rlQMDEF9.jpeg"
      />
    </div>
  );
}

export default App;
