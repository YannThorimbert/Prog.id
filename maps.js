var MAP1 =
"wwwwwwwwwwwwww"+
"w            w"+
"w            w"+
"w            w"+
"w o    *     w"+
"w            w"+
"w            w"+
"w            w"+
"w            w"+
"wwwwwwwwwwwwww";
var MAP1_ny = 10;
var MAP1_initial_code = "Avancer : 1";
var MAP1_hint = 'Teste le code et modifie-le pour attraper la pièce.'+
 '<br><br>Clique sur "Executer les ordres" pour tester le code.';

var MAP2 =
"wwwwwwwwwwwwww"+
"w            w"+
"w            w"+
"w            w"+
"w o    *     w"+
"w            w"+
"w            w"+
"w      *     w"+
"w            w"+
"wwwwwwwwwwwwww";
var MAP2_ny = 10;
var MAP2_initial_code = "Avancer:2\nTourner:90\nAvancer:2";
var MAP2_hint = 'Teste le code et modifie-le pour attraper toutes les pièces.';

var MAP3 =
"wwwwwwwwwwwwww"+
"w            w"+
"w o    *     w"+
"w            w"+
"w            w"+
"w            w"+
"w            w"+
"w *    *     w"+
"w            w"+
"wwwwwwwwwwwwww";
var MAP3_ny = 10;

var MAP3_initial_code = "Répéter:4\n{\n    Avancer:3\n    Tourner:90\n}";
var MAP3_hint = 'Teste le code et modifie-le pour attraper toutes les pièces.';

var MAP4 =
"wwwwwwwwwwwwww"+
"w            w"+
"w            w"+
"w *          w"+
"w o  *  *  * w"+
"w            w"+
"w *        * w"+
"w            w"+
"w *        * w"+
"w            w"+
"w *        * w"+
"w            w"+
"w          * w"+
"w *    *   * w"+
"w            w"+
"wwwwwwwwwwwwww";
var MAP4_ny = 16;
// var MAP4_initial_code = "";
var MAP4_initial_code =  "Répéter:toujours\n{\n    Si mur\n    {\n        Tourner:180\n    }\n    Avancer:1\n}";
var MAP4_hint = 'Attrape les pièces en écrivant le moins de code possible.'+
                 " Pense à utiliser l'instruction " + '"Répéter".';



 // var MAP6 =
 // "wwwwwwwwwwwwww"+
 // "w            w"+
 // "w            w"+
 // "w *          w"+
 // "w o        * w"+
 // "w            w"+
 // "w            w"+
 // "w            w"+
 // "w            w"+
 // "w            w"+
 // "w            w"+
 // "w            w"+
 // "w            w"+
 // "w *        * w"+
 // "w            w"+
 // "wwwwwwwwwwwwww";
 // var MAP6_ny = 16;
 // var MAP6_initial_code = "";
 // var MAP6_hint = 'Attrape les pièces en écrivant le moins de code possible.'+
 //                  "Pense à utiliser les instructions " + '"Répéter" et "Si pièce"';


// Répéter:toujours
// {
//     Si mur
//     {
//         Tourner:aléatoire
//     }
//     Avancer:1
// }


var MAP5 =
"wwwwwwwwwwwwww"+
"wo      *    w"+
"w           *w"+
"w*           w"+
"w            w"+
"w    *     * w"+
"wwwwwwwwwwwwww";
var MAP5_ny = 7;
var MAP5_initial_code =  "Répéter:toujours\n{\n    Si mur\n    {\n        Tourner:180\n    }\n    Avancer:1\n}";
var MAP5_hint = "Teste le code et modifie-le pour attraper les pièces avec peu d'instructions.";


var MAP6 =
"wwwwwwwwwwwwww"+
"wo           w"+
"wwwwwww      w"+
"w            w"+
"w   wwwwwwwwww"+
"w            w"+
"wwwwwww      w"+
"w            w"+
"w   wwwwwwwwww"+
"w          * w"+
"wwwwwwwwwwwwww";
var MAP6_ny = 11;
var MAP6_initial_code = "";
var MAP6_hint = "Teste le code et modifie-le";


// var MAP6 =
// "wwwwwwwwwwwwwwwwwwwwww"+
// "w       w            w"+
// "w                    w"+
// "w      o          w  w"+
// "w                    w"+
// "w    w wwwwwwww ww   w"+
// "w                    w"+
// "w                    w"+
// "w        w           w"+
// "w                    w"+
// "w    w           w   w"+
// "w                    w"+
// "wwwwwwwwwwwwwwwwwwwwww";
// var MAP6_ny = 13;
// var MAP6_initial_code = "";
// var MAP6_hint = '';

var MAP1000 =
"wwwwwwww"+
"w      w"+
"w o    w"+
"w      w"+
"w    * w"+
"wwwwwwww";
var MAP1000_ny = 6;
var MAP1000_initial_code = "Avancer : 1\nTourner : 90\nAvancer : 1";
var MAP1000_hint = '';

var map_level = [1,2,3,4,5,6];
