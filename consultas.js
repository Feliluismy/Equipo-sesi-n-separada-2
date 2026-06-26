const { MongoClient } = require("mongodb");

async function main() {
  const uri = "mongodb://localhost:27017";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Conectado a MongoDB");

    const db = client.db("TransJugadores");

    // Mostrar todos los jugadores
    const jugadores = await db.collection("jugadores").find().toArray();
    console.log("Lista de jugadores:");
    console.log(jugadores);

    const rankingEdad = await db.collection("jugadores").aggregate([
      { $sort: { edad: -1 } },
      { $project: { _id:0, nombre: 1, edad: 1 } }, 
      {$limit:3}
    ]).toArray();
    console.log(" Ranking por edad:", rankingEdad);


  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.close();
    }
}


main();