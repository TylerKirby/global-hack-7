import React, { Component } from 'react';
import { Button, Form, Icon, Input, Search } from 'semantic-ui-react';
import { getCountries } from 'api/countries-api';


export class ClientEntry extends Component {
  state = {
    value: '',
    results: [],
  };

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' });

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
    const { style, onSave, onCancel } = this.props;
    const { results } = this.state;

    return (
      <Form style={style}>
        <Form.Field>
          <label>Given Name</label>
          <input placeholder="Given Name"/>

        </Form.Field>
        <Form.Field>
          <label>Family Name</label>
          <input placeholder="Family Name"/>
        </Form.Field>
        <Form.Field>
          <label>Phone Number</label>
          <Input type='tel' placeholder='Phone Number'/>
        </Form.Field>
        <Form.Field>
          <label>Email</label>
          <Input iconPosition='right' placeholder='Email'>
            <Icon name='at'/>
            <input/>
          </Input>
        </Form.Field>
        <Form.Field>
          <label>Origin Country</label>
          <Search
            results={results}
            onSearchChange={this.handleOnSearchChanged}
          />
        </Form.Field>
        <Button onClick={onSave}>Save</Button>
        <Button onClick={onCancel}>Cancel</Button>
      </Form>
    );
  }
}