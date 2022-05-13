var pool = require('./bd');

async function getSkates() {
    var query = 'select * from skates';
    var rows = await pool.query(query);
    return rows;
}

async function getClothes() {
    var query = 'select * from clothes';
    var rows = await pool.query(query);
    return rows;
}

async function getTrucksAndWheels() {
    var query = 'select * from trucksandwheels';
    var rows = await pool.query(query);
    return rows;
}

async function insertSkate(obj) {
    try {
        var query = 'insert into skates set ?';
        var rows = await pool.query(query, [obj]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function insertClothes(obj) {
    try {
        var query = 'insert into clothes set ?';
        var rows = await pool.query(query, [obj]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function insertTrucksAndWheels(obj) {
    try {
        var query = 'insert into trucksandwheels set ?';
        var rows = await pool.query(query, [obj]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function deleteSkate(id_product) {
    var query = 'delete from skates where id_product = ?';
    var rows = await pool.query(query, [id_product]);
    return rows;
}

async function deleteClothes(id_product) {
    var query = 'delete from clothes where id_product = ?';
    var rows = await pool.query(query, [id_product]);
    return rows;
}

async function deleteTrucksAndWheels(id_product) {
    var query = 'delete from trucksandwheels where id_product = ?';
    var rows = await pool.query(query, [id_product]);
    return rows;
}

async function getSkateById(id_product) {
    var query = 'select * from skates where id_product = ?';
    var rows = await pool.query(query, [id_product]);
    return rows[0];
}

async function getClothesById(id_product) {
    var query = 'select * from clothes where id_product = ?';
    var rows = await pool.query(query, [id_product]);
    return rows[0];
}

async function getTrucksAndWheelsById(id_product) {
    var query = 'select * from trucksandwheels where id_product = ?';
    var rows = await pool.query(query, [id_product]);
    return rows[0];
}

async function updateSkateById(obj, id_product) {
    try {
        var query = 'update skates set ? where id_product = ?';
        var rows = await pool.query(query, ([obj, id_product]));
        return rows;
    } catch (error) {
        throw (error);
    }
}

async function updateClothesById(obj, id_product) {
    try {
        var query = 'update clothes set ? where id_product = ?';
        var rows = await pool.query(query, ([obj, id_product]));
        return rows;
    } catch (error) {
        throw (error);
    }
}

async function updateTrucksAndWheelsById(obj, id_product) {
    try {
        var query = 'update trucksandwheels set ? where id_product = ?';
        var rows = await pool.query(query, ([obj, id_product]));
        return rows;
    } catch (error) {
        throw (error);
    }
}



module.exports = {
    getSkates,
    insertSkate,
    deleteSkate,
    getSkateById,
    updateSkateById,
    getClothes,
    insertClothes,
    deleteClothes,
    getClothesById,
    updateClothesById,
    getTrucksAndWheels,
    insertTrucksAndWheels,
    deleteTrucksAndWheels,
    getTrucksAndWheelsById,
    updateTrucksAndWheelsById
};