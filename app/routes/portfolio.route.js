const router = require('express').Router(); 
const multer  = require('multer'); 
const fs = require('fs');
const {
    tblportfolio,
    tblskill
} = require('../database/db');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {cb(null, './assets/uploads/');},
    filename:    function(req, file, cb) {cb(null, `${Date.now()}-${file.originalname}`);}
})
const upload = multer({storage})
const {
    mypagination,
    DataPortfolio,
    portfolioForm,
    truncateString
} = require('./portfolio.controller')
router.get('/', async (req,res) => {
    const context = {
        title: 'Portfolio', 
        layout: 'templates/based.ejs', 
        kategori: await tblportfolio.distinct('kategori'),
        data: await tblportfolio.find({}),
        truncatechars: truncateString,
    }
    res.render('Portfolio', context); 
});

router.get('/fetch/:kategori', async (req, res) => {
    kategori = req.params.kategori; 
    data = await tblportfolio.find({kategori: kategori})
    res.json(data);
})


router.get('/data', async (req,res) => {
    // Get Column Name of database 
    const kolom = Object.keys(tblportfolio.schema.paths)
    kolom.pop()
    kolom.pop()
    var {activepage, data, totalpage} = await mypagination(req.query, 2);
    var data = DataPortfolio(data, '/portfolio/delete?_method=DELETE'); 
    const context = {
        title: 'portfolio table', 
        layout: 'templates/based.ejs', 
        tambah: '/portfolio/tambah',
        message: req.flash('message'),
        data: data, 
        kolom: kolom, 
        total: totalpage,
        aktif: activepage,
        pagelink: '/portfolio/data?page=',
    }
    res.render('tabel', context); 
});



router.get('/tambah', async (req,res) => {
    const dataoption = await tblskill.distinct('judul');
    const context = {
        title: 'Manage portfolio', 
        layout: 'templates/based.ejs', 
        method: 'POST', 
        action: '/portfolio/tambah',
        kembali: '/portfolio/data',
        element: portfolioForm(undefined, dataoption), 
        is_meta: 'enctype="multipart/form-data"',
    }
    res.render('forms', context);   
});


// Add 
router.post('/tambah', upload.single('myimg'), function(req, res) {
    if(!req.file) {
        var data = {...req.body, myimg: 'NONE'};     
    } else {
        var data = {...req.body, myimg: req.file.filename}
    }
    tblportfolio.insertMany(data, (error, result) => {
        req.flash('message', 'Adding Portfolio Data Success'); 
        res.redirect('/portfolio/data');
    })
}) 


router.delete('/delete', async (req, res) => {
    const data = await tblportfolio.findOne({_id: req.body.id}); 
    if(data.myimg != 'NONE') fs.unlinkSync(`./assets/uploads/${data.myimg}`); 
    tblportfolio.deleteOne({_id: req.body.id}).then(result => {
        req.flash('message', 'Data Portfolio Terhapus'); 
        res.redirect('/portfolio/data')
    })
})


router.get('/update/:id', async (req, res) => {
    data = await tblportfolio.findOne({_id: req.params.id}); 
    const dataoption = await tblskill.distinct('judul');
    const context = {
        title: 'Manage portfolio', 
        layout: 'templates/based.ejs', 
        method: 'POST', 
        action: '/portfolio/update?_method=PUT',
        kembali: '/portfolio/data',
        element: portfolioForm(data, dataoption),        
        is_meta: 'enctype="multipart/form-data"',
    }
    res.render('forms', context);   
})

router.put('/update', upload.single('myimg'),  async (req, res) => {

    if(!req.file) {       
        data = await tblportfolio.findOne({_id: req.body.id})
        data = {...req.body, myimg: data.myimg}

    } else {
        data = await tblportfolio.findOne({_id: req.body.id})
        data = data.myimg;         
        if(data != 'NONE') fs.unlinkSync(`./assets/uploads/${data}`);
        data = {...req.body, myimg: req.file.filename}
    }

    tblportfolio.updateOne({_id: req.body.id}, {
        $set: {
            classname: data.classname, 
            judul: data.judul, 
            kategori: data.kategori, 
            deskripsi: data.deskripsi,
            myimg: data.myimg,
            link: data.link,
        }
    }).then(result => {
        req.flash('message', 'Update Data Success'); 
        res.redirect('/portfolio/data');
    })
})


module.exports = router; 