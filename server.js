const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

dotenv.config();

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/slot', require('./routes/slotRoutes'));

//SERVE STATIC ASSETS IN PRODUCTION
if (process.env.NODE_ENV === 'production') {
  //set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    let url = path.join(__dirname, '../client/build', 'index.html');
    if (!url.startsWith('/app/'))
      // since we're on local windows
      url = url.substring(1);
    res.sendFile(url);
  });
}

const port = process.env.PORT || 5000;

app.listen(
  port,
  console.log(`server is running in ${process.env.NODE_ENV} on port ${port}`)
);
