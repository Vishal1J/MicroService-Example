const express = require("express");
const app = express();

//Setting up Error handling middleware

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

//Setting up Authentication

const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send('Unauthorized');
    }
    const token = authHeader.split(' ')[1];
    if (token !== 'secret-token') {
        return res.status(401).send('Unauthorized');
    }
    next();
};
app.use(auth);

//Server

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});


