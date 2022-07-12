const { Router } = require('express');
const { getAllUser, getUser, createUser, deleteUser, updateUser } = require('../controllers/usuario.controller')

const router = Router();
//obtener usuarios
router.get('/usuario', getAllUser);

//obtener un usuario
router.get('/usuario/:id', getUser);

//crear un usuario
router.post('/usuario', createUser);

//eliminar un usuario
router.delete('/usuario/:id', deleteUser);

//modificat un usuario
router.put('/usuario/:id', updateUser);



module.exports = router;
