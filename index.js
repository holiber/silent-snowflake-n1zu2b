const puppeteer = require("puppeteer");
const express = require("express");
const port = 3000;

async function init() {
  const browser = await puppeteer.launch({
    executablePath: "/usr/bin/google-chrome",
    args: ["--no-sandbox"], // if we need them.
  });

  console.log("launched");

  const app = express();

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });

  app.get("/", async (request, response) => {
    response.send("service is working");
  });

  app.get("/screnshot", async (request, response) => {
    console.log("get screenshot");
    const page = await browser.newPage();
    await page.goto("http://google.com");
    const image = await page.screenshot({ fullPage: true });

    console.log("screenshot got");
    // await browser.close();
    response.set("Content-Type", "image/png");
    response.send(image);
  });
}

init();
