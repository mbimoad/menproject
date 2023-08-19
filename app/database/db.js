require('dotenv').config();
// npm i mongoose@5.12.13 


const mongoose = require('mongoose'); 
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true,
})
.then(respon => console.log('connected'))
.catch(error => process.exit()); 

const tbluser  = mongoose.model('user', mongoose.Schema({
    vusername: {type: String, required: true},
    vpassword: {type: String, required: true},
}))

const tblskill  = mongoose.model('skill', mongoose.Schema({
    classname: {type: String, required: true},
    judul: {type: String, required: true},
    deskripsi: {type: String, required: true},
}))

const tblportfolio  = mongoose.model('portfolio', mongoose.Schema({
    classname: {type: String, required: true},
    judul: {type: String, required: true},
    kategori: {type: String, required: true},
    deskripsi: {type: String, required: true},
    myimg: {type: String, required: true},
    link: {type: String, required: true},
}))

const tblexperience  = mongoose.model('experience', mongoose.Schema({
    datestart: {type: Date, required: true},
    datefinish: {type: Date, required: true},
    is_present: {type: String, required: true},
    judul: {type: String, required: true},
    posisi: {type: String, required: true},
    deskripsi: {type: String, required: true},
}))

module.exports = {
    tbluser,
    tblskill,
    tblportfolio,
    tblexperience,
};

