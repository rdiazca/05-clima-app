import fs from 'fs';
import axios from 'axios';

export class Searches {
  record = [];

  dbPath = './db/database.json';
  constructor() {
    //TODO leer DB si existe
    this.readDB();
  }

  get recordCapitalized() {
    return this.record.map((place) => {
      let words = place.split(' ');
      words = words.map((w) => w[0].toUpperCase() + w.substring(1));

      return words.join(' ');
    });
  }
  get paramsMapBox() {
    return {
      access_token: process.env.MAPBOX_KEY,
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

      return resp.data.features.map((place) => ({
        id: place.id,
        name: place.place_name,
        lng: place.center[0],
        lat: place.center[1],
      }));
    } catch (error) {
      return [];
    }
  }

  get paramsWeatherMap() {
    return {
      appid: process.env.OPENWEATHER_KEY,
      units: 'metric',
    };
  }

  async weatherPlace(lat, lon) {
    try {
      const instance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`,
        params: {
          ...this.paramsWeatherMap,
          lat,
          lon,
        },
      });

      const resp = await instance.get();
      const { weather, main } = resp.data;

      return {
        desc: weather[0].description,
        min: main.temp_min,
        max: main.temp_max,
        temp: main.temp,
      };
    } catch (error) {
      console.log(error);
    }
  }

  addRecord(place = '') {
    if (this.record.includes(place.toLocaleLowerCase())) {
      return;
    }
    this.record = this.record.splice(0, 5);
    this.record.unshift(place.toLocaleLowerCase());

    //Save in DB
    this.saveDB();
  }

  saveDB() {
    const payload = {
      record: this.record,
    };
    fs.writeFileSync(this.dbPath, JSON.stringify(payload));
  }

  readDB() {
    if (!fs.existsSync(this.dbPath)) return;

    const info = fs.readFileSync(this.dbPath, { encoding: 'utf-8' });
    const data = JSON.parse(info);

    this.record = data.record;
  }
}
