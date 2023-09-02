let blackjackgame={
  'you':{'scoreSpan':'#yourblackjackresult','div':'#yourbox','score':0},
  'dealer':{'scoreSpan':'#dealerblackjackresult','div':'#dealerbox','score':0},
  'card':['2','3','4','5','6','7','8','9','10','K','J','Q','A'],
  'cardmap':{'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'K':10,'J':10,'Q':10,'A':[1,11]
  },
  'wins':0,
  'losses':0,
  'draws':0,
  'isstand':false,
  'turnsover':false,

};
const YOU=blackjackgame['you'];
const DEALER=blackjackgame['dealer'];


document.querySelector('#hitbtn').addEventListener('click',blackjackhit);

document.querySelector('#deal').addEventListener('click',blackjackdeal);

document.querySelector('#stand').addEventListener('click',stand);


const hitsound=new Audio('blackjack_assets/sounds/whoosh-6316.mp3');
const winsound=new Audio('blackjack_assets/sounds/cash.mp3');
const losssound=new Audio('blackjack_assets/sounds/aww.mp3');

function blackjackhit(){
 if(blackjackgame['isstand']==false){

   let card=randomcard();
   showCArd( card,YOU);
   updatesscore(card,YOU);
   showscore(YOU);
 }
}



function showCArd( card,activeUser){
  if(activeUser['score']<=21){

    let cardImage =document.createElement('img');
    cardImage.src=`blackjack_assets/images/${card}.png`;
    document.querySelector(activeUser['div']).appendChild(cardImage);
    hitsound.play();
   }
}
function blackjackdeal(){
if(blackjackgame['turnsover']==true){


 blackjackgame['isstand']=false;

 //  showresult(computescore());
 //  computescore();
 let yourImage=document.querySelector('#yourbox').querySelectorAll('img');
 let dealerImage=document.querySelector('#dealerbox').querySelectorAll('img');
 
 
 //   console.log(yourImage);
 
 for(i=0;i<yourImage.length;i++){
   yourImage[i].remove();
 }
 for(i=0;i<dealerImage.length;i++){
   dealerImage[i].remove();
 }
 
 
 YOU['score']=0;
 console.log(YOU['score']);
 DEALER['score']=0;
 document.querySelector('#yourblackjackresult').textContent=0;
 document.querySelector('#dealerblackjackresult').textContent=0;
 document.querySelector('#dealerblackjackresult') .style.color='white';
 document.querySelector('#yourblackjackresult') .style.color='white';
 
 
 document.querySelector('#blackjackresult').textContent="let's play";
 document.querySelector('#blackjackresult').style.color='black';
}
blackjackgame['turnsover']=true;
 }

function randomcard(){

 let randomidnex=Math.floor(Math.random()*13);
 return blackjackgame['card'][randomidnex];
}

function updatesscore(card,activeUser){
 if(card=='A')
 {

   if(activeUser['score']+blackjackgame['cardmap'][card][1]<=21){
 activeUser['score']+=blackjackgame['cardmap'][card][1];    
   }
   else{
     activeUser['score']+=blackjackgame['cardmap'][card][0];    

   }
 }
 else{

   activeUser['score']+=blackjackgame['cardmap'][card];
 }
}
function showscore(activeUser){
 if(activeUser['score']>21){
   document.querySelector(activeUser['scoreSpan']).textContent='BUST!';
   document.querySelector(activeUser['scoreSpan']).style.color='red';

 }
 else{

   document.querySelector(activeUser['scoreSpan']).textContent=activeUser['score'];
 }
}
 
function stand()
{
 blackjackgame['isstand']=true;


 while(DEALER['score']<16&& blackjackgame['isstand']===true){

   let card=randomcard();
   showCArd(card,DEALER);
   updatesscore(card,DEALER);
   showscore(DEALER); 
 } 


 blackjackgame['turnsover']=true;
 let winner=computescore();
 showresult(winner);
 // console.log(blackjackgame['turnsover'])
}
//update wins loss draws
function computescore(){
 let winner;
if(YOU['score']<=21){
 if(YOU['score']>DEALER['score']|| (DEALER['score']>21)){
   blackjackgame['wins']++;
   winner=YOU;
 }
 else if(YOU['score']<DEALER['score']){
console.log('you lost');
blackjackgame['losses']++;

winner=DEALER;
 }
 else if(YOU['score']===DEALER['score']){
   console.log('draw');
   blackjackgame['draws']++;


 }
}
else if(YOU['score']>21 && DEALER['score']<=21){
 console.log("delaer wins");
 blackjackgame['losses']++;

 winner=DEALER;
}
else if(YOU['score']>21&&DEALER['score']>21){
 console.log('you drew');
 blackjackgame['draws']++;

}
console.log('winner is ',blackjackgame);
return winner;

}
function showresult( winner){

let message ,messagecolor;

if(blackjackgame['turnsover']===true)
{

 if(winner==YOU){
   document.querySelector('#wins').textContent=blackjackgame['wins'];
   message='you won!';
   messagecolor='green';
   winsound.play();
   
 }
 else if(winner==DEALER){
   document.querySelector('#Losses').textContent=blackjackgame['losses'];
   
   message='you lost!';
   messagecolor='red';
 losssound.play();
} else{
 document.querySelector('#Draws').textContent=blackjackgame['draws'];
 message="you drew:)";
 messagecolor='black';
}
document.querySelector('#blackjackresult').textContent=message;
document.querySelector('#blackjackresult').style.color=messagecolor;
// document.querySelector('#blackjackresult').style.font= 'bold';

}

}
