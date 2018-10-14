import React, { Component } from 'react';
import { Container, Button, Header, Icon, Card, Image, Item, Rating } from 'semantic-ui-react';
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';

const client = new ApolloClient({
  uri: "http://localhost:4000/"
});

class CardComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cardResult: null,
    };
  }

  async componentDidMount(){
    if (this.state.cardResult === null) {
        this.setState({cardResult: this.props.communities})
    }
    console.log(this.state.cardResult)
    console.log('this.props.communities: ', this.props.communities)
    console.log('this.props.info: ', this.props.info)
  }

//   componentDidUpdate() {
//     console.log('this.props.communities: ', this.props.communities)
//     console.log('this.state.cardResult: ', this.state.cardResult)
//   }
  
  render() {
    return (
      <Container>
      <br></br>
      <Item.Group relaxed>
    <Item>
      <Item.Image size='medium' src='http://www.pngpix.com/wp-content/uploads/2016/10/PNGPIX-COM-Cathedral-Church-PNG-Image-500x430.png' />

      <Item.Content verticalAlign='middle'>
        <Item.Header>Adult Education & Literacy (AEL) - St. Louis Community College (Kirkwood)</Item.Header>
        <Item.Description>The Adult Education & Literacy Program from St. Louis Community College serves people in the school districts of Affton, Bayless, Kirkwood, Lindbergh, Mehlville-Oakville, St. Louis City, Valley Park and Webster Groves, offering free High School Equivalency classes as well as ESL classes.</Item.Description>
        <Item.Meta>4900 S Lindbergh, Saint Louis, MO 63125</Item.Meta>
        <Item.Extra>
          <Button floated='right'>E-Mail</Button>
        </Item.Extra>
      </Item.Content>
    </Item>
    </Item.Group>
      <Rating icon='star' defaultRating={3} maxRating={4} />
      </Container>
    );
  }
}

export default CardComponent;