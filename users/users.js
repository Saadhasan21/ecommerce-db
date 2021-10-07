var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const dbName = "ecom";


var data = [
    { first_name: "joshua", last_name: "khair", email: "a@email.com", profile_image: "yes", role: "full stack" },
    { first_name: "enoch", last_name: "kumar", email: "b@email.com", profile_image: "yes", role: "full stack" },
    { first_name: "shan", last_name: "patil", email: "c@email.com", profile_image: "yes", role: "full stack" },
    { first_name: "venkat", last_name: "pandey", email: "d@email.com", profile_image: "yes", role: "full stack" },
    { first_name: "shan", last_name: "chaudhary", email: "e@email.com", profile_image: "yes", role: "full stack" },
    { first_name: "iliyas", last_name: "khan", email: "f@email.com", profile_image: "yes", role: "full stack" },
    { first_name: "desa", last_name: "shyam", email: "g@email.com", profile_image: "yes", role: "full stack" },
];




async function main() {
    let query;
    await client.connect();
    console.log("Connected successfully to server");
    const db = client.db(dbName);

    // create
    const insertData = await db.collection("users").insertMany(data);
    console.log(insertData.insertedCount + "record inserted");

     // read
    query = { first_name: "shan" };
    const getusers = await db.collection("users").find(query).toArray();
    console.log(getusers);


    query = { first_name: "joshua" };
    const updatequery = { $set: { first_name: "Ksilash" } };
    const updateUser = await db.collection("users").updateMany(query, updatequery);
    console.log(updateUser.modifiedCount + " record updated");


    query = { first_name: "shan" };
    const deleteUser = await db.collection("users").deleteMany(query);
    console.log(deleteUser.deletedCount + " record deleted");
}
main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());