const express = require('express');
const connectDB = require('./config/db')
const cors = require('cors')
const app = express();
const bodyParser = require('body-parser')

// Access-Control-Allow-Origin: *
// Access-Control-Allow-Origin: <origin>
// Access-Control-Allow-Origin: null


connectDB()

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ extended: false }));
// app.use(bodyParser.json())
const users = require('./routes/api/user')

app.use('/', users)

app.get('/', (req, res) => res.send('Hello world!'));

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));