import dotenv from "dotenv";
import { MongoClient } from "mongodb";
dotenv.config();

let db;
const mongoClient = new MongoClient(process.env.URL_MONGO);
try {
  await mongoClient.connect();
  db = mongoClient.db(process.env.BANCO_WALLET);
  console.log("Conexão com o banco de dados estabelecida");
} catch (e) {
  console.log("Erro ao se conectar ao banco de dados", e);
}
export default db;