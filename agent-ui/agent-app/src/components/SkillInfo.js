import { Container, Form } from 'semantic-ui-react';
import React from 'react';

export const SkillInfo = ({style}) => (
  <Container style={style}>
    <Form.Field>
      <label>Question one</label>
      <input type='text' placeholder='Question one'/>
    </Form.Field>
    <Form.Field>
      <label>Question two</label>
      <input type='text' placeholder='Question two'/>
    </Form.Field>
  </Container>
);