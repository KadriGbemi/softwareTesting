// Database User from Cluster
// Username: userCreated
//password: testing1234

// Connection string
// mongodb+srv://userCreated:testing1234@cluster0.mqc9d.mongodb.net/UsersProj?retryWrites=true&w=majority

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
  /**
   * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
   * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
   */
  const uri =
    "mongodb+srv://userCreated:testing1234@cluster0.mqc9d.mongodb.net/users_data?retryWrites=true&w=majority";
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
