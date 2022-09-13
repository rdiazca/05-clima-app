import axios from 'axios';

export class Searches {
  record = ['Tegucigalpa', 'Madrid', 'San José'];
  constructor() {
    //TODO leer DB si existe
  }

  async city(place = '') {
    try {
      //peticion http
      const resp = await axios.get(
        'https://api.mapbox.com/geocoding/v5/mapbox.places/Miami.json?proximity=ip&types=place%2Cpostcode%2Caddress&access_token=pk.eyJ1IjoicmRpYXpjYSIsImEiOiJjbDgwbTd1Z2cwN2p1M25ydXVsNjcwaGRiIn0.oXvNHL0uOzzz8cO_ebCcgQ'
      );
      console.log(resp.data);
      return []; //retornar los lugares
    } catch (error) {
      return [];
    }
  }
}
