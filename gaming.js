//UI var
let grids = Array.from(document.getElementsByClassName('child'));
let result = document.getElementById('result');
//global var
let player1, player2;
//set players
const setPlayers = (name) =>{
    let score = 0;
    return {name, score};
};
//module patterns
//set up the display for the game
const displayContent = (() =>{
    let items = ['','' ,'',
    '' , '' , '',
    '','',''];
    let i = 1;
    const displayItems =(e) =>{
        let index = Number(e.target.dataset.key);
        if(i%2 !== 0 && i<=9){
            items[index -1] = 'x';
            e.target.innerHTML= "<p>x</p>";
            result.innerText= `${player2.name}'s turn.`;
            if(player2.name === "Computer"){
                computerPlay();
            }
        } else { items[index -1] = 'o';
            e.target.innerHTML = "<p>o</p>";
            result.innerText = `${player1.name}'s turn.`  ;      
        }
        console.log(items);
        checkingWinning();
        removeEvent(e);
    }
    const computerPlay = () =>{
        let place = Math.floor(Math.random() * 9);
        while(items[place] !== "" && i<9){
                    console.log(place);
                    place = Math.floor(Math.random() *9);
                    
        }
        i++;                
        items[place] = 'o';
        grids[place].innerHTML =  "<p>o</p>";
        result.innerText = 'Your turn.' ;
        grids[place].removeEventListener('click', displayContent.displayItems);
    }    
    const checkingWinning =() =>{
        let winCondition = [ [1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];
        let winner;
        for(let j of winCondition){
            let a = j[0] -1; let b=j[1] -1; let c = j[2] -1;
            console.log(a,b,c);
            if(items[a] === items[b] && items[a] === items[c]){
                winner =  items[a];
                break;
            }         
        }
        if(winner){
            switch(winner){
                case 'x': result.innerText = `${player1.name} is winner`; 
                player1.score += 1;
                break;
                case 'o': result.innerText = `${player2.name} is winner`;
                player2.score += 1;
            }     
            removeAllEvent();  
            console.log(player1, player2); 
            displayScore();
            document.getElementById('re').style.display = 'block';
        }else if(i >= 9){
            result.innerText = "It's tie!"; i=0;
            removeAllEvent();
            console.log(player1, player2);
            displayScore();
            document.getElementById('re').style.display = 'block';
        }
        i++;
    }
    const displayScore = () =>{
        document.getElementById('score').innerHTML=`
            <p>${player1.name}: ${player1.score}</p>
            <p>${player2.name}: ${player2.score}</p>
            `;
    }
    const removeEvent = (e) => {
        e.target.removeEventListener('click', displayContent.displayItems);
        };
    const removeAllEvent = () =>{
        grids.forEach((element) =>{
            element.removeEventListener('click', displayContent.displayItems);
            element.classList.remove('active');
        });
    }
    const resetGame = () =>{
        i=0;
        removeAllEvent();
        items = ['','' ,'',
    '' , '' , '',
    '','',''];
    grids.forEach( (element) => { element.innerHTML = '';});
    result.innerText = '';
    }   
    return { displayItems, resetGame}
})();
//set up functions for buttons
const gameBoard = (() =>{
    const startDouble = () =>{
        player1 = setPlayers(document.getElementById('player1').value);
        player2 = setPlayers(document.getElementById('player2').value);
        addEventToGrids();
        result.innerText = `${player1.name}'s turn.`;        
    }
    const startSingle = () =>{
        player1 = setPlayers(document.getElementById('player').value);
        player2 = setPlayers("Computer");
        addEventToGrids();
        result.innerText = 'Your turn.';        
    } 
    const addEventToGrids =() =>{
        grids.forEach((element) =>{
            element.addEventListener('click', displayContent.displayItems);
            element.classList.add('active');
        }); 
    }
    const restart =() =>{
        displayContent.resetGame();
        player1 = {};
        player2 = {};
        document.getElementById('option').style.display = 'block';
        document.getElementById('re').style.display = 'none';
        document.getElementById('result').innerText = '';
        document.getElementById('score').innerHTML = '';
    } 
    const replay =() =>{
        displayContent.resetGame();
        addEventToGrids();
        result.innerText = `${player1.name}'s turn.`;
        document.getElementById('re').style.display = 'none';
    }
    return { startDouble, startSingle, restart, replay};
})();
//add event listeners
document.getElementById('setupPlayer').addEventListener('submit',(e)=>{
    e.preventDefault();
    gameBoard.startDouble();
    e.target.reset();
    e.target.style.display = 'none';
} );
document.getElementById('restart').addEventListener('click',gameBoard.restart);
document.getElementById('single').addEventListener('click',(e) =>{
    e.target.parentNode.style.display = 'none';
    document.getElementById('setupSingle').style.display = 'block';
});
document.getElementById('double').addEventListener('click', (e) =>{
    e.target.parentNode.style.display = 'none';
    document.getElementById('setupPlayer').style.display = "block";
});
document.getElementById('setupSingle').addEventListener('submit', (e) =>{
    e.preventDefault();
    gameBoard.startSingle();
    e.target.reset();
    e.target.style.display = 'none';
});
document.getElementById('replay').addEventListener('click', gameBoard.replay);