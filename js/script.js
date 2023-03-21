/**
 * Consegna
L'utente clicca su un bottone che genererà una griglia di gioco quadrata.
Ogni cella ha un numero progressivo, da 1 a 100.
Ci saranno quindi 10 caselle per ognuna delle 10 righe.
Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro ed emetto un messaggio in console con il numero della cella cliccata.
Bonus
Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
- con difficoltà 1 => 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
- con difficoltà 2 => 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
- con difficoltà 3 => 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;
 */
/**
 * 1. Creo html e bottone da richiamare in js
 * 2.Aggiungo eventlistener e evento al click (o submit se utilizzo un form)
 * 3.funzione per generare la griglia (quadratini da unserire nel div dell'html) -
 *      creo div, il numero dei div è da indicare con una variabile (che per il bonus dipenderà da value di select) -
 *      aggiungo classe già pronta nel css (no bg!), ;
 * 4.aggiungo eventilistener al quadratino (al click cambio bg e console.log dell'indice del quadratino);
 */
//Richiamo gli elementi dall'html: form (il bottone submit è nel form)
const btn = document.querySelector('form');

// costruisco i quadrati
function createSquares(content, numberinRow){//Dichiaro la funzione
    const square = document.createElement('div'); //Creo il div e lo assegno alla costante square
        square.classList.add('square');//Aggiungo la classe al div
        square.style.width=`calc(100% / ${numberinRow})`;//Assegno la larghezza al div relativa al n. di quadrati in una riga
        square.style.height=square.style.width;//Assegno l'altezza al div per far sì che resti quadrato
        square.innerHTML=`<span>${content}</span>`;//Inserisco il contenuto nello span
    return square;//faccio ritornare square, che utilizzerò nella funzione
}
//Scrivo la funzione per generare bombe casuali
function rndBombs(rndLength, choiceRange){//Dichiaro la funzione
  const bombs = [];//dichiaro l'array che conterrà le bombe
    while (bombs.length < rndLength){//dichiaro la condizione (finché l'array ha meno elemento di quanti me ne servano)
        const bomb = getRndNumIncl(1, choiceRange);//genero un numero casuale tra 1 e il massimo possibile che assegno alla costante bomb
        if (!bombs.includes(bomb)){ //se la variabile non è inclusa nell'array
            bombs.push(bomb);//inserisco la variabile nell'array
        }
    } 
    return bombs;//faccio ritornare square, che utilizzerò nella funzione
}
//Scrivo la funzione per mostrare le bombe
function showBombs(bombs){//Dichiaro la funzione
    const squares = document.querySelectorAll('.square');//creo la nodelist di quadrati
    for (let square of squares){//utilizzo il for of sui quadrato
        if (bombs.includes(parseInt(square.innerText))){//se l'array delle bombe include il testo di square
            square.classList.add('unsafe');//aggiungi la classe unsafe
        }
    }
}
//Scrivo la funzione Play - legata al submit
function play(e){
    e.preventDefault();
    //prendo e cancello il playground prima del nuovo gioco
    let playground = document.getElementById('playground');
    playground.innerHTML = "";
    //prendo e azzero h4 del punteggio e punteggio
    let points = 0;
    let pointsMsg = document.querySelector('h4');
    pointsMsg.innerText = `Seleziona il livello e inizia a giocare!`;   
    let gameover = false;//dichiaro variabile di controllo
    //Accerto il livello e lo collego al numero di quadrati
   let numSquares;//dichiaro la variabile cui sarà assegnato il numeor dei quadrati
   const NUM_BOMBS = 16; //dichiaro la costante dei numero di bombe da generare
   const level = document.getElementById('level').value; //assegno l'input dell'utente alla variavile livello
   switch (level){ //costruisco lo switch
       case 'easy': //se la variabile è 'easy'
           numSquares = 100; //il numero di quadrati sarà 100
           break;//interrompo l'esecuzione
       case 'medium':
           numSquares = 81;
           break;
       case 'hard':
           numSquares = 49;
           break;
   }
   //Genero le bombe
   const bombs = rndBombs(NUM_BOMBS, numSquares); //inserisco nella variabile bombs le bombe generate con la funzione richiamata 
   let maxScore = numSquares - NUM_BOMBS; //avendo le variabili necessarie, le uso per assegnare un valore a maxScore;
   //Calcolo il numero di quadrati per riga -->fondamentale per stabilire la grandezza dei quadratini
   let numSquareInRow = Math.sqrt(numSquares);//prendo la radice del quadrato per stabilire la misura del lato
   for (i = 1; i <= numSquares; i++){//partendo da i=1 e finché non raggiunge il numSquares - incrementandolo ad ogni giro
       //riprendo il quadratino creato e 'ritornato' dalla funzione e lo inserisco nel playground
       const square = createSquares(i, numSquareInRow);
       playground.appendChild(square);//inserisco il quadrato nel playground
       square.addEventListener('click', function(){//ad ogni click sul quadrato
       const x = parseInt(square.innerText); //data x che corrisponde al numero scritto dentro lo square
        if (!gameover && !this.classList.contains('safe') && points<maxScore){//solo se gameover è falsa e lo square non ha la classe safe e l'utente non ha ancora vinto
            if (bombs.includes(x)){ //se x è compreso nell'array bombs
               // square.classList.add('unsafe'); //aggiungi la classe unsafe
                pointsMsg.innerText = `Hai perso! Il tuo punteggio è ${points}`//mostra il messaggio ha perso con i punti registrat nella variabile points
               // gameover = true;//rendo gameover true per non far continuare il gioco
                showBombs(bombs);//mostra tutte le bombe con la funzione
            } else {//altrimenti
                square.classList.add('safe');//aggiungi la classe safe
                points++;//incrementa la variabile points
                pointsMsg.innerText = `Il tuo punteggio è ${points}`;//mostra il punteggio
                if (points === maxScore){//solo se i punti raggiungono il maxscore
                    pointsMsg.innerText = `Hai vinto! Il tuo punteggio è ${points}`}//mostra hai vinto con il punteggio
                }
            }
        }
   );} 
}
//Aggiungo la funzione al submit
btn.addEventListener('submit', play);