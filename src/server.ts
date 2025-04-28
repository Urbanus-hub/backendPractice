import express,{Request,Response} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const port =process.env.PORT;

const app = express();

app.use(cors());

app.get('/',(req:Request,res:Response)=>{
    res.json("Welcome to the server we are happy to have you");
})


app.listen(port,()=>{
console.log(`server running at port ${port}`);
})