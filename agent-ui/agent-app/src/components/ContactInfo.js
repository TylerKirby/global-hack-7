import { Container, Form, Search } from 'semantic-ui-react';
import React, { Component } from 'react';
import _ from 'lodash';
import { getCountries } from 'api/countries-api';


export class ContactInfo extends Component {
  state = {
    results: [],
  };

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' });

  handleOnSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent();

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
      const isMatch = result => re.test(result.title);

      this.setState({
        isLoading: false,
        results: getCountries(),
      })
    }, 300)
  };

  render() {
    const {style} = this.props;
    const {results} = this.state;

    return (
      <Container style={style}>
        <Form.Field>
          <label>Given Name</label>
          <input placeholder="Given Name"/>

        </Form.Field>
        <Form.Field>
          <label>Family Name</label>
          <input placeholder="Family Name"/>
        </Form.Field>
        <Form.Field>
          <label>Origin Country</label>
          <Search
            onSearchChange={this.handleOnSearchChange}
            results={results}
          />
        </Form.Field>
      </Container>
    );
  }
}