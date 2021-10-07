var MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const dbName = "ecom";

var data = [
    { name: "full stack 1", slug: "https//role/fullstack/1" },
    { name: "full stack 2", slug: "https//role/fullstack/2" },
    { name: "full stack 3", slug: "https//role/fullstack/3" },
    { name: "full stack 4", slug: "https//role/fullstack/4" },
    { name: "full stack 5", slug: "https//role/fullstack/5" },
    { name: "full stack 6", slug: "https//role/fullstack/6" },
    { name: "full stack 7", slug: "https//role/fullstack/7" },
];

async function main() {
    let query;
    await client.connect();
    console.log("Connected successfully to server");
    const db = client.db(dbName);

    // create
    const insertData = await db.collection("role").insertMany(data);
    console.log(insertData.insertedCount + "record inserted");

    // read
    query = { name: "full stack 3" };
    const getrole = await db.collection("role").find(query).toArray();
    console.log(getrole);

    // update
    query = { name: "full stack 1" };
    const updatequery = { $set: { name: "Developer 1" ,slug:"https//role/developer/1"} };
    const updateUser = await db.collection("role").updateMany(query, updatequery);
    console.log(updateUser.modifiedCount + " record updated");

    // delete
    query = { name: "full stack 7" };
    const deleteUser = await db.collection("role").deleteMany(query);
    console.log(deleteUser.deletedCount + " record deleted");
}
main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());