var express = require('express');
var router = express.Router();
var novedadesModel = require('../../modelos/novedadesModel')

/* GET home page. */
router.get('/', async function(req, res, next) {

  var novedades = await novedadesModel.getNews();

  res.render('admin/novedades', {
    layout: 'admin/layout',
    usuario: req.session.nombre,
    novedades
  });
});

router.get('/agregar',(req, res, next) => {
  res.render('admin/agregar',{
    layout: 'admin/layout'
  })
})

router.post('/agregar',async (req, res, next) => {
  try {
    if(req.body.title != "" && req.body.subtite != "" && req.body.body != "") {
      await novedadesModel.insertNews(req.body);
      res.redirect('/admin/novedades')
    } else {
      res.render('admin/agregar', {
        layout:'admin/layout',
        error: true,
        message: "Todos los campos son requeridos"
      })
    }
  } catch(error) {
    console.log(error)
    res.render('admin/agregar',{
      layout:'admin/layout',
      error: true,
      message: "No se cargo la novedad"
    })
  }
});

router.get('/eliminar/:id_new', async (req, res, next) => {
  var id = req.params.id_new;
  await novedadesModel.deleteNews(id);
  res.redirect('/admin/novedades')
})

router.get('/modificar/:id_new', async (req, res, next) => {
  var id = req.params.id_new;
  var novedad = await novedadesModel.getNewById(id);
  res.render('admin/modificar', {
    layout: 'admin/layout',
    novedad
  })
})

router.post('/modificar', async (req, res, next) => {
  try {
    var obj = {
      title: req.body.title,
      subtitle: req.body.subtitle,
      body: req.body.body
    }
    await novedadesModel.updateNewById(obj, req.body.id);
    res.redirect('/admin/novedades');
  } catch(error) {
    res.render('admin/modificar', {
      layout: 'admin/layout',
      error: true,
      message: 'No se modifico la novedad'
    })
  }
})

module.exports = router;