var express = require('express');
var router = express.Router();
var productsModel = require('../../modelos/productsModel')
var util = require('util');
const cloudinary = require('cloudinary').v2;
const uploader = util.promisify(cloudinary.uploader.upload)

/* GET home page. */
router.get('/', async function (req, res, next) {

   //  var products = await productsModel.getProducts();

   res.render('admin/products', {
      layout: 'admin/layout',
      usuario: req.session.nombre,
      // products
   });
});







// router.get('/eliminar/:id_new', async (req, res, next) => {
//   var id = req.params.id_new;
//   await novedadesModel.deleteNews(id);
//   res.redirect('/admin/novedades')
// })

// router.get('/modificar/:id_new', async (req, res, next) => {
//   var id = req.params.id_new;
//   var novedad = await novedadesModel.getNewById(id);
//   res.render('admin/modificar', {
//     layout: 'admin/layout',
//     novedad
//   })
// })

// router.post('/modificar', async (req, res, next) => {
//   try {
//     var obj = {
//       title: req.body.title,
//       subtitle: req.body.subtitle,
//       body: req.body.body
//     }
//     await novedadesModel.updateNewById(obj, req.body.id);
//     res.redirect('/admin/novedades');
//   } catch(error) {
//     res.render('admin/modificar', {
//       layout: 'admin/layout',
//       error: true,
//       message: 'No se modifico la novedad'
//     })
//   }
// })

module.exports = router;