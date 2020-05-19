document.getElementById("run_button").innerHTML = RUN;
document.getElementById("restart_button").innerHTML = RESTART;

document.getElementById("button_project").innerHTML = PROJECT;
document.getElementById("button_level").innerHTML = CHOOSE_LEVEL;
document.getElementById("button_tuto").innerHTML = EXAMPLES;
document.getElementById("button_creation").innerHTML = CREATION;

var d = document.createElement("div");
d.className = "code_and_help";
document.body.appendChild(d);


var t = document.createElement("div");
t.className = "title_help";
t.id = "title_code";
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
    var e = document.createElement("textarea");
    e.placeholder = PLACEHOLDER;
    if(initial_code.length > 0){
        var t = document.createTextNode(initial_code);
        t.id = "actual_code";
        e.appendChild(t);
    }
}
e.id = "code_pan";
e.focus();
surdiv.appendChild(e);

document.getElementById("lines_number").style.fontSize = document.getElementById("code_pan").style.fontSize;
document.getElementById("lines_number").style.fontFamily = document.getElementById("code_pan").style.fontFamily;

e = document.createElement("div");
e.innerHTML = "<button id='correction' onclick='show_correction()'>" + CORRECTION + "</div>";
e.style.display = "flex";
surdiv.appendChild(e);

var d = document.createElement("div");
d.className = "code_and_help";
document.body.appendChild(d);

var t = document.createElement("div");
t.className = "title_help";
t.id = "title_help";
if(MODE=="code")
    t.innerHTML = HELP_CODE;
else {
    t.innerHTML = HELP_BLOCKS;
}
d.appendChild(t);
// document.body.appendChild(t);

//create help area
var h = document.createElement("div");
h.id = "help_pan";
var buttons = [["move_button","click_move();", MOVE],
                ["turn_button","click_turn();", TURN],
                ["repeat_button","click_repeat();", REPEAT],
                ["ifwall_button","click_ifwall();", IF_WALL],
                ["ifcoin_button","click_ifcoin();", IF_COIN]
                ];
var DESCR_MOVE = "Exemple pour avancer de 3 cases";
var DESCR_TURN = "Exemple pour tourner de 90 degrés dans le sens horaire";
var DESCR_TURN_RANDOM = "Pour choisir une direction au hasard";
var DESCR_IFWALL = "Exemple pour réagir face au magma";
var DESCR_IFCOIN = "Exemple pour réagir avant une pièce";
var DESCR_REPEAT = "Exemple pour répéter 4 fois des ordres";
var DESCR_REPEAT_FOREVER = "Pour répéter sans cesse";
var EXAMPLES_TXT = {"move_button":'<div class="example_title">' +
                                    DESCR_MOVE + "</div>" + MOVE.replace(":"," :")+" 3",
                    "turn_button":'<div class="example_title">' +
                                    DESCR_TURN + "</div>" + TURN.replace(":"," :")+" 90" +

                                    '<div class="example_title">' +
                                    DESCR_TURN_RANDOM + "</div>" + TURN.replace(":"," :") +
                                        " " + RANDOM,
                    "ifwall_button":'<div class="example_title">' +
                                    DESCR_IFWALL + "</div>" + IF_WALL +
                                    "<br>{<br>" + tabs4 + "...<br>}",
                    "ifcoin_button":'<div class="example_title">' +
                                    DESCR_IFCOIN + "</div>" + IF_COIN +
                                    "<br>{<br>" + tabs4 + "...<br>}",
                    "repeat_button":'<div class="example_title">' +
                                    DESCR_REPEAT + "</div>" + REPEAT.replace(":"," :") + " 4" +
                                    "<br>{<br>" + tabs4 + "...<br>}"+

                                    '<div class="example_title">' +
                                    DESCR_REPEAT_FOREVER + "</div>" +
                                        REPEAT.replace(":"," :") + " " + FOREVER// +
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
