const {Router} = require('express');
// const { createRoutesFromChildren } = require('react-router-dom');
const router = Router()

const { 
    createProduct, 
    obtenerProducto, 
    obtenerUnProducto, 
    updateProduct,
    deleteProduct,
    getUsers,
    getaUser,
    createUser,
    updateUser
} = require('../controllers')

// CRUD: Post - producto

router.post('/api/v1/product', createProduct);
router.get('/api/v1/product',  obtenerProducto);
router.get('/api/v1/:idProducto', obtenerUnProducto);
router.put('/api/v1/:idProduct', updateProduct);
router.delete('/api/v1/:idProduct', deleteProduct);

//CRUD: user

router.get('/api/v2/users', getUsers);
router.get('/api/v2/:idUser', getaUser); //obtener un unico usuario
router.post('/api/v2/user', createUser);
router.put('/api/v2/:idUser', updateUser);

module.exports = router