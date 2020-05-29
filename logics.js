function replaceInStr(s, index, replacement) {
    return s.substr(0, index) +
            replacement +
            s.substr(index + replacement.length);
}

function get_cell(){
    return pix_to_cell(img_obj.x+CELL_SIZE/2, img_obj.y+CELL_SIZE/2)
}

function pix_to_cell(x,y){
    var cx = parseInt(x/CELL_SIZE);
    var cy = parseInt(y/CELL_SIZE);
    return [cx,cy];
}

function orientation_from_vel(){
    if(img_obj.vx > 0)
        return 'right';
    else if(img_obj.vx < 0)
        return 'left';
    else if(img_obj.vy > 0)
        return 'down';
    else if(img_obj.vy < 0)
        return 'up';
    else
        console.log("Invalid velocity");
}

function set_char_orientation(what){ //bouton stop ; else ; monnaie ; explications
    img_obj.total_frames = nframes[what];
    img_obj.current = 0;
    img_obj.source = img;
    img_obj.source = img;  // we set the image source for our object.
    img.src = './char1_' + what + '.png';
    img_obj.vx = vel[what][0];
    img_obj.vy = vel[what][1];
}

function process_user_code(){
    if(frame < INTERVAL/10){
        img_obj.velocity = 0;
        return false;
    }
    if(!goal_achieved){
        return false;
    }
    else{
        var level = instructions_repeat.length - 1; //index of current code
        var current_code = instructions_repeat[level].slice();
        icode_repeat[level] += 1;
        // console.log("level=",level, "i=", icode_repeat[level]);
        if(icode_repeat[level] >= current_code.length){
            // console.log("============>");
            if(level == 0){ //end of program
                img_obj.velocity = 0;
                img_obj.current = 0
                // console.log("END OF PROGRAM");
                // console.log(img_obj.x);
                gameover = true;
                end_of_code = true;
                return false;
            }
            else{
                n_repeat[level] -= 1;
                if(n_repeat[level] == 0){ //end of loop
                    n_repeat.pop();
                    instructions_repeat.pop();
                    icode_repeat.pop();
                    // console.log("END OF LOOP");
                    return false;
                }
                else{
                    icode_repeat[level] = 0; //repeat the loop from zero
                }
            }
        }
    }
    var codeline = current_code[icode_repeat[level]];
    ////////////////////////////////////////////////////////////////////////
    if(codeline[0].includes(MOVE)){
        set_char_goal_pos(codeline[1]);
    }
    else if(codeline[0].includes(TURN)){
        if(codeline[1] == RANDOM)
            turn_char_random_valid();
        else
            turn_char(parseInt(codeline[1]));
    }
    else{
        if(codeline[0].includes(REPEAT)){
            var n = codeline[1];
            var instructions = codeline[2];
            // console.log("LOG REPEAT", instructions.slice());
            n_repeat.push(n);
            instructions_repeat.push(instructions);
            icode_repeat.push(-1);
        }
        else{
            var instructions;
            var if_true = false;
            ///////////////////////////////////////////////////////////////////
            if(codeline[0] == ELSE){
                if(codeline[1] == WALL)
                    if_true = !next_is_wall();
                else if(codeline[1] == COIN)
                    if_true = !next_is_coin();
                instructions = codeline[2];
            }
            else if(codeline[0] == IF_WALL || codeline[0] == IF_COIN){
                if(codeline[0] == IF_WALL)
                    if_true = next_is_wall();
                else if(codeline[0] == IF_COIN)
                    if_true = next_is_coin();
                instructions = codeline[1];
            }
            if(if_true){
                n_repeat.push(1); //an "if" is just a loop that one takes once
                instructions_repeat.push(instructions);
                icode_repeat.push(-1);
            }
        }
        return true;
    }
    return false;
}

function next_is_wall(){
    var coord = get_cell();
    coord[0] += img_obj.vx;
    coord[1] += img_obj.vy;
    if(is_wall(coord)){ //topleft
        return true;
    }
    return false;
}


function set_char_goal_pos(argument){
    img_obj.velocity = VELOCITY;
    goal_x = img_obj.x + img_obj.vx * argument * CELL_SIZE;
    goal_y = img_obj.y + img_obj.vy * argument * CELL_SIZE;
    var future_pos = pix_to_cell(goal_x+CELL_SIZE/2, goal_y+CELL_SIZE/2);
    goal_achieved = false;
}

