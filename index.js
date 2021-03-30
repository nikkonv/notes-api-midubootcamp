const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

let notes = [
  {
    id: 1,
    content: 'Me tengo que suscribir a @midudev en YouTube',
    date: '2019-05-30T17:30:31.098Z',
    important: true,
  },
  {
    id: 2,
    content: 'Tengo que estudiar las clases del FullStack Bootcamp',
    date: '2019-05-30T18:39:34.091Z',
    important: false,
  },
  {
    id: 3,
    content: 'Repasar los retos de JS de midudev',
    date: '2019-05-30T19:20:14.298Z',
    important: true,
  },
]

app.get('/', (req, res) => {
  res.json({ message: 'Hello' })
})

app.get('/api/notes', (req, res) => {
  res.json(notes)
})

app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  const note = notes.find((note) => note.id === id)
  if (note) {
    res.json(note)
  } else {
    res.status(404).json({ error: 'Nota no encontrada' })
  }
})

app.post('/api/notes', (req, res) => {
  const note = req.body

  if (!note || !note.content) {
    return res.status(400).json({ error: 'Parámetros incorrectos o faltantes' })
  }

  const ids = notes.map((note) => note.id)
  const maxId = Math.max(...ids)
  // also we can use the package uuid

  const newNote = {
    id: maxId + 1,
    content: note.content,
    important: typeof note.important !== 'undefined' ? note.important : false,
    date: new Date().toISOString(),
  }
  notes = [...notes, newNote]

  res.status(201).json(newNote)
})

app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  notes = notes.filter((note) => note.id !== id)
  res.status(204).end()
})

app.put('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  notes.map((note) => {
    if (note.id === id) {
      note.important = !note.important
      console.log(notes)
      return res.status(204).end()
    }
  })
  console.log('bbb')
  res.status(404).json({ error: 'Nota no encontrada' })
})

app.use((req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
  })
})

const PORT = 3001

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
