var express = require('express');
const async = require('hbs/lib/async');
var router = express.Router();
var usuariosModel = require('./../../modelos/usersModel')
/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('admin/login', {
    layout: 'admin/layout'
  });
});

router.get('/logout', function(req, res, next){
  req.session.destroy();
  res.redirect('/admin/login');
});

router.post('/', async(req, res, next) => {
  try{
    var usuario = req.body.usuario;
    var password = req.body.password;

    var data = await usuariosModel.getUser(usuario, password);

    if(data != undefined){
      req.session.id_user = data.id_user;
      req.session.nombre = data.user;
      res.redirect('/admin/products');
    } else {
      res.render('admin/login' , {
        layout: 'admin/layout',
        error: true
      });
    }
  }catch(error){
    console.log(error);
  }
})

module.exports = router;