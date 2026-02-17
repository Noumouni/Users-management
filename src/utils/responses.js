
export function Json (response, statut, data){
  response.writeHead(status,{'content-type': 'application/json'}); 
  response.end(JSON.stringify(data)); 
}