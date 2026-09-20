import { client } from "./db.js";

const total_mons = 1025;
import format from "pg-format";

await client.connect();

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
    await client.connect();

    const url = "https://pokeapi.co/api/v2/move?limit=5000";

    try {
        const response = await fetch(url);
        const data = await response.json();

        const myData = await Promise.all(
            data.results.map(async (result) => {
                const response = await fetch(result.url);
                return response.json();
            })
        );

        const moveData = myData.map(move => ({
            name: move.name,
            type: move.type.name
        }));

        for (const move of moveData) {
            if (!move.name) {
                continue;
            }

            await client.query(
                `INSERT INTO moves (move, type)
                 VALUES ($1, $2)
                 ON CONFLICT (move) DO NOTHING`,
                [move.name, move.type]
            );
        }

        console.log("Moves added successfully");
    } catch (err) {
        console.error("Add move error:", err);
    }

    await client.end();
}


async function addAbility() {
    await client.connect();
    const url = "https://pokeapi.co/api/v2/ability?limit=1000";

    try {
        const response = await fetch(url);
        const data = await response.json();

        const abilityData = await Promise.all(
            data.results.map(async (result) => {
            const response = await fetch(result.url);
            return response.json();
            })
        );

        const mainSeriesAbilities = abilityData
            .filter(ability => ability.is_main_series === true)
            .map(ability => ability.name);

        console.log("Main series abilities:", mainSeriesAbilities);
        console.log("Number of abilities:", mainSeriesAbilities.length);

        if (mainSeriesAbilities.length === 0) {
            console.log("No abilities to insert.");
            return;
        }

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

        const result = await client.query(query, mainSeriesAbilities);

        console.log("Insert complete.");
        console.log("Rows inserted:", result.rowCount);

    } catch (error) {
    console.error("Error adding abilities:", error);
    }
    finally{
    await client.end();
    }
}

async function sendAbilityToPg(abilities){
    const result = await client.query(query, abilities);

    console.log("Insert complete.");
    console.log("Rows inserted:", result.rowCount);
}




export async function queryTable(table_name) {
    try{
        const result = await client.query(
            format("SELECT * FROM %I", table_name)
        );
        return result.rows;
    }
    catch (err) {
        console.error("Error querying data: ", err);
    }
   
}

export async function closeDbConnection(){
    await client.end();
}

export async function updateTable(updatedVal ,choice) {

    try {
        const text = 'UPDATE pokemon SET freq = $1 WHERE id = $2 RETURNING *;';
        const values = [updatedVal, choice];
        const res = await client.query(text, values);
        /* ADD COLUMN abilities TEXT[] NOT NULL DEFAULT '{}',
            ADD COLUMN type1 VARCHAR(100) NOT NULL,
            ADD COLUMN type2 VARCHAR(100) 
            ADD CONSTRAINT moves_move_unique UNIQUE (move);*/
    }
    catch (err) {
        console.error("Error altering table: ", err);
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

//console.log(await queryTable("pokemon"));
//addMoves();
//addAbility();
//addPokemon(total_mons);
//resetTable("abilities");