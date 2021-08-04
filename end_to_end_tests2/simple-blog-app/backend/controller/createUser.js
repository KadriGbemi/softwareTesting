const { MongoClient } = require("mongodb");

async function createUser(client, newUser) {
  const result = await client
    .db("users_data")
    .collection("users_collection")
    .insertOne(newUser);
  console.log(
    `New listing created with the following id: ${result.insertedId}`
  );
}

async function create(newUser) {
  const uri =  "mongodb+srv://<username>:<password>@<your-cluster-url>/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri);
  try {
    await client.connect();
    
    await createUser(client, newUser);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

module.exports = create;
