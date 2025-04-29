import express,{Request,Response} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const port =process.env.PORT;

const app = express();

app.use(cors());
const data=[
    {
      "id": 1,
      "name": "Wireless Mouse",
      "description": "Ergonomic wireless mouse with adjustable DPI.",
      "price": 25.99,
      "category": "Electronics",
      "inStock": true
    },
    {
      "id": 2,
      "name": "Bluetooth Headphones",
      "description": "Noise-canceling over-ear headphones with long battery life.",
      "price": 89.99,
      "category": "Audio",
      "inStock": true
    },
    {
      "id": 3,
      "name": "Mechanical Keyboard",
      "description": "RGB backlit mechanical keyboard with blue switches.",
      "price": 69.99,
      "category": "Electronics",
      "inStock": false
    },
    {
      "id": 4,
      "name": "Smartwatch",
      "description": "Fitness tracking smartwatch with heart rate monitor.",
      "price": 129.99,
      "category": "Wearables",
      "inStock": true
    },
    {
      "id": 5,
      "name": "4K Monitor",
      "description": "27-inch 4K UHD monitor with HDR support.",
      "price": 349.99,
      "category": "Electronics",
      "inStock": true
    },
    {
      "id": 6,
      "name": "Gaming Chair",
      "description": "Ergonomic gaming chair with lumbar support.",
      "price": 199.99,
      "category": "Furniture",
      "inStock": false
    },
    {
      "id": 7,
      "name": "Portable SSD",
      "description": "1TB high-speed external solid-state drive.",
      "price": 119.99,
      "category": "Storage",
      "inStock": true
    },
    {
      "id": 8,
      "name": "Action Camera",
      "description": "Waterproof action camera with 4K recording.",
      "price": 249.99,
      "category": "Photography",
      "inStock": true
    },
    {
      "id": 9,
      "name": "Electric Scooter",
      "description": "Foldable electric scooter with long-range battery.",
      "price": 499.99,
      "category": "Transportation",
      "inStock": false
    },
    {
      "id": 10,
      "name": "Smart Light Bulbs",
      "description": "Color-changing smart LED bulbs, pack of 4.",
      "price": 49.99,
      "category": "Home",
      "inStock": true
    },
    {
      "id": 11,
      "name": "Standing Desk",
      "description": "Adjustable height standing desk with electric motor.",
      "price": 399.99,
      "category": "Furniture",
      "inStock": true
    },
    {
      "id": 12,
      "name": "Drone",
      "description": "Quadcopter drone with 1080p camera and GPS.",
      "price": 299.99,
      "category": "Photography",
      "inStock": false
    },
    {
      "id": 13,
      "name": "VR Headset",
      "description": "Virtual reality headset compatible with PC and consoles.",
      "price": 599.99,
      "category": "Gaming",
      "inStock": true
    },
    {
      "id": 14,
      "name": "Fitness Tracker",
      "description": "Lightweight fitness tracker with sleep monitoring.",
      "price": 79.99,
      "category": "Wearables",
      "inStock": true
    },
    {
      "id": 15,
      "name": "Smart Thermostat",
      "description": "WiFi-enabled thermostat for smart home integration.",
      "price": 149.99,
      "category": "Home",
      "inStock": false
    },
    {
      "id": 16,
      "name": "E-Reader",
      "description": "Waterproof e-reader with adjustable warm light.",
      "price": 129.99,
      "category": "Electronics",
      "inStock": true
    },
    {
      "id": 17,
      "name": "Graphics Tablet",
      "description": "Digital drawing tablet with pen pressure sensitivity.",
      "price": 99.99,
      "category": "Art",
      "inStock": true
    },
    {
      "id": 18,
      "name": "Robot Vacuum",
      "description": "Smart robot vacuum cleaner with app control.",
      "price": 279.99,
      "category": "Home",
      "inStock": true
    },
    {
      "id": 19,
      "name": "Coffee Maker",
      "description": "Programmable coffee maker with 12-cup capacity.",
      "price": 59.99,
      "category": "Kitchen",
      "inStock": true
    },
    {
      "id": 20,
      "name": "Noise Machine",
      "description": "Portable white noise machine for better sleep.",
      "price": 39.99,
      "category": "Health",
      "inStock": true
    }
  ]
  

app.get('/',(req:Request,res:Response)=>{
    res.send("Welcome to our site we make our customers rich");
})
app.get('/api/products',(req:Request,res:Response)=>{
    try{
        const{id,name,description,price,category,inStock}=req.query;//query parameters are appended to a url after a ? mark to help in data filtering sorting 
        //query params are passed inform of key value pairs separated by an equal sign , we can pass many parameters using an ampersand(&) between each query param
        //example http://localhost:3000/api/products? name=shoe & id=1
        let filteredData=[...data];
        if(id){
            filteredData=filteredData.filter((data) => data.id === Number(id))
        }
        if(name){
            filteredData= filteredData.filter((data)=>(data.name.toLowerCase().includes(name as string)))
        }
       res.send(filteredData);
    }
    catch(error){

    }
})
app.get('/api/products/:id',(req:Request,res:Response)=>{ //routes parameters also known as path paramaters are a part of a url that allows us to get spefic data item using its unique id or name
    //they variable or dynamic
   try{
    const eventId=Number(req.params.id)
    const event= data.find((event)=>(event.id===eventId))
    if(isNaN(eventId)){
        res.status(404).json(
            {
                "message":"Invalid event id"
            }
        )
    }
    if(!event){
      res.status(404).send("Event not found");
      return;
    }
    res.send(event);
   }catch(error){
    res.status(500).json({
        "message":"Internal server error"
    })
   }
    
})

app.listen(port,()=>{
console.log(`server running at port ${port}`);
})