
class RiotAPI {
  #apikey = "";
  #scheme = "https://";
  #region = "";
  #host = "api.riotgames.com/";
  #query = "?api_key=";
  #name = "";

  getName = () => { return this.#name; }
  getRegion = () => { return this.#region; }
  setName = (name) => { this.#name = name; }
  setRegion = (region) => { this.#region = region; }

  summonerData = null;
  championData = null;
  
  async validateData(rAPI, name, region) {
    region = region.toLowerCase();

    // prevent redundant requests
    if(rAPI.summonerData != null) {
      if(name === rAPI.getName() && region === rAPI.getRegion()) {
        return true;
      }
    }

    let endpoint = "lol/summoner/v4/summoners/by-name/"
    let request = this.#scheme + region + "." + this.#host + endpoint + name + this.#query;

    return await fetch(request + this.#apikey)
      .then(response => response.json())
      .then(data => {
        rAPI.summonerData = data;
        rAPI.setRegion(region);
        rAPI.setName(name);
        return true;
      }).catch(error => {
        console.log(error);
        return false;
      });
  }

  async fetchChampData(rAPI) {
    // prevent redundant requests
    if(rAPI.championData != null) {
      if(rAPI.championData[0].summonerId === rAPI.summonerData.id) {
        return true;
      }
    }
    
    let endpoint = "lol/champion-mastery/v4/champion-masteries/by-summoner/"
    let request = this.#scheme + rAPI.getRegion() + "." + this.#host + endpoint + rAPI.summonerData.id + this.#query;

    return fetch(request + this.#apikey)
      .then(response => response.json())
      .then(data => {
        rAPI.championData = data;
        return true;
      }).catch(error => {
        console.log(error);
        return false;
      });
  }

  getChampLevel(rAPI, ddragonKey) {
    for(var i = 0; i < Object.keys(rAPI.championData).length; i++) {
      if(rAPI.championData[i].championId === ddragonKey) {
        return rAPI.championData[i].championLevel;
      }
    }
    return "0";
  }

  getChampId(rAPI, pos) {
    return rAPI.championData[pos].championId;
  }

}

export default new RiotAPI();
