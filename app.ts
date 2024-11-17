/*
Author: Kalle Liljeström
*/

import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import path from 'path';

const app = express()
const port = 3000
const jsonParser = bodyParser.json()
app.use(express.static('public'))

type TUser = {
    name: string;
    email: string;
};

let UserList: TUser[] = [];

app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join('public', '../index.html'));
    res.sendFile(path.join('public', '../js/main.js'));
})

app.get("/hello", function (req: Request, res: Response) {
    res.json({msg: "Hello world"});
});

app.get("/echo/:id", function (req: Request, res: Response) {
    res.json({id: req.params.id});
});

app.post("/sum", jsonParser, function (req: Request, res: Response) {

    console.log(req.body)
    let numArray : number[] = req.body.numbers;
    let sum = 0;

    for (let i = 0; i < numArray.length; i++ ) {
        sum += numArray[i];
      }
    res.json({sum: sum});
});

app.post("/users", jsonParser, function (req: Request, res: Response) {
   
    UserList.push(req.body);
    res.json({msg: "User successfully added"});
});

app.get("/users", function (req: Request, res: Response) {
    res.status(201).json(UserList);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

