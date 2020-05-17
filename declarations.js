
var pattern;
if(mapn.toString().includes("TUTO"))
    pattern = mapn;
else if(mapn.toString().startsWith("USER"))
    pattern = "USER";
else if(mapn == "EMPTY")
    pattern = "EMPTY";
else
    pattern = "MAP"+mapn;
console.log("mapn",mapn);
console.log("pattern",pattern);
var mapstr;
var nx;
var ny;
var initial_code;
var hint;
var correction;
if(pattern == "USER"){
    mapstr = mapn.toString().split("USER")[1];
    ny = EMPTY_ny;
    nx = mapstr.length / ny;
    initial_code = "";
    hint = "";
    correction = "";
}
else{
    mapstr= eval(pattern);
    ny = eval(pattern + "_ny");
    nx = mapstr.length / ny;
    initial_code = eval(pattern + "_initial_code");
    hint = eval(pattern + "_hint");
    correction = eval(pattern + "_correction");
}
var currentRequest = null;
const INTERVAL = 40;
const INTERVAL_ANIM = 10;
const FOREVER = "toujours";
const RANDOM = "aléatoire";
const MOVE = "avancer";
const TXT_AFTER_MOVE = " cases";
const TURN = "tourner";
const TXT_AFTER_TURN = "";
const REPEAT = "répéter";
const TXT_AFTER_REPEAT = " fois";
const IF = "si"
const WALL = "magma";
const IF_WALL = IF + " " + WALL;
const COIN = "pièce";
const IF_COIN = IF + " " + COIN;
const ELSE = "sinon";
const GAME_OVER = "Perdu !";
const GAME_WON = "Gagné !";
const RUN = "Executer les ordres";
const RESTART = "Recommencer";
const HELP_CODE = "Aide-mémoire";
const HELP_BLOCKS = "Instructions";
const TITLE_CODE = "Ton code";
const PLACEHOLDER = "Ecris ton code ici...";
const UNKNOWN_INSTRUCTION = "Instruction non valide";
const INVALID_NUMBER = "Nombre invalide";
const INVALID_ANGLE = "Angle invalide. Les angles valides sont : 90, 180, 270, "+RANDOM+"."
const INVALID_OPEN_BRACKET = "Accolade d'ouverture invalide ou manquante";
const INVALID_CLOSE_BRACKET = "Accolade de fermeture invalide ou manquante";
const INVALID_ELSE = 'La ligne contient un "' + ELSE + '" qui ne se rapport à aucun "' + IF + '"';
const EMPTY_LINE = "Ligne vide";
const LINE_STR = "Ligne";
const INFO_CAPS = "Attention, les ordres ne doivent pas contenir majuscules."
const END_OF_PROGRAM = "Fin du code";
const PROJECT = "⌂ Prog.ID";
const CHOOSE_LEVEL = "Choisir un niveau";
const EXAMPLES = "Exemples";
const CREATION = "Création";
const CORRECTION = "Afficher une solution";
const MORE = "Pour aller plus loin...";
const TITLES = {"error":"Erreur", "hint":"Consigne", "info":MORE};
const TXT_NEXT_LEVEL = "Passer au niveau suivant ?";
const YES = "Oui";
const NO = "Non";
const LEVEL = "Niveau";
const USER_LEVEL = "Niveaux créés par les utilisateurs"
const tabs4 = "&nbsp;".repeat(4);
const CELL_SIZE = 32;
const DISPLAY_MAGMA = false;
var VELOCITY; //must be a divider of cell size
var icode = 0;
var frame = 0;
var user_code = [];
var gameover = false;
var img_obj = {
    'source': null,
    'current': 0,
    'total_frames': 6,
    'width': 32,
    'height': 32,
    'x' : 2*CELL_SIZE,
    'y' : parseInt(ny/2*CELL_SIZE),
    'vx' : 0,
    'vy' : 0,
    'velocity' : VELOCITY
};
const nframes = {'left' : 6, 'right' : 6, 'up' : 4, 'down' : 4};
const vel = {'left' : [-1,0], 'right' : [1,0], 'up' : [0,-1], 'down' : [0,1]};
const orientation_seq = ['left','up','right','down'];
var img = new Image();
var goal_x;
var goal_y;
var goal_achieved = true;
var n_repeat = [1];
var instructions_repeat = [user_code];
var icode_repeat = [-1];
var lava = new Image();
lava.src = "./lava.png"
var magma_frame = 0;
var wall_v = new Image();
if(DISPLAY_MAGMA)
    wall_v.src = "./wall_v.png"
else
    wall_v.src = "./wall_v_nogrid.png"
var wall_h = new Image();
wall_h.src = "./wall_h.png"
var gold = new Image();
gold.src = "./coin_rotate_32.png"
var flag = new Image();
flag.src = "./flag.png"
var flag_frame = 0;
var flag_coord;
var walls_h = [];
var walls_v = [];
var magma = [];
var coins = [];
var coins_took = 0;
var n_coins_initial;
var sound_coin = new Audio('coin.wav');
var grid_img = new Image();
var current_pan = document.getElementById("code_pan");
var canvas = document.getElementById('icanvas');
var context;
if(canvas){
    canvas.width = nx*CELL_SIZE;
    canvas.height = ny*CELL_SIZE;
    context = canvas.getContext("2d");
}
var show_path = false;
var path = [];
