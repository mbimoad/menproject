const layouts = require('express-ejs-layouts') //
const express = require('express'); 
const app     = express(); 
const port    = process.env.PORT || 3000; 
const morgan  = require('morgan'); 
const session = require('express-session');
const parsers = require('cookie-parser'); 
const flash   = require('connect-flash'); 
const validator = require('validator'); 
const fs = require('fs'); 
const multer  = require('multer'); 
const methods = require('method-override'); 
const {body,validationResult,check,cookie} = require('express-validator');
const skillroute = require('./app/routes/skill.route'); 
const portfolioroute = require('./app/routes/portfolio.route'); 
const experienceroute = require('./app/routes/experience.route'); 
const authroute = require('./app/routes/auth.route'); 
const adminroute = require('./app/routes/admin.route'); 
app.set('view engine', 'ejs'); 
app.use(layouts); 
app.use(express.static('assets'));
app.use(morgan('dev')); 
app.use(express.urlencoded({extended:true}));
app.use(methods('_method'));
// Setup Flash message 
app.use(flash()); 
app.use(parsers('secret')); 
app.use(session({
    cookie: {maxAge: 6000}, 
    secret: 'secret', 
    resave: true, 
    saveUninitialized: true, 
}))
const storage = multer.diskStorage({
    destination: function(req, file, cb) {cb(null, './assets/uploads/');},
    filename:    function(req, file, cb) {cb(null, `${Date.now()}-${file.originalname}`);}
})
const upload = multer({storage})

app.get('/', (req, res) => {
    const context = {
        title: 'Home', 
        layout: 'templates/based.ejs', 
    }
    res.render('index', context); 
})
// Skill
app.use('/skill', skillroute)
app.use('/portfolio', portfolioroute)
app.use('/experience', experienceroute)
app.use('/login', authroute)
app.use('/admin', adminroute)

app.listen(port, () => console.log(`Suara ada di Port ${port}`));
