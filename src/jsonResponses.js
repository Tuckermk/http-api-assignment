

function respondJSON(request, response, status, object) {
   const content = JSON.stringify(object);
   console.log(content);

   response.writeHead(status, {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(content, 'utf8'),
   });
   response.write(content);
   response.end();
};

function respondXML(request,response, status, object){
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${object.message}</message>`;
    responseXML = `${responseXML} <id>${object.id}</id>`;
    responseXML = `${responseXML} </response>`;
   console.log(respondXML.toString());

   response.writeHead(status, {
    'Content-Type': 'text/xml',
    'Content-Length': Buffer.byteLength(responseXML, 'utf8'),
  });
  response.write(responseXML);
  response.end();
};



function success(request, response){ //success 200
   const responseJSON = {
      message: 'This is a success',
      id: '200'
   };
   if (request.acceptedTypes[0] === 'text/xml') {
    return respondXML(request, response, 200, responseJSON);
  }
   return respondJSON(request,response,200,responseJSON);
};

function badRequest(request,response){ //bad request 400 & 200
   const responseJSON = {
      message: 'Request is valid',
      id: '200'
   };

   if(!request.query.valid || request.query.valid !== 'true'){
      responseJSON.message = 'missing required parameter';
      responseJSON.id = '400'
      if (request.acceptedTypes[0] === 'text/xml') {
         return respondXML(request, response, 400, responseJSON);
      }
      return respondJSON(request,response,400,responseJSON);
   };

   if (request.acceptedTypes[0] === 'text/xml') {
    return respondXML(request, response, 200, responseJSON);
  }
   return respondJSON(request,response,200,responseJSON)
};

function unauthorized(request,response){ //unauthorized 401 & 200
   const responseJSON = {
      message: 'Request has a log in',
      id: '200'
   }

   if(request.query.loggedIn !== 'yes'){
      responseJSON.message = 'Request doesnt have a login'
      responseJSON.id = '401'
      if (request.acceptedTypes[0] === 'text/xml') {
         return respondXML(request, response, 401, responseJSON);
      }
      return respondJSON(request,response,401,responseJSON)
   };
   if (request.acceptedTypes[0] === 'text/xml') {
    return respondXML(request, response, 200, responseJSON);
  }
   return respondJSON(request, response, 200, responseJSON);  
};

function forbidden(request, response){ //forbidden 403
   const responseJSON = {
      message: 'this is forbidden, begone',
      id: '403'
   };

   if (request.acceptedTypes[0] === 'text/xml') {
    return respondXML(request, response, 403, responseJSON);
  }
   return respondJSON(request, response, 403, responseJSON);
};

function internal(request,response){ //server error 500
   const responseJSON = {
      message: 'Sever error encountered',
      id: '500'
   };

   if (request.acceptedTypes[0] === 'text/xml') {
    return respondXML(request, response, 500, responseJSON);
  }
   return respondJSON(request,response,500,responseJSON);
};

function notImplemented(request,response){ //not implemented 501
   const responseJSON = {
      message: 'not yet implemented',
      id: '501'
   };

   if (request.acceptedTypes[0] === 'text/xml') {
    return respondXML(request, response, 501, responseJSON);
  }
   return respondJSON(request, response, 501, responseJSON);
}

function notFound(request,response){ //error 404
      
   const responseJSON = {
      message: 'does not exist',
      id: '404'
   };
   if (request.acceptedTypes[0] === 'text/xml') {
    return respondXML(request, response, 404, responseJSON);
  }
   return respondJSON(request, response, 404, responseJSON);
};


module.exports = {
   success,
   badRequest,
   unauthorized,
   forbidden,
   internal,
   notImplemented,
   notFound
}