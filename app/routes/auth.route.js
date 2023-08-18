const router = require('express').Router(); 
const {
    body, validationResult
} = require('express-validator');
const {
    tbluser
} = require('../database/db');
router.get('/', (req,res) => {
    const context = {
        title: 'login', 
        layout: 'templates/based.ejs', 
    }
    res.render('login', context); 
});


router.post('/auth', [
    body('vusername').isEmail(),
], async (req,res) => {
    data = await tbluser.findOne({vusername: req.body.vusername}); 
    if(req.body.vpassword === data.vpassword) {
        res.cookie('login', 'mbimoad', {maxAge: 1000 })
        res.redirect('/admin');
    } else {
        const context = {
            title: 'login', 
            layout: 'templates/based.ejs', 
            error: 'Username/Password Invalid'
        }
        res.render('login', context); 
    }
})

module.exports = router; 