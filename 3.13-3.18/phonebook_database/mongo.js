
if (process.argv.length<3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const phone_number = process.argv[4]






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

