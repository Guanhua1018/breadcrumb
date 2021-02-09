const express = require('express');
const contentRoutes = require('./routes/contentRoutes');

const app = express();
const port = 5000;

app.use('/api', contentRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
