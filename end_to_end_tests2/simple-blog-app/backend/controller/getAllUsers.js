const { MongoClient } = require("mongodb");

async function getAllUsers(client) {
  const col = await client.db("users_data");
  if (col) {
    const response = await col.collection("users_collection").find({});
    if (response) {
      const result = await response.toArray();
      return result;
    }
  }
}

async function findAll() {
  const uri =
    "mongodb+srv://userCreated:testing1234@cluster0.mqc9d.mongodb.net/users_data?retryWrites=true&w=majority";
  const client = new MongoClient(uri);
  try {
    await client.connect();

    return await getAllUsers(client);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

module.exports = findAll;
