const { Pool } = require("pg")  //permite conexion con la base de datos

// const connect = new Pool({
//     host:"babar.db.elephantsql.com",
//     username: "zjytwxde",
//     password: "RH4JMRrnSCv1SgIaQm6skjXwBpMQKCzl",
//     database:"zjytwxde",
//     port: "5432"
// })
//pool es el metodo del driver de postgres que permite hacer una conexion 

const connect = new Pool({
    host:"localhost",
    user: "postgres",
    password: "1234",
    database:"e-commerce",
    port: "5432"
})
module.exports = connect