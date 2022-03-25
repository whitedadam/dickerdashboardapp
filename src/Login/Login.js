import { React, useState } from 'react';
import { Form, FormGroup, NavLink } from 'reactstrap';
import { Col, Row } from 'reactstrap';
import Dashboard from '../Dashboard';
import AdminDashboard from '../AdminDashboard';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import './Login.css'; // Tell webpack that Button.js uses these styles
import { Card } from '@mui/material';
import dickerLogoSquare from '../images/dickerLogoSquare.png';
import Paper from '@mui/material/Paper';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';

const Login = ({ userAuth, setUserAuth, isAdmin, setIsAdmin }) => {
  const [state, setState] = useState({
    data: null,
    email: '',
    password: '',
    auth: false,
    isAdmin: false,
    admin: {
      name: 'Admin',
    },
    merchant: {
      name: 'Bob',
    },
  });

  const login = (event) => {
    event.preventDefault();

    let email = state.email;
    let password = state.password;

    const admin = {
      id: 1,
      email: 'admin@dicker.com',
      password: 'admin',
      name: 'Admin',
      loginAttempts: 0,
      lockoutEnabled: false,
      isAdmin: true,
    };
    const merchant = {
      id: 2,
      email: 'firstcheck@lastcheck.test',
      password: '12345',
      name: 'Bob',
      loginAttempts: 0,
      lockoutEnabled: false,
      isAdmin: false,
    };

    console.log(email + ' ' + password + ' ' + admin.email);

    if (admin.email === email && admin.password === password) {
      event.preventDefault();
      console.log('login successful');
      setUserAuth(true);
      setIsAdmin(true);
    }
    if (admin.email === email && admin.password !== password) {
      event.preventDefault();
      admin.loginAttempts += 1;
      console.log(admin.loginAttempts);
      console.log('login failed');
    }
    if (merchant.email === email && merchant.password === password) {
      event.preventDefault();
      console.log('login successful');
      setUserAuth(true);
    }
    if (merchant.email === email && merchant.password !== password) {
      event.preventDefault();
      merchant.loginAttempts += 1;
      console.log(merchant.loginAttempts);
      console.log('login failed');
    }

    if (merchant.email !== email && admin.email !== email) {
      event.preventDefault();
      console.log('login failed');
    }

    if (admin.loginAttempts === 3) {
      event.preventDefault();
      console.log("User locked out.");
      admin.lockoutEnabled = true;
    }

    if (merchant.loginAttempts === 3) {
      event.preventDefault();
      console.log("User locked out.");
      merchant.lockoutEnabled = true;
    }
  };

  const handleChange = (event) => {
    event.preventDefault();
    setState({ ...state, [event.target.name]: event.target.value });
  };

  if (userAuth === false) {
    return (
      <Card style={{ width: '500px', margin: 'auto' }} sx={{ boxShadow: 3 }}>
        <body id='loginBody'>
          <Container className={'loginContainer'}>
            {/* <TestComponent /> */}
            <Paper
              sx={{ boxShadow: 0, marginLeft: '166px', marginRight: 'auto', marginTop: '15px', marginBottom: '15px' }}
            >
              <img src={dickerLogoSquare} alt={'dicker logo'} />
            </Paper>
            <Form id='loginForm' onSubmit={login}>
              <FormGroup style={{ backgroundColor: '', alignContent: 'center' }}>
                <Row>
                  <Col>
                    <Typography fontWeight='bold' id='loginHeader' component='h1' variant='h5' align='center'>
                      Sign in
                    </Typography>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <TextField
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <AccountCircle />
                          </InputAdornment>
                        ),
                      }}
                      type='email'
                      name='email'
                      required
                      autoFocus
                      margin='normal'
                      label='Email Address'
                      id='email'
                      fullWidth
                      value={state.email}
                      onChange={handleChange}
                      placeholder='Enter email...'
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <TextField
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <LockOutlinedIcon />
                          </InputAdornment>
                        ),
                      }}
                      type='password'
                      name='password'
                      id='password'
                      required
                      margin='normal'
                      fullWidth
                      label='Password'
                      value={state.password}
                      onChange={handleChange}
                      placeholder='Enter password...'
                    />
                  </Col>
                </Row>
                <Row>
                  <FormControlLabel
                    sx={{ marginLeft: '6px' }}
                    control={<Checkbox value='remember' color='primary' />}
                    label='Remember me'
                  />
                </Row>
                <Row style={{ marginTop: '-8px', alignContent: 'center' }}>
                  <Col>
                    <Button
                      type='submit'
                      fullWidth
                      variant='contained'
                      sx={{ backgroundColor: '#d9c07c', mt: 3, mb: 2 }}
                    >
                      Sign In
                    </Button>
                  </Col>
                </Row>
                <p className='App-intro'>{state.data}</p>
                <Row>
                  <NavLink style={{ marginLeft: '85px' }} href='./resetPassword'>
                    Forgot Password?
                  </NavLink>
                  <NavLink style={{ marginRight: 'auto' }} href='./CreateAccount'>
                    Create Account
                  </NavLink>
                </Row>
              </FormGroup>
            </Form>
          </Container>
        </body>
      </Card>
    );
  } else if (userAuth === true) {
    if (isAdmin === false) {
      return <Dashboard userAuth={userAuth} isAdmin={isAdmin} />;
    } else {
      return <AdminDashboard userAuth={userAuth} isAdmin={isAdmin} />;
    }
  }
};

export default Login;
