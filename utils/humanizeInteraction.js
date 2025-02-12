import { getRandomDelay } from "./getRandomDelay.js";

const MIN_DELAY = 2000; // Minimo tiempo de espera en milisegundos
const MAX_DELAY = 7000; // Máximo tiempo de espera en milisegundos

//Funcion para simular pausas y movimientos del mouse
const humanizeInteraction = async (page) => {
  //Movimientos aleatorios del raton en posiciones de la pagina
  await page.mouse.move(Math.random() * 1200, Math.random() * 900, {
    steps: Math.floor(Math.random() * 30) + 10,
  });
  await page.waitForTimeout(getRandomDelay(MIN_DELAY, MAX_DELAY)); //pausa breve
};

export { humanizeInteraction };
