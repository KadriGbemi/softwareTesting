// Database User from Cluster
// Username: userCreated
//password: testing1234

// Connection string
// mongodb+srv://userCreated:testing1234@cluster0.mqc9d.mongodb.net/UsersProj?retryWrites=true&w=majority

const { MongoClient } = require("mongodb");

async function findUserByEmail(client, userEmail) {
  // See https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#findOne for the findOne() docs
  const result = await client
    .db("users_data")
    .collection("users_collection")
    .findOne({ email: userEmail });

  return result
}

async function find(email) {
  /**
   * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
   * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
   */
  const uri =
    "mongodb+srv://userCreated:testing1234@cluster0.mqc9d.mongodb.net/users_data?retryWrites=true&w=majority";
  const client = new MongoClient(uri);
  try {
    await client.connect();

    return await findUserByEmail(client, email);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

module.exports = find;
