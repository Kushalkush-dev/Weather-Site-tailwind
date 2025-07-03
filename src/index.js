import {apikey} from "./apikey.js";
const input=document.getElementById('input-city')
const key =apikey;
const disp=document.getElementById('dataDisplay')

 let cityname=document.getElementById('city')
 let temperature=document.getElementById('temp')
 let descp=document.getElementById('desp')
 let humid=document.getElementById('humidity')
 let error=document.getElementById('error')



 async function handleSubmit(){

  try {

  let inputval=input.value

  if(!inputval){
    throw new Error("Enter a city name")
  }
  input.value=''

   let data=await getdata(inputval,key);
  console.log(data);

  if(data){
      weatherdetails(data);
  }
 
} catch (error) {
  
 errormessage(error)

}


 }


document.getElementById('submit-btn').addEventListener('click',handleSubmit);


input.addEventListener('keydown',(event)=>{
  if(event.key==='Enter'){
    handleSubmit();

  }
})














 async function getdata(cityname,key){

    
    try {

   
    let fetchdata= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${key}`)

    if(!fetchdata.ok){

      throw new Error("Unable to fetch ");
     
    }

       let response= await fetchdata.json()

       return response  

    

    } catch (error) {
       errormessage(error)

       return null

      
    }

    
  }



  function weatherdetails(response){

    const {name,main:{temp,humidity},weather}=response
    const {description}=weather[0]
    error.innerHTML=''
    cityname.innerHTML=name
    temperature.innerHTML=`${(temp-273.15).toFixed(2)}°C`
    descp.innerHTML=description
    humid.innerHTML=humidity
    disp.classList.remove('hidden')

    
  }

 
  function errormessage(err){


    cityname.innerHTML=''
    temperature.innerHTML=''
    descp.innerHTML=''
    humid.innerHTML=''

   
    error.innerHTML=err.message
    disp.classList.remove('hidden')



  }
