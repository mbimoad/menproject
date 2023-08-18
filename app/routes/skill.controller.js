const {tblskill} = require('../database/db')

function skillForm(data) {
    return `
    <div class="form-group">
        <label>Icon Class</label>
        <input type="text" name="classname" value="${typeof(data) == 'undefined' ? '' : data.classname}">
    </div>

    <div class="form-group">
        <label>Judul</label>
        <input type="text" name="judul" value="${typeof(data) == 'undefined' ? '' : data.judul}">
    </div>

    <div class="form-group">
        <label>Deskripsi</label>
        <input type="text" name="deskripsi" value="${typeof(data) == 'undefined' ? '' : data.deskripsi}">
    </div>
    
    ${typeof(data) == 'undefined' ? '' : '<input type="hidden" name="id" value="'+ data.id +'">'}
    `;
}


async function mypagination(query, quantity) {
    let activepage  = parseInt(query.page) || 1; 
    let datashow    = quantity; 
    const totaldata = await tblskill.countDocuments(); 
    const totalpage = Math.ceil(totaldata/datashow); 
    const data      = await tblskill.find().skip( (activepage-1) * datashow ).limit(datashow); 
    return {activepage, data, totalpage}; 
}


function DataSkill(data, deleteact) {
    tabel_data = ''; 
    data.forEach((item, index) => {
        tabel_data += `
        <tr>
            <td>${index+1}</td>
            <td>${item.classname}</td>
            <td>${item.judul}</td>
            <td>${item.deskripsi}</td>
            <td>
                <a href="/skill/update/${item.id}">Update</a>
                <form action="${deleteact}" method="POST">
                    <input type="hidden" name="id" value="${item.id}">
                    <button type="submit" class="delete">Delete</button>
                </form>
            </td>
        </tr>
        `;
    })
    return tabel_data
}

module.exports = {
    skillForm,
    DataSkill,
    mypagination
}