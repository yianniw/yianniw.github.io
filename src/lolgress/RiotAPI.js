
class RiotAPI {
  ApiToken = "";
  static get Scheme() { return "https://"; }
  static get Host() { return ".api.riotgames.com/"; }
  static get Query() { return "?api_key="; }
  static get Version() { return "12.7.1"; }
  static get DDragonHost() { return "https://ddragon.leagueoflegends.com/cdn/"; }

  #name = "";
  #region = "";
  setName = (name) => { this.#name = name; }
  setRegion = (region) => { this.#region = region; }
  get Name() { return this.#name }
  get Region() { return this.#region }

  championData = null;

  summonerData = null;
  get SummonerId() { return this.summonerData != null ? this.summonerData.id : null; }

  championMastery = null;
  champArray = [];

  getNumChamps() {
    return this.championData.length;
  }

  getChampIcon(pos) {
    return `${RiotAPI.DDragonHost}${RiotAPI.Version}/img/champion/${this.champArray[pos][1].name}.png`
  }

  getChampName(pos) {
    return this.champArray[pos][0];
  }

  getChampLevel(pos) {
    return this.champArray[pos][1].championLevel != null ? this.champArray[pos][1].championLevel : 0;
  }

  async fetchChampData(rAPI) {
    if(rAPI.championData != null)
      return true;

    return fetch(`${RiotAPI.DDragonHost}${RiotAPI.Version}/data/en_US/champion.json`)
      .then(response => response.json())
      .then(data => {
        rAPI.championData = Object.entries(data.data);
        return true;
      }).catch(error => {
        console.log(error);
        return false;
      });
  }

  async fetchSummoner(rAPI, name, region) {
    region = region.toLowerCase();

    // check if summoner data is already available
    if(rAPI.summonerData != null) {
      if(name === rAPI.Name && region === rAPI.Region) {
        return true;
      }
    }

    if(!await this.fetchName(rAPI, name, region))
      return false;

    // check if champion data is already available
    if(rAPI.championData != null) {
      if(rAPI.championData[0].summonerId === rAPI.summonerData.id) {
        return true;
      }
    }

    if(!await this.fetchChampMastery(rAPI))
      return false;
    
    return true;
  }
  
  async fetchName(rAPI, name, region) {
    let endpoint = "lol/summoner/v4/summoners/by-name/"
    let request = RiotAPI.Scheme + region + RiotAPI.Host + endpoint + name + RiotAPI.Query;

    return fetch(request + rAPI.ApiToken)
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

  async fetchChampMastery(rAPI) {    
    let endpoint = "lol/champion-mastery/v4/champion-masteries/by-summoner/"
    let request = RiotAPI.Scheme + rAPI.Region + RiotAPI.Host + endpoint + rAPI.SummonerId + RiotAPI.Query;

    return fetch(request + rAPI.ApiToken)
      .then(response => response.json())
      .then(data => {
        rAPI.championMastery = data;
        return true;
      }).catch(error => {
        console.log(error);
        return false;
      });
  }

  /**
   * Creates a JSON object combining data from the Riot and DataDragon APIs
   * 
   */
  createChampArray() {
    var res = {};

    for(var i = 0; i < this.championData.length; i++) {
      let championLevel = null;
      let championPoints = null;
      let championPointsUntilNextLevel = null;
      let championPointsSinceLastLevel = null;
      let tokensEarned = null;
      let chestGranted = null;
      let lastPlayTime = null;

      for(var j = 0; j < this.championMastery.length; j++) {
        let champ = this.championMastery[j];
        if(champ.championId === parseInt(this.championData[i][1].key)) {
          championLevel = champ.championLevel;
          championPoints = champ.championPoints;
          championPointsUntilNextLevel = champ.championPointsUntilNextLevel;
          championPointsSinceLastLevel = champ.championPointsSinceLastLevel;
          tokensEarned = champ.tokensEarned;
          chestGranted = champ.chestGranted;
          lastPlayTime = champ.lastPlayTime;
          break;
        }
      }

      // create new object entry
      res[this.championData[i][1].name] = {
        id: parseInt(this.championData[i][1].key),
        name: this.championData[i][1].id,
        title: this.championData[i][1].title,
        blurb: this.championData[i][1].blurb,
        championLevel: championLevel,
        championPoints: championPoints,
        championPointsUntilNextLevel: championPointsUntilNextLevel,
        championPointsSinceLastLevel: championPointsSinceLastLevel,
        tokensEarned: tokensEarned,
        chestGranted: chestGranted,
        lastPlayTime: lastPlayTime
      }
    }

    this.champArray.length = 0;
    for(var champ in res) {
      this.champArray.push([champ, res[champ]]);
    }
  }

  sortByName() {
    this.champArray.sort((a, b) => a[1].name.localeCompare(b[1].name));
  }

  sortByMasteryDescending() {
    this.champArray.sort(function(a, b) {
      if(b[1].championLevel !== a[1].championLevel) {
        return b[1].championLevel - a[1].championLevel;
      }

      return b[1].championPoints - a[1].championPoints;
    });
  }

  sortByMasteryAscending() {
    this.champArray.sort(function(a, b) {
      return b[1].championPoints - a[1].championPoints;
    });
  }

  getChampId(rAPI, pos) {
    return rAPI.championData[pos].championId;
  }

}

export default new RiotAPI();
