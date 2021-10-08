var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const dbName = "ecom";


var data = [

    { user_id:"joshua05",total_items:1,products:["book"], billing_address:"New Delhi", shipping_address:"Noida", transaction_status:true,payment_mode:"Debit Card", payment_status:true, order_status:"Placed" },
    { user_id:"enoch78",total_items:1,products:["Phone"], billing_address:"Bangalore", shipping_address:"Bangalore", transaction_status:true,payment_mode:"Credit Card", payment_status:true, order_status:"Failed"},
    { user_id:"shan97",total_items:2,products:["laptop","book"], billing_address:"Sasaram", shipping_address:"Sasaram", transaction_status:true,payment_mode:"Phone pay", payment_status:true, order_status:"Payment not Recevied" },
    { user_id:"venkat56",total_items:3,products:["mobile","earphone","power bank"], billing_address:"Patna", shipping_address:"Patna", transaction_status:true,payment_mode:"Paytm", payment_status:true, order_status:"Placed" },
    { user_id:"shan12",total_items:1,products:["toy"],  billing_address:"Lucknow", shipping_address:"Varanasi", transaction_status:true,payment_mode:"Cash on delivery", payment_status:true, order_status:"Dispached"},
    { user_id:"iliyas45",total_items:2,products:["shirt","tie"], billing_address:"Kolkata", shipping_address:"Puri", transaction_status:true,payment_mode:"Cash on delivery", payment_status:true, order_status:"Delivered" },
    {user_id:"desa78",total_items:1,products:["sofa"], billing_address:"Surat", shipping_address:"Mumbai", transaction_status:true,payment_mode:"Debit Card", payment_status:true, order_status:"Shipped" }
];

async function main() {
    let query;
    await client.connect();
    console.log("Connected successfully to server");
    const db = client.db(dbName);

    // create
    const insertData = await db.collection("orders").insertMany(data);
    console.log(insertData.insertedCount + "record inserted");

    // read
    query = { user_id:"joshua05"};
    const getOrders = await db.collection("orders").find(query).toArray();
    console.log(getOrders);

    // update
    query = { user_id:"shan12" };
    const updatequery = { $set: { billing_address:"Kanpur"}};
    const updateOrders = await db.collection("orders").updateMany(query, updatequery);
    console.log(updateOrders.modifiedCount + " record updated");

    // delete
    query = { user_id:"desa78"};
    const deleteOrders = await db.collection("orders").deleteMany(query);
    console.log(deleteOrders.deletedCount + " record deleted");
    
}

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());
