
class RiotAPI {
  static get ApiToken() { return ""; }
  static get Scheme() { return "https://"; }
  static get Host() { return ".api.riotgames.com/"; }
  static get Query() { return "?api_key="; }

  #name = "";
  #region = "";
  setName = (name) => { this.#name = name; }
  setRegion = (region) => { this.#region = region; }
  get Name() { return this.#name }
  get Region() { return this.#region }

  summonerData = null;
  get SummonerId() { return this.summonerData != null ? this.summonerData.id : null; }

  championData = null;

  async fetchData(rAPI, name, region) {
    region = region.toLowerCase();

    // check if summoner data is already available
    if(rAPI.summonerData != null) {
      if(name === rAPI.Name && region === rAPI.Region) {
        console.log("summoner");
        return true;
      }
    }

    if(!await this.fetchName(rAPI, name, region))
      return false;

    // check if champion data is already available
    if(rAPI.championData != null) {
      if(rAPI.championData[0].summonerId === rAPI.summonerData.id) {
        console.log("champ");
        return true;
      }
    }

    if(!await this.fetchChamp(rAPI))
      return false;
    
    return true;
  }
  
  async fetchName(rAPI, name, region) {
    let endpoint = "lol/summoner/v4/summoners/by-name/"
    let request = RiotAPI.Scheme + region + RiotAPI.Host + endpoint + name + RiotAPI.Query;

    return fetch(request + RiotAPI.ApiToken)
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

  async fetchChamp(rAPI) {    
    let endpoint = "lol/champion-mastery/v4/champion-masteries/by-summoner/"
    let request = RiotAPI.Scheme + rAPI.Region + RiotAPI.Host + endpoint + rAPI.SummonerId + RiotAPI.Query;

    return fetch(request + RiotAPI.ApiToken)
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
