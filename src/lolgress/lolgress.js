import React, { useEffect, useState } from 'react'
import NameForm from './components/NameForm'
import ChampGrid from './components/ChampGrid';
import Summary from './components/Summary';
import RiotAPI from './RiotAPI';
import './LoLgress.css';
import { Form } from 'react-bootstrap';

function LoLgress() {
  document.title = "LoLgress";
  const [rAPI] = useState(RiotAPI);
  const [currentSummoner, setCurrentSummoner] = useState(null);

  const updateToken = (e) => {
    rAPI.ApiToken = e.target.value;
  }

  const updateSummoner = (childData) => {
    setCurrentSummoner(childData);
    rAPI.createChampArray(rAPI.championData);
  }

  useEffect(() => {
    async function initDDragon() {
      await rAPI.fetchChampData(rAPI);
    }
    initDDragon();
  }, [rAPI]);
  
  return (
    <div className='lolgress'>
      <div className='title'>LoLgress!</div>
      <div className='spacer' style={{height: `${currentSummoner !== null ? "0" : "20vh"}`}}/>
      <div className='content'>
        <div id='nameform-container'>
          <NameForm rAPI={rAPI} updateSummoner={updateSummoner} />
          {currentSummoner === null &&
          <div id='api-form'>
            <Form.Control onChange={updateToken} placeholder="API Token..." />
          </div>}
        </div>
        {currentSummoner != null &&
        <div id='body-content'>
          <Summary rAPI={rAPI} currentSummoner={currentSummoner}/>
          <div id='champgrid-container'>
            <ChampGrid rAPI={rAPI} currentSummoner={currentSummoner} />
          </div>
        </div>}
      </div>
    </div>
  )
}

export default LoLgress;