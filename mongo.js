const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://fullstack:${password}@cluster0.1sgvx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const phonenumberSchema = new mongoose.Schema({
  name: String,
  number: String
})

const PhoneNumber = mongoose.model('PhoneNumber', phonenumberSchema)

if(process.argv.length === 5){
  const name = process.argv[3]
  const number = process.argv[4]
  const phoneNumber = new PhoneNumber({
    name: name,
    number: number
  })

  phoneNumber.save().then(() => {
    console.log(`added ${name} ${number} to phonebook`)
    mongoose.connection.close()
  })
}else{
  PhoneNumber.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(phoneNumber => {
      console.log(phoneNumber.name + ' ' + phoneNumber.number)
    })
    mongoose.connection.close()
  })
}