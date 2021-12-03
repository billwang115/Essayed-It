/* E4 server.js */
'use strict';
const log = console.log;

// Express
const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')


app.use(bodyParser.json());


app.use(cors())


// Mongo and Mongoose
const { ObjectID } = require('mongodb')
const { mongoose } = require('./db/mongoose');
const { Essay} = require('./models/essay')

// POST /essays, created when user submits their essay to the site
app.post('/api/essays', async (req, res) => {
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}
const essay = new Essay({
    title: req.body.title,
    body: req.body.body,
    //TODO: Add requester when that information is available
    description: req.body.description,
    topic: req.body.topic,
    type: req.body.type,
    price: req.body.price
	})
  console.log(req.body)
	try {
		const result = await essay.save()
		res.send(result)
	} catch(error) {
		log(error)
			res.status(400).send('Bad Request')
	}

})



const port = process.env.PORT || 5000
app.listen(port, () => {
	log(`Listening on port ${port}...`)
});
