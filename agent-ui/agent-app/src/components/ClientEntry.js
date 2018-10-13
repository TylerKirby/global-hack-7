import React, { Component } from 'react';
import { Button, Form, Search } from 'semantic-ui-react';
import { getCountries } from 'api/countries-api';
import { Mutation } from 'react-apollo';
import { addClientMutation } from 'api/client-api';


export class ClientEntry extends Component {
  state = {
    value: '',
    results: [],
  };

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' });

  handleCountrySelected = (result) => this.setState({ country: result.title });

  handleOnSearchChanged = (e, { value }) => {
    this.setState({ isLoading: true, value });

    getCountries(value).then((result) => {
      const searchResults = result.data.countriesThatStartWith.map((country) => {
        return {
          title: country.name,
          image: country.flag,
        };
      });

      this.setState({
        isLoading: false,
        results: searchResults,
      });
    });
  };

  render() {
    const { style, onCancel } = this.props;

    const {results} = this.state;

    return (
      <Mutation mutation={addClientMutation}>
        {(addAnUnstable) => (
          <Form onSubmit={(e) => {
            e.preventDefault();

            const { firstName, lastName, email, phoneNumber } = this.state;
            const client = { firstName, lastName, email, phoneNumber };

            addAnUnstable({ variables: { anUnstable: { ...client } } });
          }} style={style}>
            <Form.Input
              name='firstName'
              label='Given Name'
              placeholder='Given Name'
            />
            <Form.Input
              name='lastName'
              label='Family Name'
              placeholder='Family Name'
            />
            <Form.Input
              name='phoneNumber'
              label='Phone'
              placeholder='Phone'
            />
            <Form.Input
              name='email'
              label='Email'
              placeholder='Email'
            />

            <Form.Field>
              <label>Origin Country</label>
              <Search
                results={results}
                onSearchChange={this.handleOnSearchChanged}
                onSelectionChange={this.handleCountrySelected}
              />
            </Form.Field>

            <Button type='submit'>Save</Button>
            <Button onClick={onCancel}>Cancel</Button>
          </Form>
        )
        }

      </Mutation>
    );
  }
}