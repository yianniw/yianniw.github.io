
class RiotAPI {
  #apikey = "";
  #scheme = "https://";
  #region = "";
  #host = "api.riotgames.com/";
  #query = "?api_key=";
  #name = "";

  summonerInfo = null;
  
  async validateData(name, region) {
    this.#name = name;
    this.#region = region.toLowerCase();
    let endpoint = "lol/summoner/v4/summoners/by-name/"
    let request = this.#scheme + this.#region + "." + this.#host + endpoint + this.#name + this.#query;

    var response = null;
    try { response = await fetch(request + this.#apikey); }
    catch (error) {
      console.log(error);
      return null;
    }
    return await response.json();
  }

  getName = () => (this.#name);
  getRegion = () => (this.#region);

}

export default new RiotAPI();