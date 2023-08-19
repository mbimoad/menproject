const router = require('express').Router(); 
const {
    tblportfolio
} = require('../database/db');
router.get('/', (req,res) => {
    const context = {
        title: 'login', 
        layout: 'templates/based.ejs', 
    }
    res.render('dashboard', context); 
});

router.get('/fetch', async (req, res) => {    
    const contoh = await tblportfolio.aggregate([{
          $group: {
            _id: '$kategori',
            count: { $sum: 1 }
          }
    }])
    res.json(contoh);
})


module.exports = router; 