require('./mongo')

const express = require('express')
const app = express()
const cors = require('cors')

const Note = require('./models/Note')

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'Hello' })
})

app.get('/api/notes', (req, res) => {
  Note.find({})
    .then((notes) => res.json(notes))
    .catch((err) => next(err))
})

app.get('/api/notes/:id', (req, res, next) => {
  Note.findById(req.params.id)
    .then((note) => {
      note
        ? res.json(note)
        : res.status(404).json({ error: 'Nota no encontrada' })
    })
    .catch((err) => next(err))
})

app.post('/api/notes', (req, res, next) => {
  const note = req.body

  if (!note || !note.content) {
    return res.status(400).json({ error: 'Parámetros incorrectos o faltantes' })
  }

  const newNote = new Note({
    content: note.content,
    important: typeof note.important !== 'undefined' ? note.important : false,
    date: new Date().toISOString(),
  })

  newNote
    .save()
    .then((savedNote) => {
      res.status(201).json(savedNote)
    })
    .catch((err) => next(err))
})

app.delete('/api/notes/:id', (req, res, next) => {
  Note.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch((err) => next(err))
})

app.put('/api/notes/:id', (req, res, next) => {
  const note = req.body

  if (
    typeof note.content === 'undefined' ||
    typeof note.important === 'undefined'
  ) {
    return res.status(400).json({ error: 'Parámetros incorrectos o faltantes' })
  }

  Note.findByIdAndUpdate(req.params.id, note, { new: true })
    .then((result) => {
      res.json(result)
    })
    .catch((err) => next(err))
})

// se puede usar sentry para controlar mejor los errores 500

app.use((req, res, next) => {
  res.status(404).end()
})

app.use((error, req, res, next) => {
  console.error(error)

  error.name === 'CastError'
    ? res.status(400).json({ error: 'ID o valores incorrectos' }).end()
    : res.status(500).end()
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
