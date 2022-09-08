class MarvelService {
  _apiBase = 'https://gateway.marvel.com:443/v1/public/';
  _apiKey = 'apikey=7dc0b21564efe32c71bf869268dd6098';

  getResourse = async (url) => {
    let res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    return await res.json();
  };

  getAllCharacter = async () => {
    const res = await this.getResourse(
      `${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`,
    );
    return res.data.results.map(this._transformCharacter);
  };

  getCharacter = async (id) => {
    const res = await this.getResourse(`${this._apiBase}characters/${id}?${this._apiKey}`);
    return this._transformCharacter(res.data.results[0]);
  };

  _transformCharacter = (res) => {
    return {
      name: res.name,
      description: res.description ? res.description.slice(0, 100) + '...' : 'not description :(',
      thumbnail: res.thumbnail.path + '.' + res.thumbnail.extension,
      homepage: res.urls[0].url,
      wiki: res.urls[1].url,
      id: res.id
    };
  };
}

export default MarvelService;
