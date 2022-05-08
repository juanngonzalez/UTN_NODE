var express = require('express');
var router = express.Router();
var productsModel = require('../../../modelos/productsModel')
var util = require('util');
const cloudinary = require('cloudinary').v2;
const uploader = util.promisify(cloudinary.uploader.upload)


router.get('/', async function(req, res, next) {

    var skates = await productsModel.getSkates();
    
    skates = skates.map(skate => {
        if(skate.image){
            const image = cloudinary.image(skate.image, {
                width: 100,
                height: 100,
                crop: 'fill'
            });
            return {
                ...skate,
                image
            }
        } else {
            return {
                ...skate,
                image: ""
            }
        }
    })

    res.render('admin/products/skates', {
     layout: 'admin/layout',
     usuario: req.session.nombre,
     skates
    });
 })

 router.get('/add_skate', (req, res, next) => {
    res.render('admin/products/add_skate', {
       layout: 'admin/layout',
    })
 })
 
 router.post('/add_skate', async (req, res, next) => {
    try {
       var img_id = "";
       if(req.files && Object.keys(req.files).length > 0) {
          image = req.files.image;
          img_id = (await uploader(image.tempFilePath)).public_id;
       }
 
       if (req.body.name != "" && req.body.price > 0 && req.body.stock > 0) {
          await productsModel.insertSkate({
             ...req.body,
             img_id
          });
          res.redirect('admin/products/skates')
       } else {
          res.render('admin/products/add_skate', {
             layout: 'admin/layout',
             error: true,
             message: "Todos los campos son requeridos"
          })
       }
    } catch (error) {
       console.log(error)
       res.render('admin/products/add_skate', {
          layout: 'admin/layout',
          error: true,
          message: "No se cargo la novedad"
       })
    }
 });
 





 
 

module.exports = router;