import React, {useState, useEffect} from "react";
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import './locales/i18n';
import { Benefits,  Nav, Post, Footer, AboutUs, NewsPage, NewsDetail, DonationPage, Home} from './components/Import.js'
import ErrorPage from './Reducer/ErrorPage'
import {HelmetProvider } from 'react-helmet-async';
import TestPaypal from "./testPaypal";
import PaymentSuccess from "./components/Donation/Payment/PaymentSuccess";
import { useStateValue } from "./Reducer/StateProvider";

function App() {
  const [{language}] = useStateValue();
  
  const [font, setFont] = useState();

  useEffect(() => {
   if(language==="en") setFont("Times New Roman");
   if(language==="ko") setFont("BatangChe");
   if(language==="zh") setFont("SimHei");
  }, [language])
  
  return (
    <HelmetProvider>
    <Router>
      <div className="App" style={{fontFamily:font}}>
        <Nav/>

        <Switch>
          <Route path ='/benefits' >
            <Benefits/>
            <Footer/>
          </Route>

          <Route path ="/discover">
            <DonationPage/>
            <Footer/>
          </Route>

          <Route path ="/news/detail/:id">
            <NewsDetail/>
          </Route>

          <Route path ="/news">
            <NewsPage/>
          </Route>

          <Route path ="/aboutUs">
            <AboutUs/>
            <Footer/>
          </Route>
          
          <Route path = "/donation/success">
            <PaymentSuccess/>
          </Route>

          <Route path ="/postBlog/:id*">
            <Post/>
          </Route>
          
          <Route exact path ="/Home">
            <Home/>
            <Footer/>
          </Route>

          <Route path ="/test2">
            <TestPaypal/>
          </Route>
    
          <Route exact path ="/"
            render={()=>{
              return(
                <Redirect to="/Home"/>
              )
            }}
          />
          <Route path ="*" status="404">
            <ErrorPage/>
          </Route>
        </Switch>
      </div>
    </Router>
    </HelmetProvider>
  );
}

export default App;
