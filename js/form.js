const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configure the PostgreSQL client
const client = new Client({
  user: 'ktymxabb',
  host: 'topsy.db.elephantsql.com',
  database: 'ktymxabb',
  password: 'XK0JkpvwS-kTPHaUt05OvC5_JCkpJJhB',
  port: 5432, // default PostgreSQL port
});

client.connect(); // Connect to the database

// Serve the HTML form
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/contact.html'); // Change the path to your HTML file
});

// Handle form submission
app.post('/submit', async (req, res) => {
  const { name, email, text } = req.body;

  try {
    await client.query(
      'INSERT INTO form_portofolio (name, email, text) VALUES ($1, $2, $3)',
      [name, email, text]
    );
    res.send('Data successfully submitted.');
  } catch (error) {
    console.error(error);
    res.send('Failed to submit data.');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
