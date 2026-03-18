if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const mongoose = require("mongoose");
const password = process.argv[2];
const dbName = "phonebook";
const url = `mongodb://mongoDB:${password}@ac-awwfvya-shard-00-00.od5cgsm.mongodb.net:27017,ac-awwfvya-shard-00-01.od5cgsm.mongodb.net:27017,ac-awwfvya-shard-00-02.od5cgsm.mongodb.net:27017/${dbName}?ssl=true&replicaSet=atlas-13hjzg-shard-0&retryWrites=true&w=majority&authSource=admin&appName=Cluster0`;

mongoose.set("strictQuery", false);
mongoose.connect(url, { family: 4 });

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
});
const Phonebook = mongoose.model("Phonebook", phonebookSchema);

if (process.argv.length === 5) {
  const name = process.argv[3];
  const number = process.argv[4];
  const phonebook = new Phonebook({
    name: name,
    number: number,
  });

  phonebook.save().then((result) => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });

  return;
}

Phonebook.find({}).then((result) => {
  console.log("phonebook:");
  result.forEach((phonebook) => {
    console.log(`${phonebook.name} ${phonebook.number}`);
  });
  mongoose.connection.close();
});
