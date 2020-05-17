var TUTO1 =
"wwwwwwwwwwwwww"+
"w            w"+
"w            w"+
"w            w"+
"w o          w"+
"w            w"+
"w            w"+
"w            w"+
"w            w"+
"wwwwwwwwwwwwww";
var TUTO1_ny = 10;
var TUTO1_initial_code =
"répéter 4\n{\n"+
"    avancer 3\n    tourner 90\n}";
var TUTO1_hint = '';
var TUTO1_title = "Les boucles : effectuer un carré";
var TUTO1_correction = "Que faut-il changer pour faire trois tours du carré ?<br>"+
"Et pour effectuer le parcours dans le sens inverse ?";


var TUTO2 =
"wwwwwwwwwwwwww"+
"w       w    w"+
"w            w"+
"w            w"+
"w o      w   w"+
"ww           w"+
"w            w"+
"w   w        w"+
"w           ww"+
"wwwwwwwwwwwwww";
var TUTO2_ny = 10;
var TUTO2_initial_code =
"répéter toujours\n{\n"+
"    si magma\n    {\n"+
"       tourner 90\n    }\n"+
"    avancer 1\n}";
var TUTO2_hint = '';
var TUTO2_title = "Détecter les obstacles"
var TUTO2_correction = 'En changeant l\'angle de "90" à "aléatoire", on peut colorier beaucoup plus de cases'+
" si l'on attend suffisamment de temps... Mais certaines cases ne seront jamais coloriées. Sais-tu lesquelles ?";

var TUTO3 =
"wwwwwwwwwwwwwww"+
"w             w"+
"w             w"+
"w             w"+
"w   o         w"+
"w             w"+
"w             w"+
"w             w"+
"w             w"+
"w             w"+
"w             w"+
"w             w"+
"w             w"+
"w             w"+
"wwwwwwwwwwwwwww";
var TUTO3_ny = 15;
var TUTO3_initial_code =
"répéter 4\n{\n"+
"    répéter 4\n    {\n"+
"       tourner 270\n       avancer 2\n    }\n"+
"    avancer 6\n    tourner 90\n}";
var TUTO3_hint = 'Affiche la trajectoire du bonhomme pour mieux visualiser le résultat.';
var TUTO3_title = "Les doubles boucles"
var TUTO3_correction = "Essaie d'ajouter une troisième boucle pour modifier le dessin."


var TUTO4 =
"wwwwwwwwwwwwwww"+
"w  ww      w  w"+
"w       w     w"+
"ww            w"+
"w   o       w w"+
"w             w"+
"w ww          w"+
"w       www   w"+
"w       www  ww"+
"w  ww         w"+
"wwwwwwwwwwwwwww";
var TUTO4_ny = 11;
var TUTO4_initial_code =
"répéter toujours\n{\n"+
"    si magma\n    {\n"+
"       tourner aléatoire\n    }\n"+
"    sinon\n    {\n"+
"       avancer 1\n    }\n}";
var TUTO4_hint = 'Cet algorithme garantit de ne jamais être bloqué par le magma.';
var TUTO4_title = 'Utilisation du "sinon"'
var TUTO4_correction = " "

var ntutos = 4
