import express from 'express';
import log from '@ajar/marker';
import morgan from 'morgan';
import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';


const { PORT, HOST } = process.env;

// console.log(process.env);
//tasks my db is json file 
const app = express()

app.use(morgan('dev') );
app.use(express.json()); //doing req ,res ,next


async function appendToTasks(newData) {
    let tasksData = [];
  
    try {
      const existingData = await fs.readFile('./db/tasks.json', 'utf8');
      if (existingData.trim() !== '') {
        tasksData = JSON.parse(existingData);
      }
    } catch (readError) {
      if (readError.code !== 'ENOENT') {
        console.error('Error reading file:', readError.message);
      }
    }
  
    tasksData.push(newData);
  
    const jsonData = JSON.stringify(tasksData, null, 2);
  
    await fs.writeFile('./db/tasks.json', jsonData, 'utf8');
    console.log('Data has been appended to ./db/tasks.json');
  }
  
  app.post('/api/tasks', async (req, res) => {
    try {
      const { title, description } = req.body;
      const uniqueId = uuidv4();
      const timestamp = String(Date.now());
      const newData = {
        id: uniqueId,
        title,
        description,
        timestamp,
      };
  
      await appendToTasks(newData);
  
      res.status(200).send(`Appending made for ${title} and ${description}`);
    } catch (err) {
      console.error('Error writing file:', err.message);
      res.status(500).send('Internal Server Error');
    }
  });


app.listen(PORT, HOST,  ()=> {
    log.magenta(`🌎  listening on`,`http://${HOST}:${PORT}`);
});
