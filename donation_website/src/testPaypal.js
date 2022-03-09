import React from 'react'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
 
function TestPaypal() {
   
    return (
        <div>
            <h1>This is test form</h1>

            <PayPalScriptProvider options={{ "client-id": "AY2P3y81j_eDT0a5lGk59HAoBY6Wi2OeJotUf8OzsBISatJSggNKGN1M6B3TZcstuf06ighdJTWuIZ_2"}}>
                <PayPalButtons
                    style={{
                        layout: 'vertical',
                        color: 'blue',
                        shape: 'pill',
                        label: 'paypal'
                    }} 
                    createOrder = {(data, actions)=> {
                        return actions.order.create({
                            intent:"CAPTURE",
                            purchase_units: [{
                                amount: {
                                    value: '77.44' 
                                }
                            }]
                        });
                    }}
                    onApprove ={async(data, actions)=>{
                        const order = await actions.order.capture();
                        console.log('Capture result', order, JSON.stringify(order, null, 2));
                    }}
                    onError ={ (err)=>{
                        console.log(err);
                    }}
                />
            </PayPalScriptProvider>
        </div>
    )
}

export default TestPaypal