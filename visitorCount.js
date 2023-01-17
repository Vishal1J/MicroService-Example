const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost/visitor-counter', { useNewUrlParser: true });


const VisitorCounter = mongoose.model('VisitorCounter', new mongoose.Schema({
    visitors: { type: Number, default: 0 }
}));


app.post('/visitor', async (req, res) => {
    const visitorCounter = await VisitorCounter.findOne();
    visitorCounter.visitors += 1;
    await visitorCounter.save();
    res.send('Visitor count incremented');
});

app.get('/visitor', async (req, res) => {
    const visitorCounter = await VisitorCounter.findOne();
    res.send(`Visitor count: ${visitorCounter.visitors}`);
});

app.use(async (req, res, next) => {
    await VisitorCounter.findOneAndUpdate({}, { $inc: { visitors: 1 } });
    next();
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
