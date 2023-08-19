const router = require('express').Router(); 
const {tblskill} = require('../database/db');
const {skillForm, DataSkill, mypagination} = require('./skill.controller');

router.get('/', async (req,res) => {
    const context = {
        title: 'Skill', 
        layout: 'templates/based.ejs', 
        data: await tblskill.find({}),
    }
    res.render('skill', context); 
});


router.get('/data', async (req,res) => {
    // Get Column Name of database 
    const kolom = Object.keys(tblskill.schema.paths)
    kolom.pop()
    kolom.pop()
    var {activepage, data, totalpage} = await mypagination(req.query, 2);
    var data = DataSkill(data, '/skill/delete?_method=DELETE'); 
    const context = {
        title: 'Skill table', 
        layout: 'templates/based.ejs', 
        tambah: '/skill/tambah',
        message: req.flash('message'),
        data: data, 
        kolom: kolom, 
        total: totalpage,
        aktif: activepage,
        pagelink: '/skill/data?page=',
    }
    res.render('tabel', context); 
});

router.get('/tambah', (req,res) => {
    const context = {
        title: 'Manage Skill', 
        layout: 'templates/based.ejs', 
        method: 'POST', 
        action: '/skill/tambah',
        kembali: '/skill/data',
        element: skillForm(), 
    }
    res.render('forms', context);   
});

router.get('/update/:id', async (req, res) => {
    data = await tblskill.findOne({_id: req.params.id}); 
    const context = {
        title: 'Manage Skill', 
        layout: 'templates/based.ejs', 
        method: 'POST', 
        action: '/skill/update?_method=PUT',
        kembali: '/skill/data',
        element: skillForm(data),        
    }
    res.render('forms', context);   
})

// Add 
router.post('/tambah', (req,res) => {
    tblskill.insertMany(req.body, (error, result) => {
        req.flash('message', 'Adding SkilL Data Success'); 
        res.redirect('/skill/data');
    })
}) 

// Delete 
router.delete('/delete', async (req, res) => {
    const data = await tblskill.findOne({_id: req.body.id}); 
    if(data)  {
        tblskill.deleteOne({_id: req.body.id}).then(result => {
            req.flash('message', 'Data Skill Terhapus'); 
            res.redirect('/skill/data')
        })
    }
})

router.put('/update', async (req, res) => {

    tblskill.updateOne({_id: req.body.id}, {
        $set: {
            classname: req.body.classname, 
            judul: req.body.judul, 
            deskripsi: req.body.deskripsi
        }
    }).then(result => {
        req.flash('message', 'Update Data Success'); 
        res.redirect('/skill/data');
    })
})

module.exports = router; 