import React from 'react'
import {useHistory} from 'react-router-dom'
 
function PaymentSuccess() {

  const history = useHistory();

  const goToBenefit=()=>{
    history.push('/Benefits')
  }

  const goToProject=()=>{
    history.push('/discover')
  }

  return (
    <div>
      <h1 style={{color:"rgb(5, 152, 98)"}}>You have successfully donated !!!</h1>
      <div className='p-4' style={{display:"flex", justifyContent:"space-around"}}>
        <button onClick={goToBenefit} className='btn btn-primary p-3'>Go to Benefits</button>
        <button onClick={goToProject} className='btn btn-primary p-3'>Go to Projects</button>
      </div>
    </div>
  )
}

export default PaymentSuccess