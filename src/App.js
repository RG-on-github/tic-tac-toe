import "./App.css";
import { useState } from 'react';

const winning_patterns = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
]

function addX(id) {
    let box = document.querySelector(`#${id}`);
    box.style.color = 'blue';
    box.innerText = "X";
}

function addO(id) {
    let box = document.querySelector(`#${id}`);
    box.style.color = 'red';
    box.innerText = "O";
}

let X = [], O = [];
let flag = 0;

let checkForWinX = () => {
    for (let i=0;i<winning_patterns.length;i++){
        if (winning_patterns[i].every(element => X.includes(element))){
            return true;
        };
    }
}

let checkForWinO = () => {
    for (let i=0;i<winning_patterns.length;i++){
        if (winning_patterns[i].every(element => O.includes(element))){
            return true;
        };
    }
}

// function endIt(boxes){
//     console.log("hi");
//     for(let i=0;i<boxes.length;i++){
//         boxes[i].removeAttribute("onclick");
//     }
// }

let main_flag = 1;
function button_clicked(id, count, setCount) {

    if (main_flag){

        if (count === 0){
            if (flag === 0){
                X.push(parseInt(id[id.length - 1]));
                addX(id);
                flag = 1;
                setCount(count + 1);
            }else{
                O.push(parseInt(id[id.length - 1]));
                addO(id);
                flag = 0;
                setCount(count + 1);
            }
            if (X.length >= 3){
                if (checkForWinX(X, O)){
                    let result = document.querySelector("#result");
                    result.innerText = "X WON";
                    result.style.color = "blue";
                    main_flag = 0;
                }
            }
            if (O.length >= 3){
                if (checkForWinO(X, O)){
                    let result = document.querySelector("#result");
                    result.innerText = "O WON";
                    result.style.color = "red";
                    main_flag = 0;
                }
            }
        }else{
            return;
        }
    }
}

function Box({id}) {
    const [count, setCount] = useState(0);
    return <button className="box" id={id} onClick={() => button_clicked(id, count, setCount)}></button>
}

export default function App() {
    return (
        <div className="main_container">
            <h1>Tic-Tac-Toe</h1>
            <div className="container">
                <Box id = "box-1"/>
                <Box id = "box-2"/>
                <Box id = "box-3"/>
                <Box id = "box-4"/>
                <Box id = "box-5"/>
                <Box id = "box-6"/>
                <Box id = "box-7"/>
                <Box id = "box-8"/>
                <Box id = "box-9"/>
            </div>
            <div id="result"></div>
        </div>
    );
}