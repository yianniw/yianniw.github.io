import React, { useEffect, useState } from 'react'
import NameForm from './components/NameForm'
import ChampGrid from './components/ChampGrid';
import RiotAPI from './RiotAPI';
import './LoLgress.css';
import { Form, Stack } from 'react-bootstrap';

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
      <div id='nameform-container' style={{flexGrow: `${currentSummoner !== null ? "0" : "1"}`}}>
        <NameForm rAPI={rAPI} updateSummoner={updateSummoner} />
        {currentSummoner === null &&
        <div id='api-form'>
          <Form.Control onChange={updateToken} placeholder="API Token..." />
        </div>}
      </div>
      <div id='spacer' style={{flexGrow: `${currentSummoner !== null ? "0" : "2"}`}}/>
      
      {currentSummoner != null &&
        <div className='content'>
          <Stack direction="horizontal" >
            <div className='ms-auto' />
            <ChampGrid rAPI={rAPI} currentSummoner={currentSummoner} />
            {(currentSummoner === null) && <div className='ms-auto' />}
          </Stack>
        </div>
      }
    </div>
  )
}

export default LoLgress;