
class DDragonAPI {
  
  #root = "https://ddragon.leagueoflegends.com/cdn/"
  #version = "12.7.1"

  #champData = null;

  async fetchChampData() {
    const response = await fetch(`${this.#root}${this.#version}/data/en_US/champion.json`);
    return await response.json();
  }

  setChampData(champData) {
    this.#champData = champData;
  }

  getIconURL(pos) {
    return `${this.#root}${this.#version}/img/champion/${this.#champData[pos][0]}.png`
  }

  getKey(pos) {
    return parseInt(this.#champData[pos][1].key);
  }

  getName(pos) {
    return this.#champData[pos][1].name;
  }

  getLength() {
    return this.#champData.length;
  }
  
}

export default new DDragonAPI();