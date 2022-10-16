const {Router} = require('express');
// const { createRoutesFromChildren } = require('react-router-dom');
const router = Router()

const { 
    createProduct, 
    obtenerProducto, 
    obtenerUnProducto, 
    updateProduct,
    // createUser,
    // getUser,
    // getaUser,
    // updateUser,
    deleteProduct
} = require('../controllers')

// CRUD: Post - producto

router.post('/api/v1/product', createProduct);
router.get('/api/v1/product',  obtenerProducto);
router.get('/api/v1/:idProducto', obtenerUnProducto);
router.put('/api/v1/:idProduct', updateProduct);
router.delete('/api/v1/:idProduct', deleteProduct);

//CRUD: user

// router.get('/api/v1/userr', getUser);
// router.post('/api/v1/user', createUser);
// router.get('api/v1/:idUser', getaUser);
// router.get('api/v1/:idUser', updateUser);

module.exports = router