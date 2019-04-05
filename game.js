// UI var
let grids = document.getElementsByClassName('child');
let result = document.getElementById('result');
//global var
let players = [];
// set players
const setPlayers = (name) =>{
    let score = 0;
    return {name, score};
}
// modules
const displayContent = (() =>{
    let items = ['','' ,'',
    '' , '' , '',
    '','',''];
    let winner = '';
    let i = 0 ;
    const displayItem = (e) =>{
        i++;
        let index = Number(e.target.dataset.key);
        if(i%2 !== 0){
            items[index -1] = 'x';
            e.target.innerHTML= "<p>x</p>";
            result.innerText= `${players[1].name}'s turn.`;
            if(players[1].name === "Computer" && i<9){
                let place = Math.floor(Math.random() * 9);
                while(items[place] !== ""){
                    console.log(place);
                    place = Math.floor(Math.random() *9);
                }
                
                items[place] = 'o';
                grids[place].innerHTML =  "<p>o</p>";
                result.innerText = `${players[0].name}'s turn.` ;
                grids[place].removeEventListener('click', displayContent.displayItem)
                
            }
        } else { items[index -1] = 'o';
            e.target.innerHTML = "<p>o</p>";
            result.innerText = `${players[0].name}'s turn.`  ;      
        }
        console.log(items);
        checking();
        console.log(winner);
        if(winner){
            switch(winner){
                case 'x': result.innerText = `${players[0].name} is winner`; 
                players[0].score+=1;
                break;
                case 'o': result.innerText = `${players[1].name} is winner`;
                players[1].score+=1;
            }
            console.log(players);
            document.getElementById('score').innerHTML=`
            <p>${players[0].name}: ${players[0].score}</p><br>
            <p>${players[1].name}: ${players[1].score}</p><br>
            `;
            document.getElementById('re').style.display = 'block';
            winner = ''; i=0;
            items = ['','' ,'',
              '' , '' , '',
                '','',''];
            removeAllEvent();
        }else if(i === 9){
            result.innerText = "It's tie.";
            document.getElementById('re').style.display = 'block';
            winner = ''; i=0;
            items = ['','' ,'',
              '' , '' , '',
                '','',''];
            removeAllEvent();
            document.getElementById('score').innerHTML=`
                <p>${players[0].name}: ${players[0].score}</p><br>
                <p>${players[1].name}: ${players[1].score}</p><br>
             `;
        }
        if(players[1].name == "Computer" && i!== 0) i++;
        removeEvent(e);
         
    }
    
    const removeEvent = (e) => {
        e.target.removeEventListener('click', displayContent.displayItem);
        };
    const removeAllEvent = () =>{
        Array.from(grids).forEach((element) =>{
            element.removeEventListener('click', displayContent.displayItem);
        });
    }
    const checking = () =>{
        let winCondition = [ [1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];
        for(let i of winCondition){
            let a = i[0] -1; let b=i[1] -1; let c = i[2] -1;
            console.log(a,b,c);
            if(items[a] === items[b] && items[a] === items[c]){
                winner =  items[a];
                break;
            }            
        }
    }

    return {displayItem};
})();
const gameBoard = (() =>{
    const start = (player1,player2) =>{
        players[0] = setPlayers(player1);
        players[1] = setPlayers(player2);
        console.log(players); 
        Array.from(grids).forEach((element) =>{
            element.addEventListener('click', displayContent.displayItem);
            element.style.cursor = "pointer";
        });      
        
        result.innerText = `${players[0].name}'s turn.`
    }
    const restart = () =>{
        players = [];
        Array.from(grids).forEach((element) =>{
            element.innerHTML = '';
        });
        document.getElementById('score').innerHTML = '';
        document.getElementById('option').style.display = 'block';
        document.getElementById('re').style.display = 'none';
        document.getElementById('result').innerText = '';
    }
    const replay = () =>{
        console.log(players);
        Array.from(grids).forEach((element) =>{
            element.innerHTML = '';
            element.addEventListener('click', displayContent.displayItem);
            element.style.cursor = "pointer";
        });

    }
    
    
    
    return {start, restart, replay};
})();
//add event listeners
document.getElementById('setupPlayer').addEventListener('submit', (e)=>{
    let player1 = document.getElementById('player1').value;
    let player2 = document.getElementById('player2').value;
    e.preventDefault();
    gameBoard.start(player1, player2);
    e.target.reset(); 
    e.target.style.display ='none';
});
document.getElementById('restart').addEventListener('click',gameBoard.restart);
document.getElementById('single').addEventListener('click',(e) =>{
    e.target.parentNode.style.display = 'none';
    document.getElementById('setupSingle').style.display = 'block';
});
document.getElementById('double').addEventListener('click', (e) =>{
    e.target.parentNode.style.display = 'none';
    document.getElementById('setupPlayer').style.display = "block";
});
document.getElementById('setupSingle').addEventListener('submit',(e) =>{
    let player = document.getElementById('player').value;
    e.preventDefault();
    gameBoard.start(player,"Computer");
    e.target.reset();
    e.target.style.display = 'none';
});
document.getElementById('replay').addEventListener('click', gameBoard.replay);