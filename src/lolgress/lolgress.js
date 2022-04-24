import React, { useEffect, useState } from 'react'
import NameForm from './components/NameForm'
import './LoLgress.css';
import RiotAPI from './RiotAPI.js'
import { Stack } from 'react-bootstrap';
import ChampGrid from './ChampGrid';
import DDragonAPI from './DDragonAPI';
// import { getJSON } from './data/icons/UpdateIcons';

function LoLgress() {
  document.title = "LoLgress";
  const [formValid, setFormValid] = useState(false);
  const [ddragon, ddragonReady] = useState(false);

  const formData = async (childName, childRegion) => {
    RiotAPI.summonerInfo = await RiotAPI.validateData(childName, childRegion);
    if(RiotAPI.summonerInfo != null) {
      setFormValid(true);
      console.log(RiotAPI.summonerInfo);
    } else {
      console.log("failed");
    }
  }

  useEffect(() => {
    async function initAPIs() {
      const champs = await DDragonAPI.fetchChampData();
      DDragonAPI.setChampData(Object.entries(champs.data));
      ddragonReady(true);
    }
    initAPIs();
  }, []);
  
  
  return (
    <div>
      <div className='title'>LoLgress!</div>
      {/* {!formValid && <div style={{height: "100px"}} />} */}
      <div className="row"><NameForm formData={formData}/></div>
      {ddragon && <ChampGrid className="center"/>}
      {formValid &&         
        <Stack>{
          RiotAPI.summonerInfo.name
        }
        </Stack>
      }
    </div>
  )
}


export default LoLgress;