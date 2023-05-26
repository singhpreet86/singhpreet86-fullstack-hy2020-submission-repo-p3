const mongoose = require('mongoose')

if (process.argv.length<3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const phone_number = process.argv[4]

const url =
    `mongodb+srv://harpreet7976:${password}@cluster0.xsnvkg0.mongodb.net/phoneBookDB?retryWrites=true&w=majority`
    // `mongodb+srv://fullstack:${password}@cluster0.o1opl.mongodb.net/?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const phoneSchema = new mongoose.Schema({
    name: String,
    phone_number: String,
})

const Phone = mongoose.model('phonebook', phoneSchema)

const phone = new Phone({
    name: name,
    phone_number: phone_number,
})

if (process.argv.length > 3) {
    phone.save().then(result => {
        console.log('added ' + name + ' number ' + phone_number + ' to phonebook')
        mongoose.connection.close()
    })
}

if (process.argv.length == 3){
    Phone.find({}).then(result => {
        result.forEach(phone => {
            console.log(phone.name + " " + phone.phone_number)
        })
        mongoose.connection.close()
    })
}
