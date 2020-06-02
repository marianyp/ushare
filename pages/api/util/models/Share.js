import mongoose from"../database"
import shortid from "shortid"

const ShareSchema = mongoose.models.ShareSchema || mongoose.model('ShareSchema', {
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

module.exports = ShareSchema