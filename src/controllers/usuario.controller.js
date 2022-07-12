const pool = require('../db');


//obtener usuarios
const getAllUser = async (req, res, next) => {
    try {
        const allTask = await pool.query("SELECT * FROM usuario");

        res.json(allTask.rows);

    } catch (error) {
        //res.json({error: error.message});
        next(error);
    }

 }

//obtener un usuario
const getUser = async (req, res, next) => {
    try {
        
        const { id } = req.params;
        const result = await pool.query("SELECT * FROM usuario WHERE id_usuario = $1", [id]);

        if (result.rows.length === 0) 
            return res.status(404).json({ 
                message: "tarea no encotrada",
            });
        
        res.json(result.rows[0]);
        
    } catch (error) {
       next(error);
       //res.json({error: error.message});
    }
}

//crear un usuario
const createUser = async (req, res, next) => {
    try {
        const { nom_usuario, contrasena } = req.body

        const result = await pool.query("INSERT INTO usuario (nom_usuario, contrasena) VALUES ($1, $2) RETURNING *", [nom_usuario, contrasena,]);

        res.json(result.rows[0]);

    } catch (error) {
        //res.json({error: error.message});
        next(error);
    }
}

//eliminar un usuario
const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query("DELETE FROM usuario WHERE id_usuario = $1", [id]);

    if (result,rowCount === 0)
        return res.status(404).json({
            message: 'User not found',
        });
    

    return res.sendStatus(204);
    } catch (error) {
        //res.json({error: error.message});
        next(error);
    }
}

//modificat un usuario
const updateUser = async (req, res, next) => {
    try {
        const { id } =req.params;
        const { nom_usuario, contrasena} = req.body;
    
        const result = await pool.query("UPDATE usuario SET nom_usuario = $1, contrasena = $2 WHERE id_usuario = $3 RETURNING *", [nom_usuario, contrasena, id]);
        
       if (result.rows.length === 0)
            return res.status(404).json({
                message: 'User not found',
            })
       return res.json(result.rows[0])
      } catch (error) {
        next(error);
      }
}

 module.exports ={
    getAllUser,
    getUser,
    createUser,
    deleteUser,
    updateUser
 }