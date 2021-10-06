var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/ecom";
MongoClient.connect(url, function (err, client) {
    if (err) throw err;
    var myobj = [
        { first_name: "joshua", last_name: "khair", email: "a@email.com", profile_image: "yes", role: "full stack" },
        { first_name: "enoch", last_name: "kumar", email: "b@email.com", profile_image: "yes", role: "full stack" },
        { first_name: "shan", last_name: "patil", email: "c@email.com", profile_image: "yes", role: "full stack" },
        { first_name: "venkat", last_name: "pandey", email: "d@email.com", profile_image: "yes", role: "full stack" },
        { first_name: "shan", last_name: "chaudhary", email: "e@email.com", profile_image: "yes", role: "full stack" },
        { first_name: "iliyas", last_name: "khan", email: "f@email.com", profile_image: "yes", role: "full stack" },
        { first_name: "desa", last_name: "shyam", email: "g@email.com", profile_image: "yes", role: "full stack" },
    ];
    const db = client.db("ecom");

    // create
    db.collection("users").insertMany(myobj, function (err, res) {
        if (err) throw err;
        console.log("Number of records inserted: " + res.insertedCount);

    });

    // read
    var query = { first_name: "shan" };
    db.collection("users").find(query).toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
    });


    // update
    db.collection("users").updateOne({ first_name: "shan" }, { $set: { first_name: "Saad Hasan" } }, function (err, res) {
        if (err) throw err;
        console.log("updated");

    });


    // delete
    var myquery = { first_name: 'joshua' };
    db.collection("users").deleteOne(myquery, function (err, obj) {
        if (err) throw err;
        console.log(obj.result + " record(s) deleted");
        client.close();

    });


});
