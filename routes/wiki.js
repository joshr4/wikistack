const express = require('express');
const router = express.Router();
const models = require('../models/')
const Page = models.Page;
const User = models.User;






router.get('/', (req, res, next) => {
    
    res.redirect('/');

});

router.post('/', (req, res, next) => {
    
    const page = Page.build({

        title: req.body.title,
        urlTitle: req.body.title,
        content: req.body.content,
        status: req.body.status,
    });

    const user = User.build({
        name: req.body.name,
        email: req.body.email
    });

    // page.save()
    // .then(() => {
    //     return user.save();
    // })
    // .then(() => {
    //     res.redirect('/wiki/' + page.urlTitle);
    // }).catch((err) => {
    //     console.error(err);
    // })
    
    user.save()
    .then(() => {
        return page.save()
    })
    .then(savedpage => {
        console.log(savedpage.route);
        res.redirect(savedpage.route);
    }).catch((err) => {
        console.error(err);
    })

});


router.get('/add', (req, res, next) => {
    
    res.render('addpage');

});

router.get('/:pageUrl', (req, res, next) => {

    Page.findOne({
        where: {
            urlTitle: req.params.pageUrl
        }
    })
    .then((resultPage)=>{
        
        res.render('wikipage', {
            resultPage
        })
    }) 
    .catch(err=>console.error(err));
    
});

module.exports = router;
