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


let permutateDexNum = (dex_num_array) => {
    const results = [];

};

let fetchPokemonFromApi = (dex_num) => {
    let url = "https://pokeapi.co/api/v2/pokemon/" + dex_num;
    pokemonData = fetch(url).then((response) => response.json());
    pokemonData.then((json) => console.log(json));
};
