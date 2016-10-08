/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function zgfm_format_date(date){
    var date1 = new Date(date);
    var tmp_result = date1.getDate()+'/'+(date1.getMonth()+1)+'/'+date1.getFullYear();
    return tmp_result;
}

