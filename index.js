const express = require("express")
const sqlite3 = require("sqlite3").verbose()
const path = require("path")


const app = express()

const port  = 3000

app.use(express.json())

// Connect to the SQLite database or create it if it doesn't exist

const db = new sqlite3.Database(path.resolve(__dirname,"database.sqlite"),(err)=>{
    if(err){
        console.error("Error opening database:",err.message)
    }else{
        console.log("Connected to SQLite database. ")
    }
})

// create and pendingOrderTable table

db.run(`CREATE TABLE IF NOT EXISTS pendingOrderTable(id INTEGER PRIMARY KEY,buyer_qty INTEGER,buyer_price FLOAT,seller_price FLOAT,seller_qty INTEGER);`,(err) => {
        if(err){
            console.error("Error creating pending order Table")
            console.log(err)
        }else{
            console.log("pending order table already exists")
        }
    })

// Add index on buyer_price
db.run(`CREATE INDEX IF NOT EXISTS idx_buyer_price ON pendingOrderTable (buyer_price)`, (err) => {
    if (err) {
        console.error('Error creating index on buyer_price:', err.message);
    } else {
        console.log('Index on buyer_price created successfully.');
    }
});

// creating completedOrderTable table

db.run(`CREATE TABLE IF NOT EXISTS completedOrderTable(id INTEGER PRIMARY KEY,price FLOAT,qty INTEGER);`,(err) => {
        if(err){
            console.error("Error creating pending order Table")
            console.log(err)
        }else{
            console.log("pending order table already exists")
        }
})

// Add index on seller_price
db.run(`CREATE INDEX IF NOT EXISTS idx_seller_price ON pendingOrderTable (seller_price)`, (err) => {
    if (err) {
        console.error('Error creating index on seller_price:', err.message);
    } else {
        console.log('Index on seller_price created successfully.');
    }
});

db.close((err) => {
    if(err){
        console.error("Error closing the database:",err.message)
    }else{
        console.log("Database connection closed.")
    }
})

// "---------------------------------"

app.get("/",(request,response) => (
    response.send("Hello world")
))

app.post("/",(request,response ) => {
    const  {buyerPrice,sellerPrice,buyerQty,sellerQty} = request.body
    if(buyerPrice >= sellerPrice){
        const insertDataIntoCompletedQuery = `INSERT INTO completedOrderTable (price,qty) VALUES (${buyer_prince},${sellerPrice});`
    }else{
        const insertDataIntoPendingTableQuery = `INSERT INTO pendingOrderTable `
    }
})

app.listen(port, () => {
    console.log(`Server is running at ${port}`)
})