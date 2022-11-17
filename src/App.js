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
        //src={/*"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"*/  `http://${window.location.hostname}:5000/video/original`}
        //lowResSrc={`http://${window.location.hostname}:5000/video/compressed`}
        /* Test M3U8: https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8 */

        src="https://cdn-cf-east.streamable.com/video/mp4/87jnil.mp4?Expires=1668944220&Signature=js9M7VSrzem1v~YTO13~TGZqEKLaOv2ZuUSlcbQWHsbGn3~SZPmGYwItBj3zIDx~faomYu179zRKS42yAQWFR0VqxItmTDPLqRBtQCGEPfmu3Pn~Hicykf1UfSrbddkplLjFJRF5OfRq3OJjqbet1dRHopbpe8V6cMjb7HanxbPPJcLOiTPG05uRoi16YB2uZYqKrth4l~Ggz~TkGHuWO9o7eW06mSQZ0FXsuWz1kX793gBVHg3tvRlSl9GwXDKEqwSPNzRhcAvsRQcSvCyOW8rxkxsdq~iHgo1HFeTYu11G46qFOF5bgAkjSlmf06jRlTv6YF4NDN0jCiBxV4Gx-Q__&Key-Pair-Id=APKAIEYUVEN4EVB2OKEQ"
        lowResSrc="https://cdn-cf-east.streamable.com/video/mp4/6isgt9.mp4?Expires=1668943140&Signature=lQpsyepoqNta-s5wk~g~R6NcYss35IQKYNXy~QisIXDmXn54dz~xMG9w4zlaYaIScZIyZswhafzAjMowHkaCOreFp89UE3~KNBQJe6I2GNfRENUnaq3hizWwDI7fmomLeAKxdltbivCmJLuspnpm-Y0QRxzjZQG0KgFc-UNecCBJIKjIERgy0dXB7YAffUVpYO5ZTRzVdAtVqEKQXF1Vt0ARlkyg~WW5gWlMb-jKoo31BdJbD84dfk0Ho9THzI-BA2CuCZMSEVAWAldeEKttESEDMxIGQ~IMf1vnbSHUOGTSpkl~4wbUgg3~jGcxlhbzOHTUOGQKzNqSNSizk2QOYA__&Key-Pair-Id=APKAIEYUVEN4EVB2OKEQ"

        progressBarColor="DarkTurquoise"
        handleTheaterChange={handleTheaterChange}
        poster="https://www.technopixel.org/wp-content/uploads/2021/09/wallpaper-engine-coming-to-android-0-rlQMDEF9.jpeg"
      />
    </div>
  );
}

export default App;
