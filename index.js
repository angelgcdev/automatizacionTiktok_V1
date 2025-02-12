import { chromium } from "playwright";
import { getRandomDelay } from "./utils/getRandomDelay.js";
import { clickOnSelector } from "./utils/clickOnSelector.js";
import { fillField } from "./utils/fillField.js";
import { waitForPageLoad } from "./utils/waitForPageLoad.js";
// console.log(devices);

// variables y constantes
const MIN_DELAY = 2000; // Minimo tiempo de espera en milisegundos
const MAX_DELAY = 7000; // Máximo tiempo de espera en milisegundos

// const URL = "https://www.tiktok.com";
// const EMAIL_GOOGLE = "TU_CORREO_DE_TU_CUENTA_DE_GOOGLE";
// const PASSWORD_GOOGLE = "TU_CONTRASEÑA_DE_TU_CUENTA_DE_GOOGLE";
// const CUENTA_A_BUSCAR = "importadoramiranda777";
// const CANTIDAD_VIDEOS = 5; //cantidad de iteraciones al dar "Me gusta" en los videos

const URL = "https://www.tiktok.com";
const EMAIL_GOOGLE = "angelgcdev2@gmail.com";
const PASSWORD_GOOGLE = "gato22025_.";
const CUENTA_A_BUSCAR = "importadoramiranda777";
const CANTIDAD_VIDEOS = 5; //cantidad de iteraciones al dar "Me gusta" en los videos

/************************************ */
/*******FUNCION PRINCIPAL ****** */
(async () => {
  //Lanza el navegador Chromium
  const browser = await chromium.launch({
    headless: false,
    args: ["--disable-blink-features=AutomationControlled"],
    executablePath:
      "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  });

  const context = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
    viewport: { width: 1280, height: 720 },
  });

  //Abre una nueva pagina en el navegador
  const page = await context.newPage();

  // Navega a tiktok
  await page.goto(URL);
  console.log("Página de tiktok abierta");
  await waitForPageLoad(page);
  await page.waitForTimeout(getRandomDelay(MIN_DELAY, MAX_DELAY));

  //Hacer click en 'Perfil'
  await clickOnSelector(page, 'button[aria-label="Perfil"]');
  await waitForPageLoad(page);

  //Hacer click en 'continuar con Google' y capturar la ventana emergente
  const [popup] = await Promise.all([
    page.waitForEvent("popup"),
    clickOnSelector(
      page,
      "div.css-102dq55-DivLoginOptionContainer.exd0a434 div:nth-child(4)"
    ),
  ]);

  //ahora si puedes interactuar con la ventana emergente
  await popup.waitForLoadState();

  await page.waitForTimeout(getRandomDelay(MIN_DELAY, MAX_DELAY));

  //Correo electronico Google
  await fillField(
    popup,
    'input[aria-label="Correo electrónico o teléfono"]',
    EMAIL_GOOGLE
  );

  //Hacer click en Siguiente google
  await clickOnSelector(popup, '#identifierNext button[type="button"]');
  await waitForPageLoad(popup);
  await page.waitForTimeout(getRandomDelay(MIN_DELAY, MAX_DELAY));

  //password Google
  await fillField(
    popup,
    'input[aria-label="Introduce tu contraseña"]',
    PASSWORD_GOOGLE
  );

  //Hacer click en Siguiente password
  await clickOnSelector(popup, '#passwordNext button[type="button"]');
  await waitForPageLoad(popup);
  await page.waitForTimeout(getRandomDelay(MIN_DELAY, MAX_DELAY));

  //Hacer click en 'Continuar'
  await clickOnSelector(
    popup,
    ".TNTaPb > div:nth-child(2) > div > div > button"
  );
  await waitForPageLoad(page);
  await page.waitForTimeout(getRandomDelay(MIN_DELAY, MAX_DELAY));
  console.log("Volviendo al contexto principal...");

  //Click en el boton 'Buscar'
  await clickOnSelector(
    page,
    'div.css-1icvwlp-DivSearchWrapper.e1u58fka4 > button[aria-label="Buscar"]'
  );

  await waitForPageLoad(page);
  await page.waitForTimeout(getRandomDelay(MIN_DELAY, MAX_DELAY));

  //Escribir en el input 'Buscar'
  await fillField(
    page,
    "div.css-1asq5wp-DivSearchFormContainer.e1hi1cmj0:nth-child(2) form input",
    CUENTA_A_BUSCAR
  );
  await page.keyboard.press("Enter");
  await waitForPageLoad(page);
  await page.waitForTimeout(getRandomDelay(MIN_DELAY, MAX_DELAY));
  console.log("Busqueda realizada");

  //Hacer click en la pestaña 'Usuarios'
  await clickOnSelector(page, "#tabs-0-tab-search_account");
  await page.waitForTimeout(getRandomDelay(MIN_DELAY, MAX_DELAY));

  //Hacer click en la primera opcion de usuarios
  await clickOnSelector(page, "#search_user-item-user-link-0");
  await waitForPageLoad(page);
  await page.waitForTimeout(getRandomDelay(MIN_DELAY, MAX_DELAY));

  //

  //Hacer click en el primer video
  await clickOnSelector(
    page,
    "div[data-e2e='user-post-item-list'] > div:nth-child(1)"
  );

  //hacer scroll en lo videos y darle "me gusta" en 10 videos
  for (let i = 1; i <= CANTIDAD_VIDEOS; i++) {
    const likeButtonSelector =
      "div.css-1d39a26-DivFlexCenterRow.ehlq8k31 > button:nth-child(1)";
    // Selecciona el boton "Me gusta"
    const likeButton = await page.locator(likeButtonSelector);
    // Obtiene el valor del atributo 'aria-pressed'
    const isPressed = await likeButton.getAttribute("aria-pressed");
    console.log("Estado del boton Me Gusta:", isPressed);

    //Verificar si el boton "Me gusta ya esta presionado"
    if (isPressed === "false") {
      console.log("Estado del boton Me Gusta:", isPressed);

      //Hacer click en el boton "Me Gusta"
      await clickOnSelector(page, likeButtonSelector);
      await page.waitForTimeout(getRandomDelay(MIN_DELAY, MAX_DELAY));

      //Hacer click en el boton "Guardar Video"
      await clickOnSelector(
        page,
        "div.css-1d39a26-DivFlexCenterRow.ehlq8k31 > button:nth-child(3)"
      );
      await page.waitForTimeout(getRandomDelay(MIN_DELAY, MAX_DELAY));
      console.log("Dando 'Me gusta' y 'Guardando video'");
    } else {
      console.log("No se necesita dar 'Me gusta' y 'Guardar video'");
    }

    // Escribir en comentarios
    await fillField(
      page,
      "div.notranslate.public-DraftEditor-content",
      "🛒🛒....🙌💖"
    );
    await waitForPageLoad(page);
    await page.waitForTimeout(getRandomDelay(MIN_DELAY, MAX_DELAY));

    await page.keyboard.press("Enter");
    await waitForPageLoad(page);
    await page.waitForTimeout(getRandomDelay(MIN_DELAY, MAX_DELAY));

    //Click en el boton 'Ir al siguiente video'
    await clickOnSelector(page, 'button[aria-label="Ir al siguiente vídeo"]');

    await waitForPageLoad(page);
    await page.waitForTimeout(getRandomDelay(MIN_DELAY, MAX_DELAY));

    console.log("Scroll: ", i);
  }
})();
