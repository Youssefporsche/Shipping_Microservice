require('dotenv').config();
const { MongoClient, ObjectID } = require('mongodb');
const util = require('util');
// imports mongodb and util packages : require = import in JS

util.promisify(MongoClient.connect);
//converts MongoClient.connect function from callback to promise interface


const { MONGO_URI } = process.env;
let dbConnection;
const connect = async () => {
 try {
 const client = await MongoClient.connect(MONGO_URI);
 dbConnection = client.db('RabbitMartShipping');
 } catch (e) {
 throw new Error(`Could not establish database connection: ${e}`);
 }
};
// Establish the connection
const mongoClient = async () => {
 if (!dbConnection) {
 await connect();
 }
 return dbConnection;
};
module.exports = {
 mongoClient,
 ObjectID
}