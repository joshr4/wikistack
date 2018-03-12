const express = require('express');
const router = express.Router();
const wikiRouter = require('./wiki');
const userRouter = require('./user');



//app.use('/', (req, res, next) => {console.log("hi"); next();})
router.get('/', (req, res, next) => {res.render('index');})

router.use('/wiki/', wikiRouter)
router.use('/user/', userRouter)





//router.use(express.static('public'))



// router.get('/stylesheets/', (req, res, next) => {
//     res.sendFile('public/stylesheets/style.css');
// })

module.exports = router;