const supertest = require('supertest')
const mongoose = require('mongoose')
const Note = require('../models/Note')
const { app, server } = require('../index')

const api = supertest(app)

const initialNotes = [
  {
    content: 'hola',
    important: true,
    date: new Date(),
  },
  {
    content: 'que tal',
    important: true,
    date: new Date(),
  },
]

beforeEach(async () => {
  await Note.deleteMany({})
  for (const note of initialNotes) {
    const noteObj = new Note(note)
    await noteObj.save()
  }
})

test('notes as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two notes', async () => {
  const res = await api.get('/api/notes')

  expect(res.body).toHaveLength(initialNotes.length)
})

afterAll(() => {
  mongoose.connection.close()
  server.close()
})
