const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const studentRouter = require('./routes/student');
const swaggerSetup = require('./swagger');

const app = express();
const port = 3000;

swaggerSetup(app);

app.use(bodyParser.json());
app.use(cors());

app.use('/api/student', studentRouter);

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}/api/student`);
});