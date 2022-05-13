var express = require('express');
var router = express.Router();
var productsModel = require('../../../modelos/productsModel')
var util = require('util');
const cloudinary = require('cloudinary').v2;
const uploader = util.promisify(cloudinary.uploader.upload)
const destroy = util.promisify(cloudinary.uploader.destroy);

router.get('/', async function (req, res, next) {

   var clothes = await productsModel.getClothes();

   clothes = clothes.map(clothes => {
      if (clothes.img_id) {
         const image = cloudinary.image(clothes.img_id, {
            width: 100,
            height: 100,
            //crop: 'fill'
         });
         return {
            ...clothes,
            image
         }
      } else {
         return {
            ...clothes,
            image: ""
         }
      }
   })

   res.render('admin/products/clothes/clothes_list', {
      layout: 'admin/layout',
      usuario: req.session.nombre,
      clothes

   });
})


router.get('/add_clothes', (req, res, next) => {
   res.render('admin/products/clothes/add_clothes', {
      layout: 'admin/layout',
      usuario: req.session.nombre
   })
})


router.post('/add_clothes', async (req, res, next) => {
   try {
      var img_id = "";
      if (req.files && Object.keys(req.files).length > 0) {
         image = req.files.image;
         img_id = (await uploader(image.tempFilePath)).public_id;
      }

      if (req.body.name != "" && req.body.price > 0 && req.body.stock > 0) {
         await productsModel.insertClothes({
            ...req.body,
            img_id
         });
         res.redirect('/admin/products/clothes/clothes_list')
      } else {
         res.render('admin/products/clothes/add_clothes', {
            usuario: req.session.nombre,
            layout: 'admin/layout',
            error: true,
            message: "Todos los campos son requeridos"
         })
      }
   } catch (error) {
      console.log(error)
      res.render('admin/products/clothes/add_clothes', {
         usuario: req.session.nombre,
         layout: 'admin/layout',
         error: true,
         message: "No se cargo el producto"
      })
   }
});

router.get('/delete/:id_product', async (req, res, next) => {
   var id = req.params.id_product;
   await productsModel.deleteClothes(id);
   res.redirect('/admin/products/clothes/clothes_list')
})

router.get('/update/:id_product', async (req, res, next) => {
   var id = req.params.id_product;
   var clothes = await productsModel.getClothesById(id);
   res.render('admin/products/clothes/update', {
      layout: 'admin/layout',
      usuario: req.session.nombre,
      clothes
   })
})

router.post('/update', async (req, res, next) => {
   try {
      
      let img_id = req.body.img_origin;
      let delete_old_image = false;
      if (req.body.img_delete === "1") {
         img_id = null;
         delete_old_image = true;
      } else {
         if (req.files && Object.keys(req.files).length > 0) {
            image = req.files.image;
            img_id = (await uploader(image.tempFilePath)).public_id;
            delete_old_image = true;
         }
      }
      if (delete_old_image && req.body.img_origin) {
         await (destroy(req.body.img_origin));
      }
      var obj = {
         name: req.body.name,
         price: req.body.price,
         stock: req.body.stock,
         img_id
      }
      await productsModel.updateClothesById(obj, req.body.id_product);
      res.redirect('/admin/products/clothes/clothes_list');
   } catch (error) {
      res.render('admin/products/clothes/update', {
         usuario: req.session.nombre,
         layout: 'admin/layout',
         error: true,
         message: 'No se modifico el poducto'
      })
   }
})

module.exports = router;