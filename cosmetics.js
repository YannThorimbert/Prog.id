

var textareas = document.getElementsByTagName('textarea');
var count = textareas.length;
for(var i=0;i<count;i++){
    textareas[i].onkeydown = function(e){
        if(e.keyCode==9 || e.which==9){
            e.preventDefault();
            var s = this.selectionStart;
            this.value = this.value.substring(0,this.selectionStart) + "    " +
                            this.value.substring(this.selectionEnd);
            this.selectionEnd = s + "    ".length;
        }
    }
}

$("textarea").keydown(function(e){
if(e.keyCode == 13){
    // assuming 'this' is textarea
    var cursorPos = this.selectionStart;
    var curentLine = this.value.substr(0, this.selectionStart).split("\n").pop();
    var indent = curentLine.match(/^\s*/)[0];
    var value = this.value;
    var textBefore = value.substring(0,  cursorPos );
    var textAfter  = value.substring( cursorPos, value.length );
    e.preventDefault(); // avoid creating a new line since we do it ourself
    this.value = textBefore + "\n" + indent + textAfter;
    setCaretPosition(this, cursorPos + indent.length + 1); // +1 is for the \n
    /////////////////////////////////////////////////
    var code = document.getElementById("code_pan").value.split("\n");
    rebuild_line_numbers(code.length);
    this.style.height = "5px";
    this.style.height = (this.scrollHeight)+"px";
}
else if(e.keyCode == 8)
    var code = document.getElementById("code_pan").value.split("\n");
    if(code != undefined)
        rebuild_line_numbers(code.length);
    this.style.height = "5px";
    this.style.height = (this.scrollHeight)+"px";
});


function setCaretPosition(ctrl, pos)
{
    if(ctrl.setSelectionRange)
    {
        ctrl.focus();
        ctrl.setSelectionRange(pos,pos);
    }
    else if (ctrl.createTextRange) {
        var range = ctrl.createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
    }
}




var current_example_hover = "";
function mouseOver(e){
    if(e != current_example_hover){
        current_example_hover = e
        var event = window.event;
        var divMouse = document.getElementById('divMouse');
        divMouse.style.left = event.clientX - 300 + "px";
        divMouse.style.top = event.clientY + 5 + "px";
        divMouse.style.display = 'block';
        divMouse.innerHTML = EXAMPLES_TXT[e.id];
    }
}

function mouseOut(){
    current_example_hover = "";
    document.getElementById('divMouse').style.display = "none";
}

document.onmousemove = handleMouseMove;
function handleMouseMove(event) {
    if(current_example_hover != ""){
        event = event || window.event; // IE-ism
        var divMouse = document.getElementById('divMouse');
        divMouse.style.left = event.clientX - 300 + "px";
        divMouse.style.top = event.clientY + 5 + "px";
    }
}

function show_message(text, type_){
    var e = document.createElement("div");
    e.className = "centered "+type_;
    e.innerHTML += "<div class='msg_title'>" + TITLES[type_] + "</div>";
    e.innerHTML += "<div class='msg_txt'>" + text + "</div>"
    e.innerHTML += "<button class='valid_msg' onclick='quit_msg(this)'> Ok </button>";
    document.body.appendChild(e);
}

function show_error(err, line, n){
    console.log(line,n);
    show_message(err + "<br><br>" + LINE_STR + " " + n.toString() +
                    ': " ' + line + ' "', "error");
}

function quit_msg(e){
    console.log(e.innerHTML);
    e.parentElement.parentElement.removeChild(e.parentElement);
    document.getElementById("code_pan").focus();
}

if(hint)
    show_message(hint, "hint");


function ask_next_level(text){
    var e = document.createElement("div");
    e.className = "centered hint";
    e.innerHTML += "<div class='msg_title'>" + GAME_WON + "</div>";
    e.innerHTML += "<div class='msg_txt'>" + TXT_NEXT_LEVEL + "</div>"
    e.innerHTML += "<button class='valid_msg' onclick='next_level()'>" + YES + " </button>";
    e.innerHTML += "<button class='valid_msg' onclick='quit_msg(this)'>" + NO + " </button>";
    document.body.appendChild(e);
}
