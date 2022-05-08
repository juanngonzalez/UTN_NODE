var pool = require('./bd');

async function getSkates(){
     var query = 'select * from skates';
     var rows = await pool.query(query);
     return rows;    
}

async function insertSkate(obj){
     try {
         var query = 'insert into skates set ?';
         var rows = await pool.query(query,[obj]);
         return rows;
     } catch(error) {
         console.log(error);
         throw error;
     }
}

// async function deleteNews(id_new){
//     var query = 'delete from news1 where id_new = ?';
//     var rows = await pool.query(query, [id_new]);
//     return rows;
// }

// async function getNewById(id_new){
//     var query = 'select * from news1 where id_new = ?';
//     var rows = await pool.query(query, [id_new]);
//     return rows[0];
// }

// async function updateNewById(obj, id_new){
//     try {
//         var query = 'update news1 set ? where id_new = ?';
//         var rows = await pool.query(query,([obj, id_new]));
//         return rows;
//     } catch(error){
//         throw(error);
//     }
// }


module.exports = {getSkates, insertSkate};
// deleteNews, getNewById, updateNewById