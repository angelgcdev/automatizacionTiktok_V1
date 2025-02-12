import { humanizeInteraction } from "./humanizeInteraction.js";
import { getRandomDelay } from "./getRandomDelay.js";

//Funcion para llenar un campo de texto con retrasos, simulados entre caracteres
const fillField = async (page, selector, value) => {
  await page.waitForSelector(selector, { timeout: 30000 });
  // await page.waitForSelector(selector, { timeout: 10000 }); //Espera hasta 10 segundos
  await humanizeInteraction(page);
  for (const char of value) {
    await page.type(selector, char, { delay: getRandomDelay(50, 150) });
  }
};

export { fillField };
