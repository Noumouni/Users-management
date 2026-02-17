
import http from 'node:http';
import { Json } from "./utils/resposes.js";
import {listUsers} from "./users/users.controller.js"

const listener = (request, response) => {
    if (request.url === "/users")
    return listUsers(request, response);
  }
  return Json(response, 404, {
    message : "Not found"
  })

const server = http.createServer(listener);
server.listen(3000);
console.log('server running at http://127.0.0.1:3000/');

// Nous avons crée un serveur qui ecoute sur le port 3000
//importer  http Api node qui va nous aider a crée un server