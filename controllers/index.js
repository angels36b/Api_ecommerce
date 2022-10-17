const { query } = require("express");
const { DatabaseError } = require("pg");
const connect = require("../database");

//tabla de producto
// const { connect } = require("../routes");
// req,params --> Recibimos datos que llegan por la URL pero son obligatorios
// req.query --> Recibimos datos que llegan por la URL pero son opcionales
// req.body --> Recibimos los datos que llegan en el body con POST , PUT, PATCH o DELETE

// metodo post
const createProduct = async (req, res) => {
  console.log(req)
  const {
    product_name,
    product_description,
    product_cost,
    category,
    brand,
    sku,
    image,
    quantity_stock,
  } = req.body;

  console.log(req.body);
  try {
    const dbResponse = await connect.query(
      `INSERT INTO products (
         product_name, 
         product_description,
         product_cost, 
         category, 
         brand, 
         sku, 
         image, 
         quantity_stock) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        product_name,
        product_description,
        product_cost,
        category,
        brand,
        sku,
        image,
        quantity_stock,
      ]
    );
    console.log(dbResponse());
    res.status(201).send({
      data: dbResponse.rowCount,
    });
  } catch (error) {
    res.status(409).send({
      error,
    });
  }
};

//metodo get
const obtenerProducto = async (req, res) => {
  try {
    const dbResponse = await connect.query("SELECT * FROM products");
    console.log(dbResponse.rows);

    res.status(200).send({
      data: dbResponse.rows,
    });
  } catch (error) {
    res.status(404).send({
      error,
    });
  }
};

const obtenerUnProducto = async (req, res) => {
  const id = req.params.idProducto;
  try {
    const dbResponse = await connect.query(
      "SELECT * FROM products WHERE id_product = $1 ",
      [id]
    );

    if (dbResponse.rowCount > 0) {
      res.status(200).send({
        data: dbResponse.rows,
      });
    } else {
      res.status(404).send({
        message: "Producto no encontrado",
      });
    }
  } catch (error) {
    res.status(404).send({
      error,
    });
  }
};
//metodo put

const updateProduct = async (req, res) => {
  const id = req.params.idProduct;
 
  const {
    product_name,
    product_description,
    product_cost,
    category,
    brand,
    sku,
    image,
    quantity_stock,
  } = req.body;
  console.log(req.body);
  try {
    const dbResponse = await connect.query(
      `
    UPDATE products
     SET 
        product_name = $1,
        product_description = $2,
        product_cost = $3,
        category = $4,
        brand = $5,
        sku = $6,
        image = $7,
        quantity_stock = $8
     WHERE id_product = $9 `,
      [
        product_name,
        product_description,
        product_cost,
        category,
        brand,
        sku,
        image,
        quantity_stock,
        id,
      ]
    );
    //validacion
    if (dbResponse.rowCount > 0) {
      res.status(200).send({
        message: "producto modificado",
      });
    } else {
      res.status(409).send({
        message: "No se pudo modificar el producto.",
      });
    }
  } catch (error) {
    res.status(500).send({
      error,
      message: "nada",
    });
  }
};

//delete
const deleteProduct = async (req, res) => {
  const { id } = req.params.idProduct;
  try {
    const dbResponse = await connect.query(
      `DELETE FROM products WHERE id_product= $1`,
      [id]
    );

    if (dbResponse.rowCount > 0) {
      res.status(200).send({
        message: "Producto eliminado",
      });
    } else {
      res.status(409).send({
        message: "No se pudo eliminar el producto",
      });
    }
  } catch (error) {
    res.status(400).send({
      error,
    });
  }
};

//creacion del crud user

//obtener todos los usuarios

const getUsers = async (req, res) => {
  try {
    const dbResponse = await connect.query("SELECT * FROM users");

    if (dbResponse.rowCount > 0) {
      res.status(200).send({
        data: dbResponse.rows,
      });
    } else {
      res.status(404).send({
        message: "Usuario no encontrado",
      });
    }
  } catch (error) {
    res.status(404).send({
      error,
    });
  }
};

//obtener un solo usuario
const getaUser = async (req, res) => {
  console.log(req.body);
  const id = req.params.idUser;

  try {
    const dbResponse = await connect.query(
      "SELECT * FROM users WHERE id_user = $1",
      [id]
    );
    console.log(dbResponse);
    if (dbResponse.rowCount > 0) {
      res.status(200).send({
        data: dbResponse.rows,
      });
    } else {
      res.status(404).send({
        message: "Usuario no encontrado",
      });
    }
  } catch (error) {}
};

//modificar usuario
const updateUser = async (req, res) => {

  const id = req.params.idUser;
  
  const {
    user_firts_name,
    user_last_name,
    email,
    date_birth,
    user_password,
    gender,
    id_profile
    
  } = req.body;
 
  try {
    const dbResponse = await connect.query(
      `UPDATE users 
       SET
          user_firts_name=$1,
          user_last_name=$2,
          email=$3,
          date_birth=$4,
          user_password=$5,
          gender=$6,
          id_profile=$7
       WHERE id_user=$8`, 
       [
        user_firts_name,
        user_last_name,
        email,
        date_birth,
        user_password,
        gender,
        id_profile,
        id
      ]
    )

    if (dbResponse.rowCount > 0) {
      res.status(200).send({
        message:"Usuario Modificado"
      });
    } else {
      res.status(404).send({
        message: "No se logro modificar el usuario",
      });
    }

  } catch (error) {
    res.status(500).send({
      error
    })
  }
}

module.exports = {
  createProduct,
  obtenerProducto,
  obtenerUnProducto,
  updateProduct,
  deleteProduct,
  getUsers,
  getaUser,
  updateUser
};
