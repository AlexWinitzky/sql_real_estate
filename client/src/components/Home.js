import React from 'react';
import { Header, } from 'semantic-ui-react';

const Home = () => (
  <div style={styles.outer}>
    <Header as="h3" style={{ fontSize: '100px', }}>Advanced SQL</Header>
  </div>
)

const styles = {
  outer: {
    height: '400px',
    margin: ' 0', display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}

export default Home;