const http = require("http");
const puppeteer = require("puppeteer");

const hostname = "0";
const port = 3000;

const server = http.createServer(async (req, res) => {
  req.on("data", async  (d) => {

    await generatePDF(d.toString())
      .then((buffer) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/pdf");
        res.write(buffer);
      })
      .catch((er) => {
        console.error(er);
        res.statusCode = 500;
        res.write(er);
      })
      .finally(() => res.end());

  });

});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

async function generatePDF(html = "") {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setContent(html);

  const pdfBuffer = await page.pdf();

  await page.close();
  await browser.close();

  return pdfBuffer;
}
