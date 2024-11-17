import { Request, Response, Router } from 'express';
import bodyParser from 'body-parser';
import path from 'path';

const router: Router = Router()
const jsonParser = bodyParser.json()

type TUser = {
    name: string;
    email: string;
};

let UserList: TUser[] = [];

router.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join('public', '../index.html'));
    res.sendFile(path.join('public', '../js/main.js'));
})

router.get("/hello", function (req: Request, res: Response) {
    res.json({msg: "Hello world!"});
});

router.get("/echo/:id", function (req: Request, res: Response) {
    res.json({id: req.params.id});
});

router.post("/sum", jsonParser, function (req: Request, res: Response) {

    console.log(req.body)
    let numArray : number[] = req.body.numbers;
    let sum = 0;

    for (let i = 0; i < numArray.length; i++ ) {
        sum += numArray[i];
      }
    res.json({sum: sum});
});

router.post("/users", jsonParser, function (req: Request, res: Response) {
   
    UserList.push(req.body);
    res.json({msg: "User successfully added"});
});

router.get("/users", function (req: Request, res: Response) {
    res.status(201).json(UserList);
});


export default router