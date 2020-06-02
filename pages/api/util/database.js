import mongoose from 'mongoose'

const dbPath = process.env.db_path

mongoose.connect(dbPath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

const db = mongoose.connection


db.on('open', () => {
    console.log("> Successfully connected to database")
})
db.on('error', () => {
    console.log("> Error when connecting to database")
})

module.exports = mongoose