

const { MongoClient } = require('mongodb');
// Connection URL
const url = 'mongodb+srv://webpixellibrary_db_user:Qwert12345@cluster0.nrmzxfr.mongodb.net/LearnBackend?appName=Cluster0';
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

  // for await(const doc of findResult)
  // console.log(doc)
  // console.log('found document => ',findResult);

  // const insertResult = await collection.insertOne({name:"Aman",age:40})
  const insertResult = await collection.insertMany([{name:"Aman",age:21},{name:"Ajay",age:20}])

  console.log('Inserted Successfully ', insertResult)


  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());