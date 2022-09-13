//const { leerInput } = require("./helpers/inquirer");

import * as dotenv from 'dotenv';

import { leerInput, inquirerMenu, pausa } from './helpers/inquirer.js';
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
        const place = await leerInput('City: ');
        await searches.city(place);

        // Look for the places
        // Select the place
        // Climate
        // Show results

        console.log('\nInformation of the city\n'.green);
        console.log('City:');
        console.log('Lat:');
        console.log('Lng:');
        console.log('Temperature:');
        console.log('Minimal:');
        console.log('Maximal:');

        break;
    }

    if (opt !== 0) await pausa();
  } while (opt !== 0);
};

main();
