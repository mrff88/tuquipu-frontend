require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

const users = require('./users.json');
const clients = require('./clients.json');
const devices = require('./devices.json');
const services = require('./services.json');

const DB = process.env.REACT_APP_MONGODB_NAME;

const dataToSeed = {
  users,
  clients,
  devices,
  services,
};

const oidToObjectId = (jsonData, collectionName) => {
  return jsonData.map((item) => {
    let newItem = {};
    switch (collectionName) {
      case 'services':
        newItem = {
          ...item,
          _id: ObjectId(item._id['$oid']),
          deviceId: ObjectId(item.deviceId['$oid']),
          createdAt: new Date(parseInt(item.createdAt['$date']['$numberLong'])),
          updatedAt: new Date(parseInt(item.updatedAt['$date']['$numberLong'])),
        };
        break;

      case 'devices':
        newItem = {
          ...item,
          _id: ObjectId(item._id['$oid']),
          clientId: ObjectId(item.clientId['$oid']),
          createdAt: new Date(parseInt(item.createdAt['$date']['$numberLong'])),
          updatedAt: new Date(parseInt(item.updatedAt['$date']['$numberLong'])),
        };
        break;

      default:
        newItem = {
          ...item,
          _id: ObjectId(item._id['$oid']),
          createdAt: new Date(parseInt(item.createdAt['$date']['$numberLong'])),
          updatedAt: new Date(parseInt(item.updatedAt['$date']['$numberLong'])),
        };
        break;
    }
    return newItem;
  });
};

async function dropAndSeed(mongoClient, collectionName, jsonData) {
  const collection = mongoClient.db(DB).collection(collectionName);

  await collection.drop().catch((e) => {
    console.log('error when dropping', e);
    if (e.code !== 26) {
      throw e;
    }
  });
  await collection.insertMany(oidToObjectId(jsonData, collectionName));
}

async function seedDB() {
  // Connection URL

  const uri = `mongodb+srv://${process.env.REACT_APP_MONGO_URI}`;

  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();

    console.log('Connected correctly to server');

    for (const key of Object.keys(dataToSeed)) {
      await dropAndSeed(client, key, dataToSeed[key]);
    }

    console.log('Database seeded! :)');

    client.close();
  } catch (err) {
    console.log(err.stack);
    client.close();
  }
}

seedDB();
