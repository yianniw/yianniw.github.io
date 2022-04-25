
class RiotAPI {
  #apikey = "RGAPI-ebccd492-b116-4ba5-8546-88a9a5cbee23";
  // RGAPI-ebccd492-b116-4ba5-8546-88a9a5cbee23
  #scheme = "https://";
  #region = "";
  #host = "api.riotgames.com/";
  #query = "?api_key=";

  summonerData = null;
  
  async validateData(name, region) {
    this.#region = region.toLowerCase();
    let endpoint = "lol/summoner/v4/summoners/by-name/"
    let request = this.#scheme + this.#region + "." + this.#host + endpoint + name + this.#query;

    // var response = null;
    return fetch(request + this.#apikey)
      .then(response => {
        RiotAPI.summonerData = response;
        return true;
      }).catch(error => {
        console.log(error);
        return false;
      });

    
    // try {
    //   response = await fetch(request + this.#apikey);
    // }
    // catch (error) {
    //   console.log(error.statusText);
    //   return null;
    // }
    // return await response.json();
  }

  getRegion = () => (this.#region);

}

export default new RiotAPI();