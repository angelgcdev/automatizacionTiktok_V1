//Esperar por el cuerpo y el estadode la red
const waitForPageLoad = async (page) => {
  await page.waitForSelector("body", { timeout: 30000 });
  await page.waitForLoadState("networkidle", { timeout: 30000 });
};

export { waitForPageLoad };
