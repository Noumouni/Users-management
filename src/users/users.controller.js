import {getUsers} from "./users.service.js";
import {Json} from "../utils/response.js";

 function listUsers (request, response)  {
    if (request.method !== 'GET'){
        return Json(response, 405, 
        { message : " Method Not ALLOW"} 
    )}
     }
    const users = getUsers();
    return Json(response, 200, {data: users}); 
  
  
