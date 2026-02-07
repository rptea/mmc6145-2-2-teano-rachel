import React, { useState } from "react";
import CardGame from "./components/cardGame";
import Header from "./components/header";
import Modal from "./components/modal";
import { useTimer } from "./util/customHooks";

export default function App() {
  const [showModal, setShowModal] = useState(false);

  const {
    time,
    start: timerStart,
    stop: timerStop,
    reset: timerReset,
  } = useTimer();
  
  const [previousTime, setPreviousTime] = useState(null);
  
  const [bestTime, setBestTime] = useState(null);

  const [isRunning, setIsRunning] = useState(false);

  const cardTexts = [
    "Bunny 🐰",
    "Frog 🐸",
    "Panda 🐼",
    "Doggy 🐶",
    "Kitty 😺",
    "Duck 🦆",
  ];

  function handleGameStart() {
    setIsRunning(true);

    timerReset();

    timerStart();
  }

  function handleGameEnd() {
    
    timerStop();

    setIsRunning(false);

    const endTime = Number(time);

    setPreviousTime(endTime);

    if (bestTime === null) {
      setBestTime(endTime);
    } else if (endTime < bestTime) {
      setBestTime(endTime);
    }
  }

  return (
    <>
      <Header
        // add time, bestTime, previousTime props
        time={isRunning ? time: null}
        bestTime={bestTime}
        previousTime={previousTime}
        openModal={() => setShowModal(true)}

      />
      <CardGame
        // add onGameStart, onGameEnd props
        onGameStart={handleGameStart}
        onGameEnd={handleGameEnd}
        cardTexts={cardTexts}
      />
      <Modal isShown={showModal} close={() => setShowModal(false)} />
    </>
  );
}

