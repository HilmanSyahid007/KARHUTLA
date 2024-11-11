const { MongoClient } = require('mongodb');

async function main() {
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/drivers/node/ for more details
     */
    const uri = "mongodb+srv://hilmansyahid:123@tugas.ed36iyy.mongodb.net/?retryWrites=true&w=majority";
    
    /**
     * The Mongo Client you will use to interact with your database
     * See https://mongodb.github.io/node-mongodb-native/3.6/api/MongoClient.html for more details
     * In case: '[MONGODB DRIVER] Warning: Current Server Discovery and Monitoring engine is deprecated...'
     * pass option { useUnifiedTopology: true } to the MongoClient constructor.
     * const client =  new MongoClient(uri, {useUnifiedTopology: true})
     */
    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        await deleteListingByName(client, "user_2");   
        // Make the appropriate DB calls

    } finally {
        // Close the connection to the MongoDB cluster
        await client.close();
    }
}

main().catch(console.error);
// DELETE
async function deleteListingByName(client, nameOfListing) {
    const result = await client.db("karhutla").collection("user")
            .deleteOne({ id_user: nameOfListing });
    console.log(`${result.deletedCount} document(s) was/were deleted.`);
}
// UPDATE
async function updateListingByName(client, nameOfListing, updatedListing) {
    const result = await client.db("karhutla").collection("user")
                        .updateOne({ id_user: nameOfListing }, { $set: updatedListing });

    console.log(`${result.matchedCount} document(s) matched the query criteria.`);
    console.log(`${result.modifiedCount} document(s) was/were updated.`);
}

// READ
async function findOneListingByName(client, nameOfListing) {
    const result = await client.db("karhutla").collection("user").findOne({ id_user: nameOfListing });

    if (result) {
        console.log(`Found a listing in the collection with the name '${nameOfListing}':`);
        console.log(result);
    } else {
        console.log(`No listings found with the id_user '${nameOfListing}'`);
    }
}


// CREATE
async function createListing(client, newListing){
    const result = await client.db("karhutla").collection("user").insertOne(newListing);
    console.log(`New listing created with the following id: ${result.insertedId}`);
}

async function createMultipleListings(client, newListings){
    const result = await client.db("karhutla").collection("user").insertMany(newListings);

    console.log(`${result.insertedCount} new listing(s) created with the following id(s):`);
    console.log(result.insertedIds);       
}