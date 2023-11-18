import express from 'express';
import log from '@ajar/marker';
import morgan from 'morgan';
const { PORT, HOST } = process.env;

// console.log(process.env);

const app = express()

app.use(morgan('dev') );
app.use(express.json());



app.get('/',  (req, res) => {
    res.status(200).send('Hello Express!')
})

app.get('/users', (req, res,next) => {
    res.status(200).send('Get all Users')
})

app.get('/search/:food/:town', (req, res,next) => {
    const food = req.params.food;
    const town = req.params.town; 
    res.status(200).send(`Searching for ${food} in ${town}`);
})
app.get('/search', (req, res,next) => {
    const food = req.query.food;
    const town = req.query.town; 
    res.status(200).send(`Searching for ${food} in ${town}`);
})

app.post('/search', (req, res,next) => {

    console.log(req.body);
    //res.send("hello");
    const {food,city} = req.body;
    res.status(200).send(`Searching for ${food} in ${city}`);
})
// '/search?food=burger&town=ashdod'


app.listen(PORT, HOST,  ()=> {
    log.magenta(`🌎  listening on`,`http://${HOST}:${PORT}`);
});


//------------------------------------------
//         Express Echo Server
//------------------------------------------
/*
### Challenge instructions

1. Install the `morgan` 3rd party middleware  
use the middleware in your app:  
         `app.use( morgan('dev') );`

2.  Define more routing functions that use
    - `req.query` - access the querystring part of the request url
    - `req.params` - access dynamic parts of the url
    - `req.body` - access the request body of a **POST** request
        
        in each routing function you want to pass some values to the server from the client
        and echo those back in the server response

3. return api json response
4. return html markup response
5. return 404 status with a custom response to unsupported routes


*/
