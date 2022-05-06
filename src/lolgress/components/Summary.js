import React, { useEffect, useState } from "react";
import { ProgressBar } from "react-bootstrap";
import Sidebar from "./Sidebar";
import Tokens from "./Tokens";
import './Summary.css';

function Summary({rAPI, currentSummoner}) {

  const [summonerMastery, setSummonerMastery] = useState({});

  useEffect(() => {
    setSummonerMastery(rAPI.getSummonerMasteryInfo());
  }, [rAPI, currentSummoner]);

  return (
    <div id='summary'>
      <div id='summary-topbar'>
        <img
          src={rAPI.getSummonerIcon()}
          alt="Summoner Icon"
          className="summoner-icon"/>
        <div className="summoner-name">{rAPI.getSummonerName()}</div>
        <ProgressBar
          id='progress-bar'
          variant="success"
          now={summonerMastery.totalScore / summonerMastery.maxScore * 100}
          label={`${summonerMastery.totalScore} / ${summonerMastery.maxScore}`}/>
      </div>
      <div id='summary-body'>
        <Sidebar />
        <Tokens rAPI={rAPI} currentSummoner={currentSummoner} />
      </div>
    </div>
  );
}

export default Summary;