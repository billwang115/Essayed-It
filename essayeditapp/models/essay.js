const mongoose = require('mongoose');

const EssaySchema = new mongoose.Schema({
    title: String,
    body: String
});

const Essay = mongoose.model('Essay', EssaySchema);

module.exports = { Essay };
