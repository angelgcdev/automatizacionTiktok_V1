import { fillField } from "./fillField.js";
import { clickOnSelector } from "./clickOnSelector.js";
import { getRandomDelay } from "./getRandomDelay.js";

// Variables
const MIN_DELAY = 2000; // Minimo tiempo de espera en milisegundos
const MAX_DELAY = 7000; // Máximo tiempo de espera en milisegundos

//Funcion para iniciar sesion en Facebook
const loginToFacebook = async (page, { email, password }) => {
  try {
    // await page.goto(URL);
    await fillField(page, "#email", email);
    await fillField(page, "#pass", password);
    await clickOnSelector(page, "input[aria-label='Entrar']");

    await page.waitForNavigation({ timeout: 30000 });

    await page.waitForTimeout(getRandomDelay(MIN_DELAY, MAX_DELAY)); //pausa breve

    //Verificar si el usuario esta conectado
    const isLoggedIn = (await page.$('div[aria-label="Tu perfil"]')) !== null;

    if (!isLoggedIn) {
      //Verificar si la URL indica un problema relacionado con el inicio de sesión
      if (page.url().startsWith("https://www.facebook.com/login/")) {
        console.error(
          "Error: Problema detectado en la contraseña durante el inicio de sesión."
        );
        throw new Error("Problema en la contraseña del inicio de sesión.");
      }

      //Verificar si la URL indica un problema relacionado con la autenticación
      if (
        page
          .url()
          .startsWith(
            "https://www.facebook.com/two_step_verification/authentication"
          )
      ) {
        console.log("CAPTCHA detectado. Por favor, resuélvelo manualmente...");

        // Esperar indefinidamente hasta que la página se actualice
        await page.waitForNavigation({ timeout: 0 });
      }

      //Verificar si la URL indica un problema relacionado con la autenticación dos pasos
      if (page.url().startsWith("https://www.facebook.com/auth_platform")) {
        console.log(
          "CHECKPOINT detectado. Por favor, resuélvelo manualmente..."
        );
        // Esperar indefinidamente hasta que la página se actualice
        await page.waitForNavigation({ timeout: 0 });
        await page.waitForNavigation({ timeout: 0 });
        await page.waitForNavigation({ timeout: 0 });
      }
    }

    console.log(`Inicio de sesión con la cuenta ${email}  exitosa.`);
  } catch (error) {
    console.error(
      `Error al iniciar sesión con la cuenta ${email} de Facebook`,
      error
    );
    throw new Error(
      "Fallo en el inicio de sesión. Se cancela la automatización."
    );
  }
};

export { loginToFacebook };
