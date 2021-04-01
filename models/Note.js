const { Schema, model } = require('mongoose')

const noteSchema = new Schema({
  content: String,
  date: Date,
  important: Boolean,
})

noteSchema.set('toJSON', {
  transform: (doc, returnedObj) => {
    returnedObj.id = returnedObj._id
    delete returnedObj._id
    delete returnedObj.__v
  },
})

const Note = model('Note', noteSchema)

module.exports = Note

// const note = new Note({
//   content: 'Primera nota',
//   date: Date(),
//   important: true,
// })

// note
//   .save()
//   .then((result) => {
//     console.log(result)
//     mongoose.connection.close()
//   })
//   .catch((err) => console.error(err))
