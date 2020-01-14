import React from 'react';
import { Switch, Route, } from 'react-router-dom';
import { Container, } from "semantic-ui-react";
import Available from './components/Available'
import FindHome from './components/FindHome';
import Cities from './components/Cities'
import CityCost from './components/CityCost'
import Home from './components/Home';
import Navbar from './components/Navbar';
import NoMatch from './components/NoMatch';

const App = () => (
  <>
    <Navbar />
    <Container>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/available" component={Available} />
        <Route exact path="/cities" component={Cities} />
        <Route exact path="/find_home" component={FindHome} />
        <Route exact path="/city_cost" component={CityCost} />
        <Route component={NoMatch} />
      </Switch>
    </Container>
  </>
)

export default App;