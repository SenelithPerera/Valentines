import React, { useState, useEffect } from 'react'
import useSound from 'use-sound';
import { useTrail, animated, a } from '@react-spring/web'

import WaitingGif from '../../assets/2024/waiting.gif';
import HappyGif from '../../assets/2024/happy.gif';
import SadGif from '../../assets/2024/sad.gif';
import NoSound from '../../assets/2024/aaahhh.mp3'

import '../../external-css/2024/Stylesv1.css'


const Trail = ({ open, children }) => {
  const items = React.Children.toArray(children)
  const trail = useTrail(items.length, {
    config: { mass: 10, tension: 1000, friction: 200 },
    opacity: open ? 1 : 0,
    y: open ? 0 : 20,
    height: open ? 200 : 110,
    from: { opacity: 0, height: 0 },
  })
  return (
    <div>
      {trail.map(({ height, ...style }, index) => (
        <a.div key={index} style={style}>
          <a.div style={{ height, paddingRight: "1em", paddingLeft: "1em" }}>{items[index]}</a.div>
        </a.div>
      ))}
    </div>
  )
}

const ValentineV1 = () => {
  const [play] = useSound(NoSound);
  const [gifSrc, setGifSrc] = useState(WaitingGif);
  // const [noBtnCounter, setNoBtnCounter] = useState(0);
  const [isYesClicked, setIsYesClicked] = useState(false);

  const trails = useTrail(1, {
    // from: { opacity: 0 },
    // to: { opacity: 1 },
    config: { mass: 10, tension: 1000, friction: 200 },
    from: { opacity: 0, transform: "translateY(-100px)" },
    to: { position: "relative", opacity: 1, transform: "translateY(50px)" }
  })

  useEffect(() => {
    if (!isYesClicked) {
      return;
    };
    fetch("assets/mylove.pdf").then((response) => {
      response.blob().then((blob) => {

        // Creating new object of PDF file
        const fileURL =
          window.URL.createObjectURL(blob);

        // Setting various property values
        let alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = "mylove.pdf";
        alink.click();
      });
    });
  }, [isYesClicked])


  const handleYesClick = () => {
    setGifSrc(HappyGif);
    setIsYesClicked(true);
  }

  const handleNoClick = () => {
    setGifSrc(SadGif)
    play();
  }

  return (

    <div id="container">

      {isYesClicked && <Trail open={isYesClicked}>
        <h1>Check your downloads sweetheart</h1>
      </Trail>}

      {!isYesClicked && (
        <>
          {trails.map(props => (
            <animated.h1 className="title" style={props}>Will you be my Valentine ?</animated.h1>
          ))}
        </>
      )}
      <img id="gif" src={gifSrc} alt="Centered GIF" />


      {!isYesClicked && (
        <>
          <button id="button1" onClick={() => handleYesClick()} class="button">YESSSS !!!</button>
          <button id="button2" onClick={() => handleNoClick()} class="button">No</button>
        </>
      )}
    </div>
  )
}

export default ValentineV1;
