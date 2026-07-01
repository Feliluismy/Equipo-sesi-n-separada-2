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
    console.log("Listado de Jugadores",jugadores);

    const rankingEdad = await db.collection("jugadores").aggregate([
      { $sort: { edad: -1 } },
      { $project: { _id:0, nombre: 1, edad: 1 } }, 
      {$limit:3}
    ]).toArray();

    console.log("Ranking por edad:", rankingEdad);

    const totalPorClub = await db.collection("transferencias").aggregate([
      { $group: { _id: "$IdclubDestino", totalGastado: { $sum: "$monto" } } },
      { $lookup: {
          from: "clubes",
          localField: "_id",
          foreignField: "_id",
          as: "clubDestino"
      }},
      { $unwind: "$clubDestino" }, 
      { $project: { totalGastado: 1, "clubDestino.nombre": 1 } }
    ]).toArray();
    console.log("Total gastado por club:", JSON.stringify(totalPorClub, null, 2));
    console.log();

    const jugadorMasCaro = await db.collection("transferencias").aggregate([
      { $sort: { monto: -1 } },
      { $limit: 1 },
      {
          $lookup: {
              from: "jugadores",
              localField: "jugadorId",
              foreignField: "_id",
              as: "datos_jugador"
          }
      },
      {
          $lookup: {
              from: "clubes",
              localField: "IdclubOrigen",
              foreignField: "_id",
              as: "origen"
          }
      },
      {$lookup: {
              from: "clubes",
              localField: "IdclubDestino",
              foreignField: "_id",
              as: "destino"
          }
      },
      {$unwind: "$origen"},
      {$unwind: "$destino"},
      {
          $project: {
              _id: 0,
              nombre_jugador: "$datos_jugador.nombre",
              monto_transferencia: "$monto",
              equipo_origen: "$origen.nombre",
              equipo_destino: "$destino.nombre"
          }
      }
  ])
  .toArray();

  console.log("Jugador mas caros:", jugadorMasCaro);


  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.close();
    }
}


main();