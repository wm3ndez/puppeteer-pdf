const http = require("http");
const puppeteer = require("puppeteer");

const hostname = "0";
const port = 3000;

const server = http.createServer(async (req, res) => {
  const buffers = [];

  for await (const chunk of req) {
    buffers.push(chunk);
  }

  const data = Buffer.concat(buffers).toString();

  await generatePDF(data.toString())
    .then((buffer) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/pdf");
      res.write(buffer);
    })
    .catch(() => {
      res.statusCode = 500;
    })
    .finally(() => res.end());
    
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

async function generatePDF(html = "") {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox', 
      '--single-process', 
      '--no-zygote',
      '--disable-gpu', 
      '--disable-dev-profile',
      '--disable-web-security', 
      '--disable-dev-shm-usage', 
    ],
  });
  const page = await browser.newPage();

  await page.setContent(html);

  const pdfBuffer = await page.pdf();

  await page.close();
  await browser.close();

  return pdfBuffer;
}
