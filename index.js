const express = require('express');
const app = express();
const port = process.env.X_ZOHO_CATALYST_LISTEN_PORT ||3000;

const summarizeText = require('./summarize.js');

app.use(express.json());

app.use(express.static('public'));

app.post('/summarize', (req,res) => {
  const text = req.body.text_to_summarize;
  summarizeText(text)
    .then(response => {
      res.send(response);
    })
    .catch(error => {
      res.send(error.message);
    });
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
