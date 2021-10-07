var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const dbName = "ecom";


var data = [
    { Name: "home appliance", Slug: "https//amazon.in/homeAppliance", Image: "#pic", Description: "#about" },
    { Name: "kitchen appliance", Slug: "https//amazon.in/kitchen", Image: "#pic", Description: "#about" },
    { Name: "mobile", Slug: "https//amazon.in/mob", Image: "#pic", Description: "#about" },
    { Name: "laptop", Slug: "https//amazon.in/laptop", Image: "#pic", Description: "#about" },
    { Name: "fashion", Slug: "https//amazon.in/fashion", Image: "#pic", Description: "#about" },
    { Name: "book", Slug: "https//amazon.in/book", Image: "#pic", Description: "#about" },
    { Name: "furniture", Slug: "https//amazon.in/furniture", Image: "#pic", Description: "#about" },
];

async function main() {
    let query;
    await client.connect();
    console.log("Connected successfully to server");
    const db = client.db(dbName);

    // create
    const insertData = await db.collection("categories").insertMany(data);
    console.log(insertData.insertedCount + "record inserted");

    // read
    query = { Name: "kitchen appliance"};
    const getcategories = await db.collection("categories").find(query).toArray();
    console.log(getcategories);

    // update
    query = { Name: "mobile" };
    const updatequery = { $set: { Name: "mobile phone" } };
    const updateCategories = await db.collection("categories").updateMany(query, updatequery);
    console.log(updateCategories.modifiedCount + " record updated");

    // delete
    query = { Name: "kitchen appliance" };
    const deleteCategories = await db.collection("categories").deleteMany(query);
    console.log(deleteCategories.deletedCount + " record deleted");
}

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());
