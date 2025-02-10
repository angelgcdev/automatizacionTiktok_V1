import { getRandomDelay } from "./getRandomDelay.js";
import { humanizeInteraction } from "./humanizeInteraction.js";

const MIN_DELAY = 3000; // Minimo tiempo de espera en milisegundos
const MAX_DELAY = 7000; // Máximo tiempo de espera en milisegundos

//Funcion para hacer click en un selector con espera
const clickOnSelector = async (page, selector) => {
  try {
    await page.waitForTimeout(getRandomDelay(MIN_DELAY, MAX_DELAY)); //pausa breve

    await page.waitForTimeout(500); // Espera un poco antes de hacer clic.

    await page.waitForSelector(selector, { timeout: 10000 });
    await humanizeInteraction(page);
    await page.click(selector);
  } catch (error) {
    console.log(
      `Error en clickOnSelector para el selector ${selector}:`,
      error
    );
  }
};

export { clickOnSelector };
