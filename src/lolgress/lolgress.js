import React, { useEffect, useState } from 'react'
import NameForm from './components/NameForm'
import ChampGrid from './components/ChampGrid';
import DDragonAPI from './DDragonAPI';
import RiotAPI from './RiotAPI';
import './LoLgress.css';

function LoLgress() {
  document.title = "LoLgress";
  const [ddragon, ddragonReady] = useState(false);

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
      <div style={{height: "25px"}} />
      <NameForm />
      <div style={{height: "25px"}} />
      {ddragon && <ChampGrid />}
      <div style={{flexGrow: "1"}} />
    </div>
  )
}

export default LoLgress;