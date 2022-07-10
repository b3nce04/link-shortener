import 'dotenv/config'
import express from 'express';
import mongoose from 'mongoose';
import randomstring from 'randomstring';

import UrlModel from './models/Url.js'

const app = express();
const port = process.env.port || 3000

app.use(express.urlencoded())
app.set('view engine', 'pug')
mongoose.connect(process.env.DB_URL)
    .then(() => {
        app.listen(port, () => {
            console.log(`Server listening on: http://localhost:${port}`);
        });
    })
    .catch(err => console.log(err))

app.get('/', (req, res) => {
    const links = UrlModel.find()
        .then((results) => {
            res.render('index', {
                links: results
            })
        })
})

app.post('/', (req, res, next) => {
    const {url} = req.body
    const generated = randomstring.generate(6)
    UrlModel.create({id: generated, fullUrl: url})
        .then(() => {
            res.redirect('/')
        })
})

app.get('/:id', (req, res) => {
    if (req.params.id) {
        UrlModel.findOne({id: req.params.id})
            .then((result) => {
                console.log(result);
                result.clicks++;
                result.save();
                res.redirect(result.shortUrl)
            })
    } else {
        res.redirect('/')
    }
})