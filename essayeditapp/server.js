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
	try {
		const result = await essay.save()
		res.send(result)
	} catch(error) {
		log(error)
			res.status(400).send('Bad Request')
	}

})

// POST /essays/id, posting a new edit to an essay, will have to loop through
app.post('/api/essays/:id', async (req, res) => {
	const id = req.params.id
	if (!ObjectID.isValid(id)) {
		res.status(404).send()
		return;
	}
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}

	try {
		const essay = await Essay.findById(id)
		if (!essay) {
			res.status(404).send('Resource not found')
		} else {
			essay.edits.push(req.body)
			const result = await essay.save()
			res.send(result)

		}
	} catch(error) {
		log(error)
		if (isMongoError(error)) {
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request')
		}
	}

})

//Request to GET one specific essay
app.get('/api/essays/:id', async (req, res) => {
	const id = req.params.id
	console.log(id)
	if (!ObjectID.isValid(id)) {
		res.status(404).send()
		return;
	}

	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}

	try {
		const essay = await Essay.findById(id)
		if (!essay) {
			res.status(404).send('Resource not found')
		} else {
			res.send(essay)
		}
	} catch(error) {
		log(error)
		res.status(500).send('Internal Server Error')
	}
})

const port = process.env.PORT || 5000
app.listen(port, () => {
	log(`Listening on port ${port}...`)
});
