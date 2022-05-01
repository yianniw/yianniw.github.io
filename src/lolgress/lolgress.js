import React, { useEffect, useState } from 'react'
import NameForm from './components/NameForm'
import ChampGrid from './components/ChampGrid';
import RiotAPI from './RiotAPI';
import './LoLgress.css';
import { Stack } from 'react-bootstrap';

function LoLgress() {
  document.title = "LoLgress";
  const [rAPI] = useState(RiotAPI);
  const [currentSummoner, setCurrentSummoner] = useState(null);

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
      <NameForm rAPI={rAPI} updateSummoner={updateSummoner} />
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