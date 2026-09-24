import {queryTable, updateTable} from './initializeDb.mjs'

const MAX_DIGITS = 4;
const MAX_DEX_NUM = 1025;
const usedCheck = [0,0,0,0];

let mons = [];
let moves = [];
let abilities = [];
let items = [];
let natures = [
    "Hardy (Neutral)", "Lonely (+Atk, -Def)", "Adamant (+Atk, -SpAtk)", "Naughty (+Atk, -SpDef)", "Brave (+Atk, -Speed)", "Bold (+Def, -Atk)", "Docile (Neutral)", "Impish (+Def, -SpAtk)", "Lax (+Def, -SpDef)", "Relaxed (+Def, -Speed)", "Modest (+SpAtk, -Atk)", "Mild (+SpAtk, -Def)", "Bashful (Neutral)", "Rash (+SpAtk, -SpDef)", "Quiet (+SpAtk, -Speed)", "Calm (+SpDef, -Atk)", "Gentle (+SpDef, -Atk)", "Careful (+SpDef, -SpAtk)", "Quirky (Neutral)", "Sassy (+SpDef, -Speed)", "Timid (+Speed, -Atk)", "Hasty (+Speed, -Def)", "Jolly (+Speed, -SpAtk)", "Naive (+Speed, -SpDef)", "Serious (Neutral)"
]

let randomMons = [];
let randomMoves = [];
let randomAbilities = [];

let team = [];

class selectedMon {
    // name, type, ability, move1, move2, move3, move4
  constructor(name, type1, type2, nature, item, ability, move1, move2, move3, move4) {
    this.name = name;
    this.type1 = type1;
    this.type2 = type2;
    this.nature = nature;
    this.item = item;
    this.ability = ability;
    this.move1 = move1;
    this.move2 = move2;
    this.move3 = move3;
    this.move4 = move4;
  }
}

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

function initTeam() {
    for(let i = 0; i < 6; i++){
        team.push(new selectedMon('-', '-', '-', '-', '-', '-', '-', '-', '-', '-'));
    }
}

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
    switch(prop){
        case "name":
            team[slot - 1].name = value;
            break;
        case "type1":
            team[slot - 1].type1 = value;
            break;
        case "type2":
            team[slot - 1].type2 = value;
            break;
        case "nature":
            team[slot - 1].nature = value;
            break;
        case "item":
            team[slot - 1].item = value;
            break;
        case "ability":
            team[slot - 1].ability = value;
            break;
        case "move1":
            team[slot - 1].move1 = value;
            break;
        case "move2":
            team[slot - 1].move2 = value;
            break;
        case "move3":
            team[slot - 1].move3 = value;
            break;
        case "move4":
            team[slot - 1].move4 = value;
            break;
    }
}




initTeam();
updateTeam("type1", "Grass", 2);
updateTeam("name", "Galvantula", 4)
//await fetchDataFromDb();
//console.log(await randomizeMons(2));
//console.log(randomizeMoves(3));
//console.log(randomizeAbilities(4));

//randomizeMons(1);

