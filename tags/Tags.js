var MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const dbName = "ecom";

var data = [
    { Name: "#home_appliance", Slug : "https//amazon.in/homeAppliance" },
    { Name: "#kitchen_appliance", Slug : "https//amazon.in/kitchen"},
    { Name: "#mobile", Slug: "https//amazon.in/mob"},
    { Name: "#laptop", Slug: "https//amazon.in/laptop"},
    { Name: "#fashion", Slug: "https//amazon.in/fashion"},
    { Name: "#book", Slug: "https//amazon.in/book"},
    { Name: "#furniture", Slug: "https//amazon.in/furniture"},
];

async function main() {
    let query;
    await client.connect();
    console.log("Connected successfully to server");
    const db = client.db(dbName);

    // create
    const insertData = await db.collection("Tags").insertMany(data);
    console.log(insertData.insertedCount + "record inserted");

    // read
    query = { Name: "#book" };
    const getTags = await db.collection("Tags").find(query).toArray();
    console.log(getTags);

    // update
    query = { Name: "#laptop" };
    const updatequery = { $set: { Name: "#desktop" ,Slug:"https//amazon.in/desktop"} };
    const updateTags = await db.collection("Tags").updateMany(query, updatequery);
    console.log(updateTags.modifiedCount + " record updated");

    // delete
    query = { Name: "#home_appliance" };
    const deleteTag = await db.collection("Tags").deleteMany(query);
    console.log(deleteTag.deletedCount + " record deleted");
}
main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());