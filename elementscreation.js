document.getElementById("run_button").innerHTML = RUN;
document.getElementById("pause_button").innerHTML = PAUSE;

var d = document.createElement("div");
d.className = "code_and_help";
document.body.appendChild(d);


var t = document.createElement("div");
t.className = "title_help";
t.innerHTML = TITLE_CODE;
d.appendChild(t)


surdiv = document.createElement("div");
surdiv.className = "surdiv";
d.appendChild(surdiv);


n = document.createElement("div");
n.id = "lines_number";

function rebuild_line_numbers(length){
    var n = document.getElementById("lines_number");
    n.innerHTML = "";
    for(var i=1; i<=length; i++)
        n.innerHTML += i.toString() + "<br>";
}

surdiv.appendChild(n);
rebuild_line_numbers(initial_code.split("\n").length);


//Create textarea or blocks area
if(MODE == "blocks"){
    var e = document.createElement("div");
    e.onclick = function (){refresh_current_pan();};
}
else if(MODE == "code"){
    // var initial_code = "Répéter:toujours\n{\n    Si mur\n    {\n        Tourner:90\n    }\n    Avancer:1\n}"
    // var initial_code="";
    var e = document.createElement("textarea");
    e.placeholder = PLACEHOLDER;
    if(initial_code.length > 0){
        var t = document.createTextNode(initial_code);
        e.appendChild(t);
    }
}
e.id = "code_pan";
e.focus();
surdiv.appendChild(e);

var d = document.createElement("div");
d.className = "code_and_help";
document.body.appendChild(d);

var t = document.createElement("div");
t.className = "title_help";
if(MODE=="code")
    t.innerHTML = HELP_CODE;
else {
    t.innerHTML = HELP_BLOCKS;
}
d.appendChild(t);

//create help area
var h = document.createElement("div");
h.id = "help_pan";
var buttons = [["move_button","click_move();", MOVE],
                ["turn_button","click_turn();", TURN],
                ["ifwall_button","click_ifwall();", IF_WALL],
                ["repeat_button","click_repeat();", REPEAT]];
var DESCR_MOVE = "Exemple pour avancer de 3 cases";
var DESCR_TURN = "Exemple pour tourner de 90 degrés";
var DESCR_IFWALL = "Exemple pour réagir face à un mur";
var DESCR_REPEAT = "Exemple pour répéter 4 fois des ordres";
var DESCR_REPEAT_FOREVER = "Pour répéter sans cesse";
var EXAMPLES_TXT = {"move_button":'<div class="example_title">' +
                                    DESCR_MOVE + "</div>" + MOVE.replace(":"," :")+" 3",
                    "turn_button":'<div class="example_title">' +
                                    DESCR_TURN + "</div>" + TURN.replace(":"," :")+" 90",
                    "ifwall_button":'<div class="example_title">' +
                                    DESCR_IFWALL + "</div>" + IF_WALL +
                                    "<br>{<br>" + tabs4 + "...<br>}",
                    "repeat_button":'<div class="example_title">' +
                                    DESCR_REPEAT + "</div>" + REPEAT.replace(":"," :") + " 4" +
                                    "<br>{<br>" + tabs4 + "...<br>}"+

                                    '<div class="example_title">' +
                                    DESCR_REPEAT_FOREVER + "</div>" + REPEAT.replace(":"," :") + " toujours"// +
                                    // "<br>{<br>" + tabs4 + "...<br>}"
                    };
function attribute_help(item, index) {
    var b = document.createElement("button");
    b.className = "help_button";
    b.id = item[0];
    var txt = item[2].replace(":","");
    if(MODE=="blocks")
    {
        b.onclick = function(){eval(item[1]);}
    }
    else{
        // b.style.pointerEvents = "none";
        var example = document.createElement("div");
        b.setAttribute("onmouseover", "mouseOver(this)");
        b.setAttribute("onmouseout", "mouseOut()");
        b.appendChild(example);
    }
    b.innerHTML = txt;
    h.appendChild(b);
}
buttons.forEach(attribute_help);
d.appendChild(h);
//
// t = document.getElementById("topmenu");
// t.appendChild()
