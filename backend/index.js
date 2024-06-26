require('dotenv').config(); 
const express = require('express');
const stripeRoute = require('./routes/stripe');
const productRoutes = require('./routes/products');
const PORT = process.env.PORT  || 3000;
const cors = require('cors');
const mongoose = require('mongoose');
const corsOptions = {
  origin: 'https://www.fricanopastries.mooo.com', 
  optionsSuccessStatus: 200
};

const app = express();



app.use(express.json());
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));


app.use("/stripe", stripeRoute);
app.use("/products", productRoutes)

app.get("/", (req, res) => {
  res.send("Welcome our to online shop API...");
});

mongoose
  .connect('mongodb://127.0.0.1:27017/fricanopastries', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Conexion exitosa a la base de datos");
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});