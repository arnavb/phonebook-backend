const mongoose = require("mongoose");

const connectionString = (password) =>
  `mongodb+srv://fullstack:${password}@cluster0.s6irz.mongodb.net/phonebook-app?retryWrites=true&w=majority`;

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 5) {
  const [, , password, name, number] = process.argv;

  mongoose.connect(connectionString(password), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });

  const person = new Person({
    name,
    number,
  });

  person.save().then((result) => {
    console.log(`Added ${name} to the database`);
    mongoose.connection.close();
  });
} else if (process.argv.length === 3) {
  const password = process.argv[2];

  mongoose.connect(connectionString(password), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });

  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person.name, person.number);
    });
    mongoose.connection.close();
  });
} else {
  console.log("node mongo.js <password> [name] [number]");
  process.exit(1);
}
