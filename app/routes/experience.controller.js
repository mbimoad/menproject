const {tblexperience} = require('../database/db')

function experienceForm(data) {
    return `
    <div class="form-group">
        <label>Mulai Bekerja</label>
        <input type="date" name="datestart" value="${typeof(data) == 'undefined' ? '' : new Date(data.datestart).getFullYear() + '-' + (new Date(data.datestart).getUTCMonth() < 10 ? '0' + new Date(data.datestart).getUTCMonth() : new Date(data.datestart).getUTCMonth()) + '-' + (new Date(data.datestart).getDate() < 10 ? '0' + new Date(data.datestart).getDate() : new Date(data.datestart).getDate()) }">
    </div>

    <div class="form-group">
        <label>Selesai Bekerja</label>
        <input type="date" name="datefinish" value="${typeof(data) == 'undefined' ? '' : new Date(data.datefinish).getFullYear() + '-' + (new Date(data.datefinish).getUTCMonth() < 10 ? '0' + new Date(data.datefinish).getUTCMonth() : new Date(data.datefinish).getUTCMonth()) + '-' + (new Date(data.datefinish).getDate() < 10 ? '0' + new Date(data.datefinish).getDate() : new Date(data.datefinish).getDate()) }">
    </div>

    <div class="form-group">
        <label>Present</label>
        <input type="checkbox" name="is_present" ${typeof(data) == 'undefined' ? '' : (data.is_present == 'on') ? 'checked' : '' }>
    </div>

    <div class="form-group">
        <label>Judul</label>
        <input type="text" name="judul" value="${typeof(data) == 'undefined' ? '' : data.judul}">
    </div>

    <div class="form-group">
        <label>Posisi</label>
        <input type="text" name="posisi" value="${typeof(data) == 'undefined' ? '' : data.posisi}">
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
    const totaldata = await tblexperience.countDocuments(); 
    const totalpage = Math.ceil(totaldata/datashow); 
    const data      = await tblexperience.find().skip( (activepage-1) * datashow ).limit(datashow); 
    return {activepage, data, totalpage}; 
}


function DataExperience(data, deleteact) {
    tabel_data = ''; 
    data.forEach((item, index) => {
        tabel_data += `
        <tr>
            <td>${index+1}</td>
            <td>${new Date(item.datestart).toLocaleString('default', { month: 'long' })} - ${new Date(item.datestart).getFullYear()}</td>
            <td>${new Date(item.datefinish).toLocaleString('default', { month: 'long' })} - ${new Date(item.datestart).getFullYear()}</td>
            <td>${item.is_present}</td>
            <td>${item.judul}</td>
            <td>${item.posisi}</td>
            <td>${item.deskripsi}</td>
            <td>
                <a href="/experience/update/${item.id}">Update</a>
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
    experienceForm,
    DataExperience,
    mypagination
}