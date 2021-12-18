Puppeteer PDF
=============

Very simple Node app that converts an input into a PDF file.

Usage
-----

Run the server:

```bash
$ npm start
```

Generate a PDF:

```bash
curl -X POST -d "<html><body>Hello, World</body></html>" --output mypdf.pdf http://localhost:3000
```
