const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
const app = require('./app');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;
const DB = process.env.DATABASE;

mongoose
  .connect(DB)
  .then(() => console.log('DB connection successful!'))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`App running on port ${process.env.PORT}...`);
});
