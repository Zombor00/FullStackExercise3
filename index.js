const express = require('express')
const cors = require('cors')
var morgan = require('morgan')

const app = express()
app.use(cors())
app.use(express.static('build'))

morgan.token('POST', (req) => {
  if (req.method === 'POST') return JSON.stringify(req.body)
  return null
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :POST'))


let persons = [
    {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
    }, 
    {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
    },
    {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
    },
    {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
    }
        
]


app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/info', (req, res) => {
    console.log(persons)
    let length = persons.length
    let date = new Date()
    let response = '<div>Phonebook has info for ' + length + ' people </div>'
    response += '<div> ' + date + '</div>'
    res.send(response)
  })

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

const generateId = () => {
  const max = 100000
  const min = 1 
  return Math.floor(Math.random() * (max - min) + min)
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'name or number missing' 
    })
  }

  if (persons.find(person => person.name === body.name) !== undefined) {
    return response.status(400).json({ 
      error: 'name must be unique' 
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }

  persons = persons.concat(person)

  response.json(person)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})