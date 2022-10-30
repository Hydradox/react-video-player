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
        src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
        backgroundColor="#111"
        progressBarColor="rgb(24, 146, 0)"
        handleTheaterChange={handleTheaterChange}
        /*poster="https://www.technopixel.org/wp-content/uploads/2021/09/wallpaper-engine-coming-to-android-0-rlQMDEF9.jpeg"*/
      />
    </div>
  );
}

export default App;
