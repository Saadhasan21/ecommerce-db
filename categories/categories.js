var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/ecom";
MongoClient.connect(url, function (err, client) {
    if (err) throw err;
    var myobj = [
        { Name: "home appliance", Slug : "https//amazon.in/homeAppliance", Image: "#pic", Description:"#about" },
        { Name: "kitchen appliance", Slug : "https//amazon.in/kitchen", Image: "#pic", Description:"#about"},
        { Name: "mobile", Slug: "https//amazon.in/mob", Image: "#pic", Description:"#about"},
        { Name: "laptop", Slug: "https//amazon.in/laptop",Image: "#pic", Description:"#about"},
        { Name: "fashion", Slug: "https//amazon.in/fashion",Image: "#pic", Description:"#about" },
        { Name: "book", Slug: "https//amazon.in/book",Image:"#pic",Description:"#about"  },
        { Name: "furniture", Slug: "https//amazon.in/furniture", Image: "#pic", Description:"#about" },
    ];
    const db = client.db("ecom");

    // create
    db.collection("Categories").insertMany(myobj, function (err, res) {
        if (err) throw err;
        console.log("Number of records inserted: " + res.insertedCount);

    });

    // read
    var query = { Name: "mobile" };
    db.collection("Categories").find(query).toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
    });


    // update
    db.collection("Categories").updateOne({ Name: "book" }, { $set: { Name: "Pustak" } }, function (err, res) {
        if (err) throw err;
        console.log("updated");

    });


    // delete
    var myquery = { Name: 'fashion' };
    db.collection("Categories").deleteOne(myquery, function (err, obj) {
        if (err) throw err;
        console.log(obj.result + " record(s) deleted");
        client.close();

    });


});
