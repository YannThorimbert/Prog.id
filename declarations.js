

var pattern = "MAP"+mapn;
var mapstr = eval(pattern);
var ny = eval(pattern + "_ny");
var nx = mapstr.length / ny;
var initial_code = eval(pattern + "_initial_code");
var hint = eval(pattern + "_hint");
var INTERVAL = 40;
var INTERVAL_ANIM = 10;
var currentRequest = null;
var FOREVER = "toujours";
var RANDOM = "aléatoire";
var MOVE = "Avancer:";
var TXT_AFTER_MOVE = " cases";
var TURN = "Tourner:";
var TXT_AFTER_TURN = "";
var REPEAT = "Répéter:";
var TXT_AFTER_REPEAT = " fois";
var IF_WALL = "Si mur";
var ELSE = "Sinon:";
var GAME_OVER = "Perdu !";
var GAME_WON = "Gagné !";
var RUN = "Executer les ordres";
var PAUSE = "Stop";
var HELP_CODE = "Aide-mémoire";
var HELP_BLOCKS = "Instructions";
var TITLE_CODE = "Ton code";
var PLACEHOLDER = "Ecris ton code ici...";
var TITLES = {"error":"Erreur", "hint":"Consigne", "info":""};
var UNKNOWN_INSTRUCTION = "Instruction non valide";
var INVALID_NUMBER = "Nombre invalide";
var INVALID_OPEN_BRACKET = "Accolade d'ouverture invalide ou manquante";
var INVALID_CLOSE_BRACKET = "Accolade de fermeture invalide ou manquante";
var EMPTY_LINE = "Ligne vide";
var LINE_STR = "Ligne";
var END_OF_PROGRAM = "Fin du code";
var PROJECT = "⌂ Prog.ID";
var CHOOSE_LEVEL = "Choisir un niveau";
var TXT_NEXT_LEVEL = "Passer au niveau suivant ?";
var YES = "Oui";
var NO = "non";
var LEVEL = "Niveau";
var tabs4 = "&nbsp;".repeat(4);
var CELL_SIZE = 32;
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
var nframes = {'left' : 6, 'right' : 6, 'up' : 4, 'down' : 4};
var vel = {'left' : [-1,0], 'right' : [1,0], 'up' : [0,-1], 'down' : [0,1]};
var orientation_seq = ['left','up','right','down'];
var img = new Image();
var goal_x;
var goal_y;
var goal_achieved = true;
var n_repeat = [1];
var instructions_repeat = [user_code];
var icode_repeat = [-1];
var wall_v = new Image();
wall_v.src = "./wall_v.png"
var wall_h = new Image();
wall_h.src = "./wall_h.png"
var gold = new Image();
gold.src = "./coin_rotate_32.png"
var walls_h = [];
var walls_v = [];
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
