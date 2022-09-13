import axios from 'axios';

export class Searches {
  record = ['Tegucigalpa', 'Madrid', 'San José'];
  constructor() {
    //TODO leer DB si existe
  }

  get paramsMapBox() {
    return {
      access_token:
        'pk.eyJ1IjoicmRpYXpjYSIsImEiOiJjbDgwbTd1Z2cwN2p1M25ydXVsNjcwaGRiIn0.oXvNHL0uOzzz8cO_ebCcgQ',
      limit: 5,
    };
  }

  async city(place = '') {
    try {
      //peticion http
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
        params: this.paramsMapBox,
      });
      const resp = await instance.get();

      console.log(resp.data);
      return []; //retornar los lugares
    } catch (error) {
      return [];
    }
  }
}
