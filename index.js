require('dotenv').config(); // require = import in JS
const express = require('express');
const axios = require('axios');
const { ObjectId } = require('mongodb');
const { mongoClient } = require('./mongo');
const { uuid } = require('uuidv4');

//const port = 3000 
const app = express();
let allOrders;

const fetchOrders =async () => {
    const db = await mongoClient();
    await axios.get('https://rabbitmart-orders-microservice.vercel.app/api/orders/')
        .then(orders => { allOrders = orders.data.allData; })
        .then(() => {if (!db) db.collection('RabbitMartShipping').insertMany(allOrders) })
    return allOrders
}
// insertMany() function is used to insert multiple documents into a collection. 
//It accepts an array of documents to insert into the collection database if theDB doesnt exist
app.use(express.json())
//status array
const ShippmentStatus = ['CREATED', 'SHIPPED', ' DELIVERED', 'RETURNED']
fetchOrders();
require.updateStatus = (req, res) => {

    ShippingDb.updateOne(
        { _id: req.body.ObjectId },
        { set: { status: ShippmentStatus[0] } },
        { new: true },
        (err, ShippmentDB) => {
            if (err) {
                return res.status(400).json({ error: "Cannot update Shippment status" });
            }
            res.json(order);
        });
};
//Routes using the CRUD model
app.get('/api/RabbitMartShipping/:id', async (req,res) => {
    const db = await mongoClient();
    return res.json(await db.collection('RabbitMartShipping').findOne({_id:req.params.id}) );
  });
  app.get('/api/RabbitMartShipping', async (req,res) => {
    const db = await mongoClient();
    return res.json(await db.collection('RabbitMartShipping').find().toArray() );
  });

/*app.post('/api/RabbitMartShipping', async (req,res) => {
    const db = await mongoClient();
    if (!db) res.status(500).send('Systems Unavailable');
    const newOrder = {
      id: uuid(),
      name: req.body.name,
      price: req.body.price,
      status: req.body.status,
      order_date: req.body.date,
    };
    await db.collection('RabbitMartShipping').insertOne(newOrder);
  
    return res.send(newOrder);
  });*/
  app.post('/api/RabbitMartShipping', async (req,res) => {
    const db = await mongoClient();
    if (!db) res.status(500).send('Systems Unavailable');
    var myobj = { name: "Football", _id: "173" , status :"PROCESSING" , price: req.body.price, order_date: req.body.date } 
    await db.collection('RabbitMartShipping').insertOne(myobj);
    console.log("1 document inserted");
    return res.send(myobj);
  });
  
app.put('/:id', async (req, res) => {
    const db = await mongoClient();
    if (!db) res.status(500).send('Systems Unavailable');
    await db.collection('RabbitMartShipping').updateOne({ _id: (`${req.params.id}`) }, { $set: { status: ShippmentStatus[1] } })
    res.status(200).json({ msg: `Update product no.${req.params.id}` })
}) //The dollar function, $(), can be used as shorthand for the getElementById function
// document. getElementById("id_of_element").

app.patch('/:id', async (req, res) => {
    const db = await mongoClient();
    if (!db) res.status(500).send('Systems Unavailable');
    await db.collection('RabbitMartShipping').findOneAndUpdate({ _id: (`${req.params.id}`) }, { $set: { status: ShippmentStatus[2]} })
    res.status(200).json({ msg: `Return product no.${req.params.id}` })
})

//app.listen(port, () => console.log('Server connected successfully'))
app.listen(5000)
