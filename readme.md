
# Express Echo Server

### Challenge instructions

1. Clone this repo, install dependencies, and run the `dev` script to get a first orientation.
1. Install another dependency - the `morgan` 3rd party middleware and use the middleware in your app:  
         `app.use( morgan('dev') );`

1.  Define more routing functions that use
    - `req.query` - access the querystring part of the request url
    - `req.params` - access dynamic parts of the url
    - `req.body` - access the request body of a **POST** request
        
        in each routing function you want to pass some values to the server from the client
        and echo those back in the server response

1. return api json response
1. return html markup response
1. return 404 status with a custom response to unsupported routes