function turn_char(argument){
    //assert argument is a multiple of 90
    var quarters = argument / 90;
    var old_orientation = orientation_from_vel();
    var current_idx = orientation_seq.indexOf(old_orientation);
    var new_idx = (current_idx + quarters) % orientation_seq.length;
    var new_orientation = orientation_seq[new_idx];
    set_char_orientation(new_orientation);
    img_obj.velocity = 0;
    goal_achieved = true;
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function turn_char_random_valid(){
    var directions = shuffle(["left","right","up","down"]);
    for(var i=0; i<directions.length; i++){
        var direction = directions[i];
        var coord = get_cell();
        coord[0] += vel[direction][0];
        coord[1] += vel[direction][1];
        if(!is_wall(coord)){ //topleft
            set_char_orientation(direction);
            img_obj.velocity = 0;
            goal_achieved = true;
        }
    }
}

function check_conditions(){
    if(char_touch_coin()){
        remove_coin(get_cell());
        if(coins_took == n_coins_initial){
            gameover = true;
        }
    }
    if(goal_x == img_obj.x && goal_y == img_obj.y){
        // console.log("Goal position ok");
        goal_achieved = true;
        img_obj.velocity = 0;
    }
    else if(char_touch_wall()){
        console.log("Game over touch wall", get_cell());
        img_obj.velocity = 0
        gameover = true;
    }

}

function predraw(){
    context.clearRect(0, 0, canvas.width, canvas.height);  // clear canvas
    if(DISPLAY_MAGMA){
        draw_floor(); //static
    }
    else{
        draw_grid();
        draw_walls();
    }
}

function draw_anim() { // context is the canvas 2d context.
    if(DISPLAY_MAGMA){
        draw_magma(); //non-static
        if(DEBUG){
            draw_floor(); //static
        }
        else
            context.drawImage(grid_img, 0, 0);
    }
    else{
        context.clearRect(0, 0, canvas.width, canvas.height);  // clear canvas
        if(DEBUG)
            draw_grid();
        else
            context.drawImage(grid_img, 0, 0);
        draw_walls();
    }
    if(show_path)
        draw_path();
    draw_gold();
    /////////////////////////
    var flag_below = img_obj.y < flag_coord[1]*CELL_SIZE;
    if(!flag_below)
        draw_flag();
    context.drawImage(img_obj.source, img_obj.current * img_obj.width, 0,
                          img_obj.width, img_obj.height,
                          img_obj.x, img_obj.y, img_obj.width, img_obj.height);
    if(flag_below)
        draw_flag();
}

var path;
function update_char_pos(){
    if(img_obj.velocity == 0){
        img_obj.current = 0;
    }
    else{
        if(frame%2==0)
            img_obj.current = (img_obj.current + 1) % img_obj.total_frames;
        img_obj.x += img_obj.vx * img_obj.velocity;
        img_obj.y += img_obj.vy * img_obj.velocity;
    }
    const coord = get_cell();
    path[coord[0]][coord[1]] = true;
}

function draw_path(){
    context.fillStyle = "rgba(0,0,255,0.2)";
    for (var x=0; x<nx; x++){
        for (var y=0; y<ny; y++){
            if(path[x][y]){
                context.fillRect(x*CELL_SIZE, y*CELL_SIZE,
                                   CELL_SIZE, CELL_SIZE);
            }
        }
    }
    // for (var i=0; i<path.length; i++){
    //      var coord = path[i];
    //      context.fillStyle = "rgba(0,0,255,0.1)";
    //      context.fillRect(coord[0]*CELL_SIZE, coord[1]*CELL_SIZE,
    //                         CELL_SIZE, CELL_SIZE);
    //  }
}

function draw_flag(){
    context.drawImage(flag, flag_frame * 32, 0,
                      32, 32,
                      (0.5+flag_coord[0])*CELL_SIZE,
                      (-0.5+flag_coord[1])*CELL_SIZE, 32, 32);
    if(frame%5==0)
        flag_frame = (flag_frame+1)%3;
}

function draw_gold(){
     for (var i=0; i < coins.length; i++){
        var infos = coins[i];
        var current = infos[2];
        context.drawImage(gold, current * 32, 0,
                          32, 32,
                          infos[0]*CELL_SIZE, infos[1]*CELL_SIZE, 32, 32);
        if(frame%5 == 0){
            current = (current+1)%2;
            coins[i][2] = current;
        }
    }
}

function draw_floor(){
    for(var x=0; x<nx; x++)
        for(var y=0; y<ny; y++)
            if(!is_wall([x,y])){
                var pix = [x*CELL_SIZE, y*CELL_SIZE];
                context.drawImage(wall_v, pix[0], pix[1]);
                var i_bottom = nx * (y+1) + x;
                var below_is_wall = "whv".includes(mapstr[i_bottom]) && y < ny-1;
                if(below_is_wall)
                    context.drawImage( wall_h,
                                        0, 2*CELL_SIZE/3,
                                        32, 32,
                                        pix[0], pix[1]+CELL_SIZE,
                                        32, 2*CELL_SIZE/3);
            }
}

function draw_grid(){
    for (var x = 0; x < canvas.width; x += CELL_SIZE) {
      context.moveTo(x, 0);
      context.lineTo(x, canvas.height);
    }
    for (var y = 0; y < canvas.height; y += CELL_SIZE) {
      context.moveTo(0, y);
      context.lineTo(canvas.width, y);
    }
    context.moveTo(0,0);
    context.strokeStyle = "LightBlue";
    context.stroke();
    /*
    var coord = get_cell();
    context.fillStyle = "blue";
    context.fillRect(coord[0]*CELL_SIZE,coord[1]*CELL_SIZE, CELL_SIZE, CELL_SIZE);
    */
}

function draw_magma(){
    for (var i=0; i < magma.length; i++){
        var x = magma[i][0];
        var y = magma[i][1];
        context.drawImage(lava, magma_frame * 32, 0,
                          32, 32,
                          x*CELL_SIZE,
                          y*CELL_SIZE, 32, 32);
    }
    if(frame%5==0)
        magma_frame = (magma_frame+1)%10;
}

function pretty_walls(){
    var new_map = "";
    console.log(mapstr.length, nx, ny);
    for(var i=0; i<mapstr.length; i++){
        if (mapstr[i] == "w" || mapstr[i] == "h"){
            var x = i%nx;
            var y = parseInt(i/nx);
            var i_bottom = nx * (y+1) + x;
            var below_is_wall = "whv".includes(mapstr[i_bottom]);
            if(i_bottom >= mapstr.length || below_is_wall){
                new_map += "v";
            }
            else{
                new_map += "h";
            }
        }
        else
            new_map += mapstr[i];
    }
    mapstr = new_map;
}


function draw_walls(){
    for (var i=0; i < walls_v.length; i++){
        var pix = [walls_v[i][0]*CELL_SIZE, walls_v[i][1]*CELL_SIZE];
        context.drawImage(wall_v, pix[0], pix[1]);
    }
    for (var i=0; i < walls_h.length; i++){
        var pix = [walls_h[i][0]*CELL_SIZE, walls_h[i][1]*CELL_SIZE];
        context.drawImage(wall_h, pix[0], pix[1]);
    }
}

function is_wall(coord){
    if (coord[0] >= nx)
        return true;
    else if(coord[0] < 0)
        return true;
    else if(coord[1] >= ny)
        return true;
    else if (coord[1] < 0)
        return true;
    var i = nx * coord[1] + coord[0];
    if(DISPLAY_MAGMA)
        return mapstr[i]=="w";
    else
        return mapstr[i]=="v" || mapstr[i]=="h";
}

function is_gold(coord){
    var i = nx * coord[1] + coord[0];
    return mapstr[i]=="*";
}

function next_is_coin(){
    var coord = get_cell();
    coord[0] += img_obj.vx;
    coord[1] += img_obj.vy;
    if(is_gold(coord)){ //topleft
        return true;
    }
    return false;
}

function set_mapstr(coord, symbol){
    var i = nx * coord[1] + coord[0];
    // mapstr[i] = symbol;
    mapstr = replaceInStr(mapstr, i, symbol);
}

function remove_coin(coord){
    for(var i=0;i<coins.length;i++){
        if(coins[i][0] == coord[0] && coins[i][1] == coord[1]){
            sound_coin.pause();
            sound_coin.currentTime = 0;
            sound_coin.play();
            coins.splice(i,1); //remove element number i (1 times)
            set_mapstr(coord, " ");
            coins_took ++;
            break;
        }
    }
}


function char_near_center_cell(tolerance){
    return img_obj.x%CELL_SIZE < tolerance && img_obj.y%CELL_SIZE < tolerance
}
function char_touch_coin(){
    return is_gold(get_cell()) && char_near_center_cell(4);
}

function char_touch_wall(){
    if(is_wall(get_cell())){ //topleft
        return true;
    }
    /*
    else{ //bottom right
        var delta = parseInt(0.75*CELL_SIZE);
        var x = img_obj.x + delta;
        var y = img_obj.y + delta;
        x = parseInt(x/CELL_SIZE);
        y = parseInt(y/CELL_SIZE);
        return is_wall([x,y]);
    }*/
}

function click_run(){
    //clearInterval(intervalMainLoop);
    user_code = get_user_code();
    if(user_code == "error")
        return;
    console.log("USER CODE", user_code);
    initialize_run();
    console.log("START MAIN LOOP");
    if(currentRequest != null){
        cancelAnimationFrame(currentRequest);
        currentRequest = null;
    }
    currentRequest = requestAnimationFrame(main_loop);
}

var end_of_code = false;
function initialize_run(){
    if(currentRequest != null){
        cancelAnimationFrame(currentRequest);
        currentRequest = null;
    }
    mapstr = ORIGINAL_MAPSTR;
    VELOCITY = 4; //must be a divider of cell size
    end_of_code = false;
    icode = 0;
    frame = 0;
    goal_x = null;
    goal_y = null;
    goal_achieved = true;
    gameover = false;
    n_repeat = [1];
    instructions_repeat = [user_code];
    icode_repeat = [-1];
	walls_v = [];
    walls_h = [];
    if(!DISPLAY_MAGMA)
        pretty_walls();
    magma = [];
    coins = [];
    path = []
    for (var x=0; x<nx; x++){
        path.push([]);
        for (var y=0; y<ny; y++){
            path[x].push(false);
        }
    }
    for(var i=0; i<mapstr.length; i++){
        var x = i%nx;
        var y = parseInt(i/nx);
if(mapstr[i]=="v")
            walls_v.push([x,y])
        else if(mapstr[i]=="h")
            walls_h.push([x,y])
        if(mapstr[i]=="w")
            magma.push([x,y])
        else if(mapstr[i]=="o"){
            img_obj.x = x*CELL_SIZE;
            img_obj.y = y*CELL_SIZE;
            flag_coord = [x,y];
        }
        else if(mapstr[i]=="*"){
            coins.push([x,y,i%2]);
        }
    }
    img_obj.vx = 0;
    img_obj.vy = 0;
    img_obj.velocity = VELOCITY
    set_char_orientation('right', img_obj);
    n_coins_initial = coins.length;
    coins_took = 0;
    //initialize drawing
    if(!DEBUG){
        predraw()
        grid_img.src = canvas.toDataURL();
    }
}

var a = Date.now();
function main_loop(){
    if(!gameover){
        check_conditions();
        const MAX_N = 10000;
        var i = 0;
        while(i < MAX_N){
            if(!process_user_code())
                break;
            i++;
        }
        if(i==MAX_N){
            gameover = true;
            show_message(END_LOOP, "error");
        }
        draw_anim();
        update_char_pos();
        currentRequest = requestAnimationFrame(main_loop);
        if(frame%100==0){
            console.log(Date.now() -a, frame);
            a = Date.now();
        }
        frame += 1;
    }
    else{
        currentRequest = requestAnimationFrame(final_situation);
    }

}

function get_code_element(what, txt_after, base){
    var code = what + base + txt_after;
    return code;
}

function create_xrem(){
    var xrem = document.createElement("button");
    xrem.innerHTML = "x";
    xrem.className = "xremove";
    xrem.onclick = function (){
        var p = this.parentElement;
        var cn = this.parentElement.className;
        if( cn == "codel repeat" || cn == "codel ifwall" || cn == "codel else"){
            p.parentElement.parentElement.removeChild(p.parentElement);
        }
        else{
            p.parentElement.removeChild(p);
        }
    }
    return xrem;
}

function click_repeat(){
    var base = '<input type="number" value="2" class="input_repeat">';
    var code = get_code_element(REPEAT, TXT_AFTER_REPEAT, base);
    var node = document.createElement("div");
    node.className = "codel repeat";
    node.innerHTML = code;
    var xrem = create_xrem();
    node.appendChild(xrem);
    //
    var more = document.createElement("div");
    if(current_pan.className == "block_lines"){
        more.level = current_pan.level + 1;
    }
    else{
        more.level = 1;
    }
    more.className = "block_lines";
    //
    var group = document.createElement("div");
    group.className = "group_repeat";
    group.appendChild(node);
    group.appendChild(more);
    current_pan.appendChild(group);
    set_current_pan(more);
}

function click_move(){
    var base = '<input type="number" value="1" class="input_move">';
    var code = get_code_element(MOVE, TXT_AFTER_MOVE, base);
    var node = document.createElement("div");
    node.className = "codel move";
    node.innerHTML = code;
    var xrem = create_xrem();
    node.appendChild(xrem);
    current_pan.appendChild(node);
}

function click_turn(){
    var base = '<select class="input_turn">' +
                  '<option value="90"> 90° </option>' +
                  '<option value="180"> 180° </option>' +
                  '<option value="270"> 270° </option>' +
                '</select>';
    var code = get_code_element(TURN, TXT_AFTER_TURN, base);
    var node = document.createElement("div");
    node.className = "codel turn";
    node.innerHTML = code;
    var xrem = create_xrem();
    node.appendChild(xrem);
    current_pan.appendChild(node);
}

function click_ifwall(){
    var base = "";
    var code = get_code_element(IF_WALL, "", base);
    var node = document.createElement("div");
    node.className = "codel ifwall";
    node.innerHTML = code;
    var xrem = create_xrem();
    node.appendChild(xrem);
    var more = document.createElement("div");
    if(current_pan.className == "block_lines"){
        more.level = current_pan.level + 1;
    }
    else{
        more.level = 1;
    }
    more.className = "block_lines";
    //
    var group = document.createElement("div");
    group.className = "group_ifwall";
    group.appendChild(node);
    group.appendChild(more);
    current_pan.appendChild(group);
    set_current_pan(more);
}

function click_else(){
    var base = "";
    var code = get_code_element(ELSE, "", base);
    var node = document.createElement("div");
    node.className = "codel else";
    node.innerHTML = code;
    var xrem = create_xrem();
    node.appendChild(xrem);
    var more = document.createElement("div");
    if(current_pan.className == "block_lines"){
        more.level = current_pan.level + 1;
    }
    else{
        more.level = 1;
    }
    more.className = "block_lines";
    //
    var group = document.createElement("div");
    group.className = "group_else";
    group.appendChild(node);
    group.appendChild(more);
    current_pan.appendChild(group);
    set_current_pan(more);
}

function collect_user_code(e, code, level){
    var children = e.childNodes;
    var prefix = "#".repeat(level); //not needed, but more readable
    console.log("COLLECT", prefix);
    for(var i=0; i<children.length; i++){
        var child = children[i];
        if (child.innerHTML === undefined){
        //special treatment
        }
        else{
            console.log(child.innerHTML);
            if(child.className == "codel move"){
                var el = child.getElementsByClassName('input_move')[0];
                code.push(MOVE + el.value);
                console.log("APPEND", prefix + MOVE + el.value);
            }
            else if(child.className == "codel turn"){
                var el = child.getElementsByClassName('input_turn')[0];
                code.push(TURN + el.value);
                console.log("APPEND",prefix + TURN + el.value);
            }
            else if(child.className == "group_repeat"){
                var el = child.getElementsByClassName('input_repeat')[0];
                code.push(REPEAT + el.value);
                code.push("{");
                console.log("APPEND", prefix + REPEAT + el.value);
                var e = child.getElementsByClassName('block_lines')[0]
                collect_user_code(e, code, level+1);
                code.push("}");
            }
            else if(child.className == "group_ifwall"){
                code.push(IF_WALL);
                console.log("APPEND", prefix + IF_WALL);
                code.push("{");
                var e = child.getElementsByClassName('block_lines')[0]
                collect_user_code(e, code, level+1);
                code.push("}");
            }
        }
    }
}

function get_instruction(line){
    // var instruction = line.trim();
    var instruction = line.replace(/ +(?= )/g,'');
    var sep = instruction.split(" ");
    var expression = instruction.split(sep[1])[0].trim();
    return [instruction, sep, expression];
}

function check_code_errors(to_treat){
    var level = 0;
    for(var i=0; i<to_treat.length; i++){
        var parsed = get_instruction(to_treat[i]);
        var instruction = parsed[0];
        var sep = parsed[1];
        var expression = parsed[2];
        var itxt = (i+1).toString();
        if(expression == MOVE){
            var arg = sep[1].trim();
            if(isNaN(arg)){
                show_error(INVALID_NUMBER, instruction, itxt);
                return i;
            }
        }
        else if(expression == TURN){
            var arg = sep[1].trim();
            if(isNaN(arg) && arg != RANDOM){
                show_error(INVALID_NUMBER, instruction, itxt);
                return i;
            }
            else if(!["90","180","270",RANDOM].includes(arg)){
                show_error(INVALID_ANGLE, instruction, itxt);
            }
        }
        else{
            var is_repeat = expression==REPEAT;
            if(is_repeat){
                if(isNaN(sep[1])){
                    show_error(INVALID_NUMBER, instruction, itxt);
                    return i;
                }
            }
            var is_if = expression==IF;
            if(is_if){
                var what = sep[1].trim();
                if (what != WALL && what != COIN){
                    show_error(UNKNOWN_INSTRUCTION, instruction, itxt);
                    return i;
                }
            }
            var is_else = expression==ELSE;
            if(is_repeat || is_if || is_else){
                var accolade_line = to_treat[i+1].trim();
                if(accolade_line != "{"){
                    line_txt = (i+2).toString();
                    show_error(INVALID_OPEN_BRACKET, accolade_line, line_txt);
                    return i+1;
                }
                else{
                    level ++;
                    i++;
                }
            }
            else{
                if(instruction=="}"){
                    level --;
                    if(level<0){
                        show_error(INVALID_CLOSE_BRACKET, instruction, itxt);
                        return i
                    }
                }
                else{
                    show_error(UNKNOWN_INSTRUCTION, instruction, itxt);
                    return i
                }
            }
        }
    }//end for
    if(level!=0){
        if(instruction == " " || instruction == "")
            show_error(EMPTY_LINE, instruction, itxt);
        else
            show_error(INVALID_CLOSE_BRACKET, instruction, itxt);
        return i
    }
    return -1;
}

function transpile_user_code(collected, to_treat, code, level){
    console.log("COLLECT", level);
    var last_if = "";
    for(var i=0; i<to_treat.length; i++){
        var parsed = get_instruction(to_treat[i]);
        var instruction = parsed[0];
        var sep = parsed[1];
        var expression = parsed[2];
        console.log("TREATING", instruction, sep, expression);
        if(expression == MOVE){
            code.push([MOVE, parseInt(sep[1])]);
            last_if = "";
        }
        else if(expression == TURN){
            code.push([TURN, sep[1]]);
            last_if = "";
        }
        else{
            var is_repeat = expression==REPEAT;
            var is_if = expression==IF;
            var is_else = expression==ELSE;
            if(is_repeat || is_if || is_else){
                var accolade_line = to_treat[i+1].trim();
                var inner_lines = get_inner_lines(to_treat, i);
                var inner_code = [];
                transpile_user_code(collected, inner_lines, inner_code, level+1);
                if(is_repeat){
                    var n = parseInt(sep[1]);
                    code.push([REPEAT, n, inner_code]);
                    last_if = "";
                }
                else if(is_else){
                    if(last_if != ""){
                        code.push([ELSE, last_if, inner_code]);
                        last_if = "";
                    }
                    else{
                        show_error(INVALID_ELSE, instruction, (i+1).toString());
                        return true;
                    }
                }
                else{
                    var what = sep[1].trim();
                    if(what == WALL)
                        code.push([IF_WALL, inner_code]);
                    else if (what == COIN)
                        code.push([IF_COIN, inner_code]);
                    last_if = what;
                }
                i += inner_lines.length + 2;
            }
        }
    }
}

function get_inner_lines(collected, icode){
    instructions = [];
    var i = icode + 2;
    var counter_open = 0;
    console.log("enter inner", i, collected);
    while(i < collected.length){
        console.log("       inner", collected[i]);
        if(collected[i].startsWith('{'))
            counter_open++;
        else if(collected[i].startsWith('}')){
            counter_open--;
        }
        if(counter_open < 0){
            return instructions;
        }
        else
            instructions.push(collected[i]);
        i++;
    }
}

function get_user_code(){
    var collected = [];
    if(MODE=="blocks"){
        var e = document.getElementById("code_pan");
        collect_user_code(e, collected, 0);
    }
    else{
        var value = document.getElementById("code_pan").value.split("\n");
        for(var i=0; i<value.length; i++){
            var txt = value[i].trim();
            txt = txt.replace(FOREVER, "123456789");
            collected.push(txt);
        }
    }
    console.log("COLLECTED:");
    console.log(collected);
    var code = [];
    if(check_code_errors(collected) != -1){
        return "error";
    }
    transpile_user_code(collected, collected, code, 0);
    return code;
}

function refresh_current_pan(){
    var DEF_COLOR = "cyan";
    var candidates = document.getElementsByClassName("block_lines");
    var highest_level = 0;
    for(var i=0; i<candidates.length; i++){
        var e = candidates[i];
        e.style.backgroundColor = DEF_COLOR;
        if(e.matches(":hover")){
            if(e.level > highest_level){
                current_pan = e;
                highest_level = e.level;
            }
        }
    }
    if(highest_level == 0)
        current_pan = document.getElementById("code_pan");
    else
        current_pan.style.backgroundColor = "red";
}

function set_current_pan(e){
    var DEF_COLOR = "cyan";
    var candidates = document.getElementsByClassName("block_lines");
    for(var i=0; i<candidates.length; i++){
        var e = candidates[i];
        e.style.backgroundColor = DEF_COLOR;
    }
    current_pan = e;
    current_pan.style.backgroundColor = "red";
}

function click_restart(){
    gameover = true;
    initialize_run();
    currentRequest = requestAnimationFrame(initial_situation);
    //clearInterval(intervalMainLoop);
}

function initial_situation(){
    frame++;
    if(frame%INTERVAL_ANIM == 0){
        draw_anim();
    }
    currentRequest = requestAnimationFrame(initial_situation);
}

function final_situation(){
    frame++;
    // if(frame%INTERVAL_ANIM == 0){
        var text;
        var color;
        if(coins_took == n_coins_initial && coins_took > 0){
            text = GAME_WON;
            color = "green";
            if(map_level.includes(parseInt(mapn)+1)){
                ask_next_level();
            }
        }
        else if(end_of_code){
            text = END_OF_PROGRAM;
            color = "green";
        }
        else{
            text = GAME_OVER;
            color = "red";
        }
        context.font = "40px sans-serif";
        context.rect(0,0,canvas.width,canvas.height);
        context.fillStyle = "rgba(255, 255, 255, 0.5)";
        context.fill();
        context.fillStyle = color;
        context.textAlign = "center";
        context.fillText(text, canvas.width/2, canvas.height/2);
    // }
    // currentRequest = requestAnimationFrame(final_situation);
}

function next_level(){
    var level = parseInt(mapn)+1
    location.href='./play.html?mapn=' + level;
}

function show_correction(){
    if(mapn.includes("TUTO")){
        if(correction != "")
            show_message(correction, "info");
    }
    else
        document.getElementById("code_pan").value = correction;
}

function insertAtCursor(myField, myValue) {
    //IE support
    if (document.selection) {
        myField.focus();
        sel = document.selection.createRange();
        sel.text = myValue;
    }
    //MOZILLA and others
    else if (myField.selectionStart || myField.selectionStart == '0') {
        var startPos = myField.selectionStart;
        var endPos = myField.selectionEnd;
        myField.value = myField.value.substring(0, startPos)
            + myValue
            + myField.value.substring(endPos, myField.value.length);
    } else {
        myField.value += myValue;
    }
}

function acc1(){
    var cp = document.getElementById("code_pan");
    insertAtCursor(cp, "{");
}

function acc2(){
    var cp = document.getElementById("code_pan");
    insertAtCursor(cp, "}");
}
