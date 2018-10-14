import React, { Component } from 'react';
import { Container, Header, Icon, Card, Image, Visibility } from 'semantic-ui-react';
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
import CardComponent from '../CardComponent/CardComponent.js';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';

const client = new ApolloClient({
  uri: "http://localhost:4000/"
});

class Community extends Component {

  constructor(props) {
    super(props);
    this.state = {
      communityResult: [],
      singleCommunityResult: {},
      visible: false,
      one: true,
      two: false,
      info: [],
      info2: [],
      name: '',
    };
    this.setCards2 = this.setCards2.bind(this);
    this.setCards3 = this.setCards3.bind(this)
  }

  handleUpdate = (e) => {console.log('in here!!!'); this.setState({ visible: !this.state.visible }); console.log(this.state.visible)}

  async componentDidMount(){
    await client.query({
      query: gql`
        query {
          communityOpportunitiesForId(id: "U2FsdGVkX1/FJXXPo/viQ9NfCsE22SZpWpX2Td/FFeM=") {
            name
            _id
            type
            description
            imageUrl
          }
        }
      `
      })
      .then(result => {
        console.log('result: ', result)
        const data = result.data.communityOpportunitiesForId
        const collection = data.map(values => {
          return values;
        })
        this.setState({communityResult: collection})
      });
    }

    // getDerivedStateFromProps(props, state) {
    //   console.log(props)
    //   console.log(state)
    // }

    setCards2() {
      console.log('in setCards 2')
      this.setState({one: false, two: true})
    }

    setCards3(communities) {
      this.state.info = [];
      this.state.info.push(communities)
      console.log('in SETCARDS 3 state info', this.state.info)
    }

    communityCards2() {
      const promise = this.state.communityResult.map((communities) => {
        console.log('before communities: ', communities)
        
        return (
          <div>
          <NavLink to="/CardComponent">
           {this.setCards3(communities)}
           <Card onClick={(communities) => {console.log(communities); this.setCards3(communities)}}>
            <Image>${communities.imageUrl}</Image>
            <Card.Content onClick={this.setCards2}>
            <Card.Header>${communities.name}</Card.Header>
            <Card.Description>${communities.description}</Card.Description>
            </Card.Content>
            <Card.Content extra>
            <a>
            <Icon name='user' />
            Mentor
            </a>
            </Card.Content>
          </Card>
          <br></br>
          <Route path="/CardComponent" render={(props) => <CardComponent {...props} communities={communities}/>} />
          </NavLink>
         </div>
        ) 
      })
      return promise;
      
    }

  
  render() {
    console.log(this.state.communityResult)

    if (this.state.communityResult){
      if (this.state.one === true) {
        return (
          <div>
          <Container>
          <Header as='h2' icon textAlign='center'>
          <Icon name='address card outline' circular />
          <Header.Content>YOUR COMMUNITY</Header.Content>
          </Header>
          </Container>
          {this.communityCards2()}
          </div>
        );
      }
    }


    if (this.state.two === true) {
      console.log('this.state.info', this.state.info)
      console.log('this.state.name: ', this.state.name)
      return(
        <div>
        <CardComponent info={this.state.info}/>
        </div>
      )  
    }
  }
}

export default Community;
    
  



