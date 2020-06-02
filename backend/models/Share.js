const mongoose = require("../database")
const shortid = require("shortid")

const ShareSchema = new mongoose.Schema({
    platform: {
        type: String,
        required: true
    },
	author: {
        type: String,
        required: false
    },
    url: {
        type: String,
        required: true
    },
	media_urls: {
        type: Array,
        required: false
    },
    caption: {
        type: String,
        required: false
    },
    quote: {
        type: String,
        required: false
    },
    quote_url: {
        type: String,
        required: false
    },
	profile_picture: {
        type: String,
        required: false
    },
    visits: {
        type: Number,
        required: true,
        default: 0
    },
    ping: {
        type: Number,
        required: true,
        default: 1
    },
    last_visit: {
        type: Date,
        required: true,
        default: Date.now
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    _id: {
        type: String,
        required: true,
        default: shortid.generate
    }
})

module.exports = mongoose.model('ShareSchema', ShareSchema)