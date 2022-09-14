//const { leerInput } = require("./helpers/inquirer");

import * as dotenv from 'dotenv';

import {
  readInput,
  inquirerMenu,
  pausa,
  placesList,
} from './helpers/inquirer.js';
import { Searches } from './models/searches.js';

dotenv.config();

const main = async () => {
  const searches = new Searches();

  let opt = '';

  do {
    opt = await inquirerMenu();
    switch (opt) {
      case 1:
        // Show message
        const search = await readInput('City: ');

        // Look for the places
        const places = await searches.city(search);

        // Select the place
        const id = await placesList(places);
        if (id === '0') continue;

        const selectedPlace = places.find((l) => l.id === id);

        //Save in DB
        searches.addRecord(selectedPlace.name);
        // Weather
        const { name, lat, lng } = selectedPlace;

        const weather = await searches.weatherPlace(lat, lng);
        const { desc, min, max, temp } = weather;

        // Show results

        console.clear();
        console.log('\nInformation of the city\n'.green);
        console.log(`City: ${name.green}`);
        console.log(`Lat: ${lat}`);
        console.log(`Lng: ${lng}`);
        console.log(`Temperature: ${temp}`);
        console.log(`Minimal: ${min}`);
        console.log(`Maximal: ${max}`);
        console.log(`Weather: ${desc.green}`);

        break;

      case 2:
        searches.recordCapitalized.forEach((place, i) => {
          const idx = `${i + 1}.`.green;
          console.log(`${idx} ${place}`);
        });
        break;
    }

    if (opt !== 0) await pausa();
  } while (opt !== 0);
};

main();
