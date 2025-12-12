const MAX_DIGITS = 4;
const MAX_DEX_NUM = 1025;
const usedCheck = [0,0,0,0];

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

let permutateDexNumList = (dex_num_array, usedCheck, curNum, results, depth) => {
    if(depth == 4){
        if(curNum <= MAX_DEX_NUM){
            results[results.length] = curNum;
        }
        return results;
    }

    for(let i = 0; i < MAX_DIGITS; i++){
        if(usedCheck[i] == 0){
            usedCheck[i] = 1;
            curNum = curNum * 10 + dex_num_array[i];
            permutateDexNumList(dex_num_array, usedCheck, curNum, results, depth + 1);
            curNum = (curNum - dex_num_array[i]) / 10;
            usedCheck[i] = 0;
        }
    }

    return results;
};

async function fetchPokemonFromApi(dex_num){
    let res = "";
    let url = "https://pokeapi.co/api/v2/pokemon/" + dex_num;
    const response = await fetch(url);
    const json = await response.json();
};

async function compilePokemonPerm(permList){
    const resultList = [];
    for(let i = 0; i < permList.length; i++){
        const res = await fetchPokemonFromApi(permList[i]);
        const temp = await res.json();
        resultList[i] = await temp.name;
        console.log(resultList[i]);
    }
};

let mainPermute = (dex_num) => {
    const numArray = generateNumArray(dex_num);
    const permDexNumList = permutateDexNumList(numArray, usedCheck, 0, [], 0);
    const res = compilePokemonPerm(permDexNumList);
};

const list = [1, 69, 67, 493, 865, 1014];
console.log(mainPermute(369));

