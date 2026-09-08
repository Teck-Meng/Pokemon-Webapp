const client = require("./db");

const total_mons = 1025;
const format = require("pg-format");


async function addPokemon(total_mons) {
  try {
    await client.connect();

    const query = `
                    INSERT INTO pokemon (id, name, moves, abilities, type1, type2, freq)
                    VALUES ($1, $2, $3, $4, $5, $6, $7)
                    ON CONFLICT (id) DO NOTHING
                    `;

    for (let dex_num = 1; dex_num <= total_mons; dex_num++) {
        let url = "https://pokeapi.co/api/v2/pokemon/" + dex_num;
        const response = await fetch(url);
        const data = await response.json();

        const name = data.name;
        const abilities = data.abilities.map(item => item.ability.name);
        const moves = data.moves.map(item => item.move.name);
        const types = data.types.map(item => item.type.name);
        const type1 = types[0];
        console.log(name);
        let type2 = null;
        if(types.length != 1){
            type2 = types[1];
        }

        const values = [dex_num, name, moves, abilities, type1, type2, 0];

        await client.query(query, values);
        //console.log(moves);
    }
    

    console.log("pokemon updated successfully");
  } catch (err) {
    console.error("Error adding pokemon:", err);
  } finally {
    await client.end();
  }
}

async function addMoves() {
    

}

async function addAbility() {
  const url = "https://pokeapi.co/api/v2/ability?limit=1000";

  // Get all abilities
  const response = await fetch(url);
  const data = await response.json();

  // Get individual ability data concurrently
  const abilityData = await Promise.all(
    data.results.map(async (result) => {
      const response = await fetch(result.url);
      return response.json();
    })
  );

  // Create a list containing only main-series ability names
  const mainSeriesAbilities = abilityData
    .filter(ability => ability.is_main_series === true)
    .map(ability => ability.name);

  if (mainSeriesAbilities.length === 0) {
    return;
  }

  // Create PostgreSQL placeholders
  const placeholders = mainSeriesAbilities
    .map((_, index) => `($${index + 1})`)
    .join(", ");

  const query = `
    INSERT INTO abilities (ability)
    VALUES ${placeholders}
    ON CONFLICT (ability) DO NOTHING;
  `;
  console.log("Executing query:");
    console.log(query);
    console.log("Values:", mainSeriesAbilities);
}

async function sendAbilityToPg(abilities){
    const result = await client.query(query, abilities);

    console.log("Insert complete.");
    console.log("Rows inserted:", result.rowCount);
}




async function queryTable(selection, table_name) {
    try{
        await client.connect();
        const result = await client.query(
            format("SELECT * FROM %I", table_name)
        );
        console.log(result.rows);
    }
    catch (err) {
        console.error("Error querying data: ", err);
    }
    finally{
        await client.end();
    }
}

async function resetTable(table_name) {
    try{
        await client.connect();
        const query = format(
                        "TRUNCATE TABLE %I RESTART IDENTITY",
                        table_name
                        );
        await client.query(query);
    }
    catch (err) {
        console.error("Error removing data: ", err);
    }
    finally{
        await client.end();
    }
}
addAbility();
//addPokemon(total_mons);
//queryTable("*","abilities");
//resetTable("abilities");