const router = require('express').Router(); 
const {tblexperience} = require('../database/db');
const {
    DataExperience,
    mypagination,
    experienceForm,
} = require('./experience.controller');

router.get('/', async (req,res) => {
    const context = {
        title: 'Experience', 
        layout: 'templates/based.ejs', 
        data: await tblexperience.find({}), 
    }
    res.render('experience', context); 
});
router.get('/data', async (req,res) => {
    // Get Column Name of database 
    const kolom = Object.keys(tblexperience.schema.paths)
    kolom.pop()
    kolom.pop()
    var {activepage, data, totalpage} = await mypagination(req.query, 2);
    var data = DataExperience(data, '/experience/delete?_method=DELETE'); 
    const context = {
        title: 'Skill table', 
        layout: 'templates/based.ejs', 
        tambah: '/experience/tambah',
        message: req.flash('message'),
        data: data, 
        kolom: kolom, 
        total: totalpage,
        aktif: activepage,
        pagelink: '/experience/data?page=',
    }
    res.render('tabel', context); 
});


router.get('/tambah', (req,res) => {
    const context = {
        title: 'Manage experience', 
        layout: 'templates/based.ejs', 
        method: 'POST', 
        action: '/experience/tambah',
        kembali: '/experience/data',
        element: experienceForm(), 
    }
    res.render('forms', context);   
});

router.get('/update/:id', async (req, res) => {
    data = await tblexperience.findOne({_id: req.params.id}); 
    const context = {
        title: 'Manage Experience', 
        layout: 'templates/based.ejs', 
        method: 'POST', 
        action: '/experience/update?_method=PUT',
        kembali: '/experience/data',
        element: experienceForm(data),        
    }
    res.render('forms', context);   
})

router.post('/tambah', (req,res) => {
    if(!req.body.is_present)  {
        req.body.is_present = 'off';
    }
    tblexperience.insertMany(req.body, (error, result) => {
        req.flash('message', 'Adding Experience Data Success'); 
        res.redirect('/experience/data');
    })
}) 


// Delete 
router.delete('/delete', async (req, res) => {
    const data = await tblexperience.findOne({_id: req.body.id}); 
    if(data)  {
        tblexperience.deleteOne({_id: req.body.id}).then(result => {
            req.flash('message', 'Data Experience Terhapus'); 
            res.redirect('/experience/data')
        })
    }
})

router.put('/update', async (req, res) => {
    tblexperience.updateOne({_id: req.body.id}, {
        $set: {
            datestart: req.body.datestart,
            datefinish: req.body.datefinish,
            is_present: req.body.is_present,
            judul: req.body.judul,
            posisi: req.body.posisi,
            deskripsi: req.body.deskripsi,
        }
    }).then(result => {
        req.flash('message', 'Update Data Success'); 
        res.redirect('/experience/data');
    })
})


module.exports = router; 