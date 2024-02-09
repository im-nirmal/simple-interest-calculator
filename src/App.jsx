import { TextField,Stack,Button } from '@mui/material'
import './App.css'
import { useState } from 'react'


function App() {
  //create state to store data
  //since it holds number we give it as 0 as initial value
  const [interest,setInterest] = useState(0)
  const [principle,setPrinciple] = useState(0)
  const [rate,setRate] = useState(0)
  const [year,setYear] = useState(0)

  //state gor handling invalid messages
  const [principleAmountValid,setPrincipleAmountValid] = useState(true)
  const [rateAmountValid,setRateAmountValid] = useState(true)
  const [yearAmountValid,setYearAmountValid] = useState(true)


  

  //function for reset
  const handleReset = () =>{
    //reset all states
    setInterest(0)
    setPrinciple(0)
    setRate(0)
    setYear(0)
    setPrincipleAmountValid(true)
    setRateAmountValid(true)
    setYearAmountValid(true)

  }

  //function for validation
  const handleValidation = (tag)=>{
    console.log("Inside handleValidation");
    //destructuring 
    const {value,name} = tag
    console.log(value,name);
    console.log(!!value.match(/^[0-9]*.?[0-9]+$/))
    //string method - match() ; regular expression
    if(!!value.match(/^\d*\.?\d+$/)){
      //valid
      if(name=="principle"){
        setPrinciple(value)
        setPrincipleAmountValid(true)
      }else if(name=="rate"){
        setRate(value)
        setRateAmountValid(true)
      }else{
        setYear(value)
        setYearAmountValid(true)
      }
    }else{
      //invalid
      if(name=="principle"){
        setPrinciple(value)
        setPrincipleAmountValid(false)
      }else if(name=="rate"){
        setRate(value)
        setRateAmountValid(false)
      }else{
        setYear(value)
        setYearAmountValid(false)
      }
    }
  }

  //function for calculate
  const handleCalculate = () =>{
    //&& means if it is true 
    if(principle && rate && year){
      setInterest(principle*rate*year/100)
    }else{
      alert("Please fill the form completely")
    }
  }

  return (
    //since we need to style we make react fragment as div
    <div style={{width:'100%',height:'100vh'}} className='d-flex justify-content-center align-items-center bg-dark'>
      <div style={{width:'600px'}} className='bg-light p-5 rounded'>
        <h1>Simple Interest Calculator</h1>
        <p>Calculate your simple interest easily</p>
        <div className="d-flex justify-content-center align-items-center bg-warning p-3 rounded shadow flex-column text-light">
          <h1>₹ {interest}</h1>
          <p className='fw-bolder'>Total Simple Interest</p>
        </div>

        <form className='mt-5'>
          {/* principle */}
          <div className='mb-3'>
            <TextField className='w-100'  id="outlined-basic-principle" label="₹ Principle Amount" variant="outlined"
             value={principle || ""} name='principle' onChange={(e)=>handleValidation(e.target)}/>
          </div>
          {/* using conditional rendering to display invalid messages */}
          { !principleAmountValid && <div className="text-danger mb-3">*Invalid Principle amount</div>}

          {/* rate */}
            <div className='mb-3'>
              <TextField className='w-100' id="outlined-basic-rate" label="Rate of interest (p.a) %" variant="outlined" value={rate || ""} name='rate' onChange={(e)=>handleValidation(e.target)} />
            </div>
            { !rateAmountValid && <div className="text-danger mb-3">*Invalid rate </div>}

          {/* time */}
          <div className='mb-3'>
              <TextField className='w-100' id="outlined-basic-time" label="Time Period (Yr)" variant="outlined" value={year || ""} name='year' onChange={(e)=>handleValidation(e.target)}/>
            </div>
            { !yearAmountValid && <div className="text-danger mb-3">*Invalid year </div>
}
          {/* btn collection */}
          <Stack direction="row" spacing={2}>
            {/* disabling button when any text fiel id invalid */}
            <Button onClick={handleCalculate} disabled={ !principleAmountValid || !rateAmountValid || !yearAmountValid } 
            style={{width:'50%',  height:'70px'}} className='bg-dark' variant="contained">CALCULATE</Button>
            <Button onClick={handleReset} style={{width:'50%',  height:'70px'}} variant="outlined">RESET</Button>
          </Stack>
        </form>

      </div>
    </div>
  )
}

export default App

//we give value fiel like that for each states which means if its value is 0 then show like it as empty, and when we use value , we must declare onChange function
// we give name attribute for text field to identify from which text field we enters during the validation