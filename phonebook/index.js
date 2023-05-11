const express = require('express')
const morgan = require('morgan')
const app = express()
app.use(express.json())
const cors = require('cors')
app.use(express.static('build'))


app.use(cors())
// app.use(morgan('combined'))
// app.use(morgan(':method :url :status :response-time ms - :body'));


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-1234566"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    },
    {
        "id": 5,
        "name": "Harpreet Singh",
        "number": "7901713310"
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/info', (request, response) => {
    const count = persons.length
    const currentDate = new Date();
    const message = '<h3> Phonebook has info of ' + count + ' people </h3> <h3>'  + currentDate  + '</h3>'
    response.send(message)
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.post('/api/persons', (request, response) => {
    // morgan.token('body', (req) => JSON.stringify(req.body));
    let message = ""
    let error = false
    request.body["id"] = getRandomInt(9999999999)
    if(request.body.name == null || request.body.number == null){
        message = "The name or number is missing";
        error = true
    }
    const personExists = persons.find(person => person.name === request.body.name)

    if(personExists){
        message = "The name already exists in the phonebook";
        error = true
    }

    if(error){
        response.status(404).send(message)
    }else {
        const person = request.body
        response.json(person)
    }
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const errorMessage = 'Record not found';
    const person = persons.find(note => note.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).send(errorMessage)
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})



