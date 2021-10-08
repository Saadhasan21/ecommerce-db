var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const dbName = "ecom";


var data = [
    { name: "Fridge", thumbnail:"https//sampleThumbnail/fridge", product_gallary:"https//sampleGalary/fridge", description:"this is description about the product", base_price:20000.00 ,sell_price:25000.00, category_name:"Home appliance", tags :"#home_appliance" , additional_information: "this is addition information about the product"},
    { name: "Grinder",  thumbnail:"https//sampleThumbnail/grinder", product_gallary:"https//sampleGalary/grinder", description:"this is description about the product", base_price:5000.00 ,sell_price:5500.00, category_name:"Kitchen appliance", tags :"#kitchen_appliance" , additional_information: "this is addition information about the product"},
    { name: "Oneplus",  thumbnail:"https//sampleThumbnail/oneplus", product_gallary:"https//sampleGalary/oneplus", description:"this is description about the product", base_price:40000.00 ,sell_price:42999.00, category_name:"Mobile", tags :"#mobile" , additional_information: "this is addition information about the product" },
    { name: "Sony", thumbnail:"https//sampleThumbnail/sony", product_gallary:"https//sampleGalary/sony", description:"this is description about the product", base_price:50000.00 ,sell_price:55000.00, category_name:"Laptop", tags :"#laptop" , additional_information: "this is addition information about the product"},
    { name: "Shirt", thumbnail:"https//sampleThumbnail/shirt", product_gallary:"https//sampleGalary/shirt", description:"this is description about the product", base_price:2000.00 ,sell_price:2200.00, category_name:"Fashion", tags :"#fashion" , additional_information: "this is addition information about the product" },
    { name: "Novel", thumbnail:"https//sampleThumbnail/novel", product_gallary:"https//sampleGalary/novel", description:"this is description about the product", base_price:300.00 ,sell_price:450.00, category_name:"Book", tags :"#book" , additional_information: "this is addition information about the product" },
    { name: "Sofa", thumbnail:"https//sampleThumbnail/sofa", product_gallary:"https//sampleGalary/sofa", description:"this is description about the product", base_price:15000.00 ,sell_price:18000.00, category_name:"Furniture", tags :"#furniture" , additional_information: "this is addition information about the product" },
];

async function main() {
    let query;
    await client.connect();
    console.log("Connected successfully to server");
    const db = client.db(dbName);

    // create
    const insertData = await db.collection("Products").insertMany(data);
    console.log(insertData.insertedCount + "record inserted");

    // read
    query = { name: "Oneplus"};
    const getProducts = await db.collection("Products").find(query).toArray();
    console.log(getProducts);

    // update
    query = { name: "Grinder" };
    const updatequery = { $set: { name: "Mixer Grinder" , thumbnail:"https//sampleThumbnail/mixer-grinder", product_gallary:"https//sampleGalary/mixer-grinder"} };
    const updateProducts = await db.collection("Products").updateMany(query, updatequery);
    console.log(updateProducts.modifiedCount + " record updated");

    // delete
    query = { name: "Fridge" };
    const deleteProducts = await db.collection("Products").deleteMany(query);
    console.log(deleteProducts.deletedCount + " record deleted");
}

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());
