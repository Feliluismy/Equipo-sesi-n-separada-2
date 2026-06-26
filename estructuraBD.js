use TransJugadores
db.createCollection("jugadores")
db.createCollection("clubes")
db.createCollection("transferencias")

db.jugadores.insertMany([
   { _id: 1, nombre: "Lionel Messi", edad: 36, posicion: "Delantero", nacionalidad: "Argentina", clubId: 2 },
   { _id: 2, nombre: "Cristiano Ronaldo", edad: 39, posicion: "Delantero", nacionalidad: "Portugal", clubId: 3 },
   { _id: 3, nombre: "Kylian Mbappé", edad: 27, posicion: "Delantero", nacionalidad: "Francia", clubId: 1 },
   { _id: 4, nombre: "Erling Haaland", edad: 25, posicion: "Delantero", nacionalidad: "Noruega", clubId: 4 },
   { _id: 5, nombre: "Kevin De Bruyne", edad: 34, posicion: "Mediocampista", nacionalidad: "Bélgica", clubId: 4 }
 ])

db.clubes.insertMany([
   { _id: 1, nombre: "Paris Saint-Germain", pais: "Francia", liga: "Ligue 1" },
   { _id: 2, nombre: "Inter Miami", pais: "EEUU", liga: "MLS" },
   { _id: 3, nombre: "Al Nassr", pais: "Arabia Saudita", liga: "Saudi Pro League" },
    { _id: 4, nombre: "Manchester City", pais: "Inglaterra", liga: "Premier League" }
 ])

db.transferencias.insertOne(
   {_id: 1,
    jugadorId: 1,          
    IdclubOrigen: 1,       
    IdclubDestino: 2,      
    monto: 50000000
   })

db.transferencias.insertMany(
   [
   {_id: 2,
    jugadorId: 3,          
    IdclubOrigen: 1,       
    IdclubDestino: 4,      
    monto: 180000000
   },
   {_id: 3,
    jugadorId: 5,          
    IdclubOrigen: 4,       
    IdclubDestino: 3,      
    monto: 90000000
   },
   {_id: 4,
    jugadorId: 4,          
    IdclubOrigen: 4,       
    IdclubDestino: 1,      
    monto: 280000000
   }]
)
db.clubes.find()
db.transferencias.find()


db.transferencias.aggregate([
  {$sort: { monto: -1 }},
  {$limit: 1 },
  {$lookup: {
      from: "jugadores",
      localField: "jugadorId",
      foreignField: "_id",
      as: "datos_jugador"
    }
  },
  { 
    $project: {
      _id: 0,
      nombre_jugador: "$datos_jugador.nombre",
      monto_transferencia: "$monto",
      equipo_origen: "$IdclubOrigen",
      equipo_destino: "$IdclubDestino"
    }
  }
])


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