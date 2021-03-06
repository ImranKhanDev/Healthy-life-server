const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");

const PORT = process.env.PORT || 8996;
app.use(express.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cpjqc.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
// console.log(uri);
async function run() {
  try {
    await client.connect();
    const database = client.db("healthy_life");
    const productsCollection = database.collection("products");
    // console.log("database connected successfully");

    // [post]
    app.post("/products", async (req, res) => {
      const product = req.body;
      const result = await productsCollection.insertOne(product);
      console.log(result);
      res.json(result);
    });
  } finally {
    //await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello from  Healthy life store !");
});
//runkit.com/
https: app.listen(PORT, () => {
  console.log(`Server is listening on  htts//:localhost : ${PORT}`);
});
