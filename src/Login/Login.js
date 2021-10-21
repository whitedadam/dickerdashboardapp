import React from 'react';
import {Container, Form, FormGroup, Input, Label} from "reactstrap";

class Login extends React.Component {
  render() {
    return (
      <Container className={'login'}>
          <Form>
              <FormGroup>
                  <Label for='email'>Email:</Label>
                  <Input type='email' name='email' />
                  <Label for='pwd'>Password:</Label>
                  <Input type='password' name='pwd' />
              </FormGroup>
          </Form>
      </Container>
        /*<div id='form' className={'login'}>
        <form>
          <input type='email' name='email' placeholder='Enter email...' />
          <input type='password' name='pwd' placeholder='Enter password...' />
          <button>Login</button>
        </form>
      </div>*/
    );
  }
}

export default Login;
