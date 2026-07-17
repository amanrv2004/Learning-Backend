// const url = 'mongodb+srv://emergency_hospital_db:@Aman2626@learnbackend.yqy4ipr.mongodb.net/?appName=LearnBackend'

const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'myProject';

async function main() {
  // Use connect method to connect to the server
  await client.connect();  // connect with cluster
  console.log('Connected successfully to server');
  const db = client.db(dbName);  // connect with database
  const collection = db.collection('user'); //connect with collection (user)

  // the following code examples can be pasted here...

  const findResult =  collection.find({});
  // const ans = await findResult.toArray();

  for await(const doc of findResult)
  console.log(doc)
  // console.log('found document => ',findResult);
  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());