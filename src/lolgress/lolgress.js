import React, { useEffect, useState } from 'react'
import NameForm from './components/NameForm'
import ChampGrid from './components/ChampGrid';
import DDragonAPI from './DDragonAPI';
import RiotAPI from './RiotAPI';
import './LoLgress.css';
import { Stack } from 'react-bootstrap';

function LoLgress() {
  document.title = "LoLgress";
  const [rAPI] = useState(RiotAPI);
  const [rApiReady, setRApiReady] = useState(false);
  const [ddragon, ddragonReady] = useState(false);

  const toggleRAPI = (childData) => {
    setRApiReady(childData);
  }

  useEffect(() => {
    async function initDDragon() {
      const champs = await DDragonAPI.fetchChampData();
      DDragonAPI.setChampData(Object.entries(champs.data));
      ddragonReady(true);
    }
    initDDragon();
  }, []);
  
  return (
    <div className='lolgress'>
      <div className='title'>LoLgress!</div>
      <NameForm rAPI={rAPI} toggleRAPI={toggleRAPI} />
      {ddragon &&
        <div className='content'>
          <Stack direction="horizontal" >
            <div className='ms-auto' />
            <ChampGrid rAPI={rAPI} rApiReady={rApiReady} />
            {!rApiReady && <div className='ms-auto' />}
          </Stack>
        </div>
      }
    </div>
  )
}

export default LoLgress;