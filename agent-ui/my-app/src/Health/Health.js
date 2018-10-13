import React, { Component } from 'react';
import { Container, Button } from 'semantic-ui-react';

class Health extends Component {
  render() {
    return (
      <div className="Health">
      <Container>
        <h1>HEALTH</h1>
        <Button>Health-based services</Button>
      </Container>
      </div>
    );
  }
}

export default Health;