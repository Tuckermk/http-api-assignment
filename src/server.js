const http = require('http');
const htmlHandler = require('./htmlResponse.js');
const jsonHandler = require('./jsonResponses.js');
const port = process.env.PORT || process.env.NODE_PORT || 3000;


const urlStruct = {
   '/': htmlHandler.getIndex,
   '/style.css': htmlHandler.getCSS,

   '/success': jsonHandler.success,
   '/badRequest': jsonHandler.badRequest,
   '/unauthorized': jsonHandler.unauthorized,
   '/forbidden': jsonHandler.forbidden,
   '/internal': jsonHandler.internal,
   '/notImplemented': jsonHandler.notImplemented,
   notfound: jsonHandler.notFound,
}

function onRequest(request,response){
   const protocol = request.connection.encrypted ? 'https' : 'http';
   const parsedURL = new URL(request.url, `${protocol}://${request.headers.host}`);

   
   request.acceptedTypes = request.headers.accept.split(',');
   request.query = Object.fromEntries(parsedURL.searchParams);

   if(urlStruct[parsedURL.pathname]){
      urlStruct[parsedURL.pathname](request,response);
   }
   else{
      urlStruct.notfound(request,response);
   }
};

http.createServer(onRequest).listen(port);