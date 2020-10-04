var config = require('./dbconfig');
const sql = require('mssql');

async function getOrders() {
    try {
        let pool = await sql.connect(config);
        let products = await pool.request().query("SELECT * from Orders");
        return products.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function getOrder(orderId) {
    try {
        let pool = await sql.connect(config);
        let product = await pool.request()
            .input('input_parameter', sql.Int, orderId)
            .query("SELECT * from Orders where Id = @input_parameter");
        return product.recordsets;

    }
    catch (error) {
        console.log(error);
    }
}

async function addOrder(order) {
    try {
        let pool = await sql.connect(config);
        let insertProduct = await pool.request()
            .input('Id', sql.Int, order.Id)
            .input('Title', sql.NVarChar, order.Title)
            .input('Quantity', sql.Int, order.Quantity)
            .input('Message', sql.NVarChar, order.Message)
            .input('City', sql.NVarChar, order.City)
            .query('INSERT INTO Orders Values(@Id, @Title, @Quantity, @Message, @City)');
        return insertProduct.recordsets;
    }
    catch (err) {
        console.log(err);
    }
}

async function deleteOrder(orderId){
    try{
        let pool = await sql.connect(config);
        let deleteProduct = await pool.request()
        .input('Id', sql.Int, orderId)
        .query("DELETE Orders WHERE Id = @Id");
        return orderId;

    }catch(error){
        console.log(error)
    }
}

async function updateOrder(order, orderId) {
    try {
        let pool = await sql.connect(config);
        let updateProduct = await pool.request()
            .input('Id', sql.Int, orderId)
            .input('Title', sql.NVarChar, order.Title)
            .input('Quantity', sql.Int, order.Quantity)
            .input('Message', sql.NVarChar, order.Message)
            .input('City', sql.NVarChar, order.City)
            .query('UPDATE Orders SET Title = @Title, Quantity = @Quantity, Message = @Message, City = @City WHERE Id = @Id');
        return updateProduct.recordsets;
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = {
    getOrders: getOrders,
    getOrder : getOrder,
    addOrder : addOrder,
    deleteOrder : deleteOrder,
    updateOrder : updateOrder
}