const express = require('express');
const mongoose = require("mongoose");
const MuleNumber = require("./model");

//Server
const app = express()
const port = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(port, function () {
    console.log('App listening on PORT: ' + port)
})

//DB Connection
mongoose.connect(process.env.MONGODB_URI);
//mongoose.connect("mongodb://localhost/mulenumber", { useNewUrlParser: true })

//Routing
app.get('/smiirl/muleNumber', function (req, res) {
    MuleNumber.findOne({ title: "MuleNumber" })
        .then(result => {
            console.log(result.number)
            res.json({ number: result.number })
        })
        .catch(err => {
            res.status(422).json(err)
        })
})

app.get('/smiirl/update/:number', function (req, res) {
    MuleNumber.update({ title: "MuleNumber" }, { number: req.params.number })
        .then(result => {
            res.json(result)
        })
        .catch(err => {
            res.status(422).json(err)
        })
})

app.get('/smiirl/upOne', function (req, res) {
    MuleNumber.findOne({ title: "MuleNumber" })
        .then(result => {
            MuleNumber.updateOne({ title: "MuleNumber" }, { number: (result.number + 1) })
                .then(result => {
                    res.json(result)
                })
                .catch(err => {
                    res.status(422).json(err)
                })
        })
        .catch(err => {
            res.status(422).json(err)
        })
})
