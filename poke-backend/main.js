import {queryTable, updateTable} from './initializeDb.mjs'

const MAX_DIGITS = 4;
const MAX_DEX_NUM = 1025;
const usedCheck = [0,0,0,0];

let mons = [];
let moves = [];
let abilities = [];
let items = [];

let randomMons = [];
let randomMoves = [];
let randomAbilities = [];

let team = [];

let generateNumArray = (num) => {
    const ARRAY_SIZE = 4;
    const result = [];
    let index = 1000;
    for(let i = 0; i < ARRAY_SIZE; i++){
        result[i] = Math.floor((num / index) % 10);
        index /= 10;
    }
    return result;
};

async function fetchDataFromDb(){
    mons = await queryTable("pokemon");
    moves = await queryTable("moves");
    abilities = await queryTable("abilities");
    items = await queryTable("items");
}


async function randomizeMons(num){
    const len = mons.length;
    let res = [];
    let choice = 0;
    for(let i = 0; i < num; i++){
        choice = Math.floor(Math.random() * len) + 1;
        mons[choice].freq += 1;
        try{
            await updateTable(mons[choice].freq + 1, choice);
        }
        catch(err){
            console.log("randomize mons error: " + err);
        }
        res.push(mons[choice]);
    }
    randomMons = res;
    return res;
}

function randomizeMoves(num){
    const len = moves.length;
    let res = [];
    let choice = 0;
    for(let i = 0; i < num; i++){
        choice = Math.floor(Math.random() * len) + 1;
        res.push(moves[choice]);
    }
    randomMoves = res;
    return res;
}

function randomizeAbilities(num){
    const len = abilities.length;
    let res = [];
    let choice = 0;
    for(let i = 0; i < num; i++){
        choice = Math.floor(Math.random() * len) + 1;
        res.push(abilities[choice]);
    }
    randomAbilities = abilities;
    return res;
}

async function updateTeam(prop, value, slot){
    // name, type, ability, move1, move2, move3, move4
}





await fetchDataFromDb();
console.log(await randomizeMons(2));
console.log(randomizeMoves(3));
console.log(randomizeAbilities(4));

//randomizeMons(1);

