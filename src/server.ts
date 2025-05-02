import express,{Request,Response} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {Pool} from 'pg';
dotenv.config();

const port =process.env.PORT;


const pool=new Pool({
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    host:process.env.DB_HOST,
    port:Number(process.env.DB_PORT),
    database:process.env.DB_NAME
})
const app = express();
app.use(cors());
app.use(express.json());
  

app.get('/',(req:Request,res:Response)=>{
    res.send("Welcome to our site we make our customers rich");
})
//lets create a new user
app.get('/api/user',async(req:Request,res:Response)=>{
    try {
        const getUsers=await pool.query("select * from public.users");
        res.status(201).json(
            {
             message:"Users fetched succesfully",
             payload:getUsers.rows[0]
            }
        )
    } catch (error) {
        res.status(500).json({
            message:"Internal server error",
            error:error
         })
    }
})
app.post('/api/user',async(req:Request,res:Response)=>{
    try{
      const{name,email,password}=req.body;
      const checkemail= await pool.query("SELECT * FROM public.users WHERE EMAIL=$1",[email]);
      if(checkemail.rows.length>0){
        res.status(400).json({
            message:"user Already exists"
        })
        return;
      }
      const insertUser=await pool.query("insert into users(name,email,password) values($1,$2,$3) returning*",[name,email,password]);
      res.status(201).json({
        message:"User added succesfully",
        payload:insertUser.rows[0]
      })

    }catch(error){
     res.status(500).json({
        message:"Internal server error"
       
     })
     console.log(error);
     }
    }
)
app.listen(port,()=>{
console.log(`server running at port ${port}`);
})