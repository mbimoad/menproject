const {tblportfolio} = require('../database/db')

function truncateString(str, maxLength) {
    str = String(str);
    return str.length > maxLength
      ? str.substring(0, maxLength) + "..."
      : str;
}


function portfolioForm(data, dataoption) {
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
        <select name='kategori'>
            ${dataoption.map(item => `<option ${typeof(data) == 'undefined' ? '' : (data.kategori == item) ? 'selected' : '' } value='${item}'>${item}</option>`)}
        </select>
    </div>

    <div class="form-group">
        <label>Deskripsi</label>
        <input type="text" name="deskripsi" value="${typeof(data) == 'undefined' ? '' : data.deskripsi}">
    </div>

    <div class="form-group">
        <label>Filename</label>
        <input type="file" name="myimg">
    </div>

    <div class="form-group">
        <label>link</label>
        <input type="link" name="link" value="${typeof(data) == 'undefined' ? '' : data.link}">
    </div>
    
    ${typeof(data) == 'undefined' ? '' : '<input type="hidden" name="id" value="'+ data.id +'">'}
    `;
}


async function mypagination(query, quantity) {
    let activepage  = parseInt(query.page) || 1; 
    let datashow    = quantity; 
    const totaldata = await tblportfolio.countDocuments(); 
    const totalpage = Math.ceil(totaldata/datashow); 
    const data      = await tblportfolio.find().skip( (activepage-1) * datashow ).limit(datashow); 
    return {activepage, data, totalpage}; 
}


function DataPortfolio(data, deleteact) {
    tabel_data = ''; 
    data.forEach((item, index) => {
        tabel_data += `
        <tr>
            <td>${index+1}</td>
            <td>${item.classname}</td>
            <td>${item.judul}</td>
            <td>${item.kategori}</td>
            <td>${truncateString(item.deskripsi, 10)}</td>
            
            <td>
                <img src='/uploads/${item.myimg}' style='width:90px'>
            </td>
            <td>${truncateString(item.link, 20)}</td>
            <td>
                <a href="/portfolio/update/${item.id}">Update</a>
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
    portfolioForm,
    DataPortfolio,
    mypagination,
    truncateString
}