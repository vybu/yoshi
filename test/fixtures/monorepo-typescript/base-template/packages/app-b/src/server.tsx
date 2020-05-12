import path from 'path';
import ejs from 'ejs';
import express from 'express';

const app = express();

app.get('/', async (req, res) => {
  res.send(await ejs.renderFile(path.join(__dirname, './statics/index.ejs')));
});

app.listen(process.env.PORT);
