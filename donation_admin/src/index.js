import React from 'react';
import ReactDOM from 'react-dom';
import CaseAll from './components/DonationProject/CaseAll';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router, Redirect, Switch, Route} from "react-router-dom";
import NewsAll from './components/DonationNews/NewsAll';
import CaseForm from './components/DonationProject/CaseForm';
import NewsDetail from './components/DonationNews/NewsDetail';
import NewsForm from './components/DonationNews/NewsForm';
import CaseDetail from './components/DonationProject/CaseDetail';
import Login from './components/SignAuth/Login';
import LangSwitch from './components/LangSwitch/LangSwitch';
import Home from './components/Home/Home';
import Benefits from './components/DonationBenefits/Benefits';

import './i18n';

ReactDOM.render(
  <React.StrictMode>
    <div className="App">
      <LangSwitch/>
      <Router>
        <Switch>

          <Route path="/donor/benefits">
            <Benefits/>
          </Route>

          <Route path ="/Home">
            <Home/>
          </Route>

        {/* news===section start */}

          <Route path="/news">
            <NewsAll/>
          </Route>

          <Route path ="/news-detail/:id">
            <NewsDetail/>
          </Route>

          <Route path = "/news-create">
            <NewsForm/>
          </Route>

        {/* news===section end */}

        {/* project===section start */}

          <Route path ='/project'>
            <CaseAll/>
          </Route>

          <Route path ="/project-create">
            <CaseForm/>
          </Route>

          <Route path ="/project-detail/:id">
            <CaseDetail/>
          </Route>
        
        {/* project===section end */}

          <Route path="/login">
            <Login/>
          </Route>

          <Route exact path ="/"
            render={()=>{
              return(
                <Redirect to="/login"/>
              )
            }}
          /> 

        </Switch>
      </Router>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
