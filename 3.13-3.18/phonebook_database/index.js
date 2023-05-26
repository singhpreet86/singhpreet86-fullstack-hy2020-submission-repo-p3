const mongoose = require('mongoose')
const bodyParser = require('body-parser');
var cors = require('cors')

const password = process.argv[2]

const express = require('express')
const app = express()
app.use(cors())
//app.use(bodyParser.json());
app.use(express.json())

app.use(express.static('build'))



// const unknownEndpoint = (request, response) => {
//     response.status(404).send({ error: 'unknown endpoint' })
// }
//
// // handler of requests with unknown endpoint
// app.use(unknownEndpoint)


const url = process.env.MONGODB_URI

mongoose.set('strictQuery',false)
mongoose.connect(url)

const phoneSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true,
    },
    phone_number: {
        type: String,
        validate: {
            validator: function(v) {
                return /\d{3}-\d{3}-\d{4}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        },
        required: [true, 'User phone number required']
    }
})

const Phone = mongoose.model('phonebook', phoneSchema)

app.get('/api/persons', (request, response) => {
    Phone.find({}).then(phone => {
        response.json(phone)
    })
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body
    console.log(request.body )

    if (body.name === undefined) {
        return response.status(400).json({ error: 'content missing' })
    }

    const phone = new Phone({
        name: body.name,
        phone_number: body.phone_number,
    })

    phone.save()
        .then(savedNote => {
            response.json(savedNote)
        })
        .catch(error => next(error))
})



app.get('/api/persons/:id', (request, response, next) => {
    Phone.findById(request.params.id)
        .then(note => {
            if (note) {
                response.json(note)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})




app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    const phone = {
        name: body.name,
        phone_number: body.phone_number
    }

    Phone.findByIdAndUpdate(request.params.id, phone, { new: true })
        .then(updatedNote => {
            response.json(updatedNote)
        })
        .catch(error => next(error))
})



app.delete('/api/persons/:id', (request, response, next) => {
    Phone.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})



const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
    }

    next(error)
}

// this has to be the last loaded middleware.
app.use(errorHandler)




const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
