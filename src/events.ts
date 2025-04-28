import { get } from "node:http"

const eventData=async ()=>{
    try{
     const data = await fetch("url",{
        method:"GET",
        headers:{
          'content-type':'application/json'
        }


     })
    }
    catch(error){
     console.log("Error fetching products",error)
    }
}