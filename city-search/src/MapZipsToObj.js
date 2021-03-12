import React, {useState, useEffect} from 'react';

// function States({states}) {

//   let statesArr = Array.from(states)
  
//     return (
//       <div>
//         <ul>
//           {statesArr.map((s, index)=>{
//           return <li key={index}>{s}</li>
//         })}
//         </ul>
//       </div>
//     );

//   }

function MapZipsToObj(props) {  // receives zipCodes[] and cityName as props
    

    console.log('Rendering...')

    const [zipEntries, setZipEntires] = useState(new Map()) // maps all the zip codes to corresponding object that matches cityName
    const [states, setStates] = useState(new Set()) // holds all the unique states the zips are from
   // const [update, setUpdate] = useState(0)
    // const [isReady, setIsReady] = useState(false)

    let zipMap = new Map()  // temp 
    let StateSet = new Set()


    const fetchData = ()=> {
      for (let i = 0; i < props.zipCodes.length; i++) {  // loop through all available zips 
        let endpoint = `http://ctp-zip-api.herokuapp.com/zip/${props.zipCodes[i]}`; // modify endpoint
        
        fetch(endpoint)
         .then((res) => res.json()) 
         .then((jsonObj) => {
           
             const filteredByCityName = jsonObj.filter(  // filter the array of objects and only keep the one that has cityName 
               (obj) => obj.City === props.cityName
             );
            
            if(filteredByCityName[0]){ 
              zipMap.set(props.zipCodes[i], filteredByCityName) // populate the temp map with zip , and the object with more information [{City: " ", Population: "", ...}]
              StateSet.add(filteredByCityName[0].State) // ppopulating temp set with the unique states 
          }
    
         })
         .catch((err) => {
           console.log(err);

         });

        
         
     }
    }
     



  
    useEffect (()=> {
      console.log('Fetching data.. ')
      fetchData()                       
      setZipEntires(zipMap)            //set the states 
      setStates(StateSet)

      return () => {
        setZipEntires(new Map())       //reinitializing the states
        setStates(new Set())          
        console.log('clean up ')
      }

     }, [props])                      //After first mounting only call this hook if props change 

      


    // setTimeout(()=> {            // Big problem with Async issues. It seems the states are populated properly but it does not do it in time.
    //   let dummy = update         // React stops rendeing while the states are not populated
    //   setUpdate(dummy+1)         // If I set timeout and update a dummy state to force a rerender it shows the output, but its will cause infinite loop as the state will always update and keep rendering
    // },3000)                      // Help !!! 
     

    
    
    

  
  return (
  
  
  states?  
  <div>
    <ul>
    {Array.from(states).map((s, index)=>{
    return <li key={index}>{s}</li>})}
    </ul>
  </div> : <>no states</>
  
  )
  
    
}

export default MapZipsToObj;