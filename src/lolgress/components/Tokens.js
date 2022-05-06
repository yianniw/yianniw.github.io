import React from "react";
import './Tokens.css'

import { importAll, isMobile } from "../Util";

const decoration = importAll(require.context('../data/mastery/tokens', false, /\.(png|jpe?g|svg)$/));

function Tokens({rAPI, currentSummoner}) {

  const getChamps = (level) => {
    var items = [];
    rAPI.getChampsByLevel(level).forEach(champ => {
      items.push(
        <div key={`token-${champ[1].name}`} className={`token-item${isMobile() ? "-mobile" : ""}`}>
          {(champ[1].tokensEarned > 0) &&
          <img
            className={`token-decoration`}
            src={decoration[`level${level + 1}.png`]}
            alt={`Level ${level} token decoration`} />}
          {(champ[1].tokensEarned > 0) && <div className='token-count'>{champ[1].tokensEarned}</div>}
          <img
            className={`token-icon${isMobile() ? "-mobile" : ""}`}
            src={rAPI.getChampIconByName(champ[1].name)}
            alt={`${champ[0]}`} />
          <p className={`token-caption`}>
            {champ[0]}
          </p>
        </div>
      );
    });

    return items;
  }

  return (
    <div id='tokens'>
      <div className="token-group-header">Champion Progress to Level 7:</div>
      <div className='token-group'>{getChamps(6)}</div>
      <div className="token-group-header">Champion Progress to Level 6:</div>
      <div className='token-group'>{getChamps(5)}</div>
    </div>
  );
}

export default Tokens;