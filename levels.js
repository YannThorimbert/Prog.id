
function level_click(e){
    var level = e.innerHTML.split(" ")[1].trim();
    location.href='./play.html?mapn=' + level;
}
function get_user_levels_data(){
    var result = null;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "usermaps.dat", false);
    xmlhttp.send();
    if (xmlhttp.status == 200) {
        result = xmlhttp.responseText;
    }
    return result;
}
function get_n_user_levels(){
    var data = get_user_levels_data();
    var maps = data.split("\n");
    var mapstrs = []
    for(var i=0; i<maps.length; i++)
        if(maps[i].length > 8)
            mapstrs.push(maps[i]);
    return mapstrs.length;
}
var data_level;
function load_user_level(){
    if(!document.getElementById("form_ulevel")){
        var s = '<div id="form_ulevel">' +
          '<label for="level">Choisis le numéro du niveau : </label>'+
          '<select id="ulevel_choice">';
        for(var i=0; i<get_n_user_levels(); i++){
            s += '<option value="' + i.toString() + '">' + i.toString() +'</option>';
        }
        s += "</select>";
        s += '<button id="valid_uchoice" onclick="parse_user_level()">Ok</button></div>';
        document.getElementById("levelmenu").innerHTML += s;
    }
}
function parse_user_level(){
    var n = document.getElementById("ulevel_choice").value;
    n = parseInt(n);
    data_level = get_user_levels_data();
    // alert("n.toString" + n.toString());//nan
    // alert("data_level.length" + data_level.length);//802
    var maps = data_level.split("\n");
    var mapstrs = []
    for(var i=0; i<maps.length; i++)
        if(maps[i].length > 2)
            mapstrs.push(maps[i]);
    // alert("mapstrs.length" + mapstrs.length);//4
    // alert("MAPSTRS" + mapstrs);//ok...
    // alert("mapstrs[n]" + mapstrs[n]);//undefined
    location.href='./play.html?mapn=USER' + mapstrs[n];
}
