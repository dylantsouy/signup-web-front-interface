const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.static(path.join("build"))) // configure static path

app.get('/static', function (req, res) {
  res.sendfile('build/static')
})
app.get('/*', function (req, res) {
  res.sendfile('build/index.html')
})
app.all('/*', function (req, res) {
  res.sendfile('build/index.html');
});

const port = process.env.REACT_APP_PORT || 8080
app.listen(PORT || 5000, () => console.log(`Listening on http://localhost:${PORT}`)); // listen on port