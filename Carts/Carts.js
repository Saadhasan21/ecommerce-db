var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const dbName = "ecom";


var data = [

    {Product: "Fridge", users: "joshua khair", Product_qty: 4, base_price: 20000 ,sell_price: 25000, total_price: 100000 },
    {Product: "Grinder", users: "enoch kumar", Product_qty: 4, base_price: 5000 ,sell_price: 5500, total_price: 22000},
    {Product: "Oneplus", users: "shan patil", Product_qty: 1, base_price: 40000 ,sell_price: 42999, total_price: 42999 },
    {Product: "Sony", users: "venkat pandey", Product_qty: 1, base_price: 50000 ,sell_price: 55000,total_price: 55000 },
    {Product: "Shirt", users: "shan chaudhary", Product_qty: 2, base_price: 2000 ,sell_price: 2200,total_price: 4400  },
    {Product: "Novel", users: "iliyas khan", Product_qty: 2, base_price: 300 ,sell_price: 450, total_price: 900},
    {Product: "Sofa", users: "desa shyam", Product_qty: 1, base_price: 15000 ,sell_price: 18000,total_price: 18000 },
];

async function main() {
    let query;
    await client.connect();
    console.log("Connected successfully to server");
    const db = client.db(dbName);

    // create
    const insertData = await db.collection("Carts").insertMany(data);
    console.log(insertData.insertedCount + "record inserted");

    // read
    query = { base_price:5000};
    const getCarts = await db.collection("Carts").find(query).toArray();
    console.log(getCarts);

    // update
    query = { sell_price:42999 };
    const updatequery = { $set: { sell_price:45000, total_price:45000 }};
    const updateCarts = await db.collection("Carts").updateMany(query, updatequery);
    console.log(updateCarts.modifiedCount + " record updated");

    // delete
    query = { sell_price:25000 };
    const deleteCarts = await db.collection("Carts").deleteMany(query);
    console.log(deleteCarts.deletedCount + " record deleted");
    
}

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());
