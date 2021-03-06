import React, { useEffect, useContext } from 'react';
import AppContext from './context/index';
import Memory from './Metrics/Memory.jsx';
import {
  Switch,
  Route,
  useHistory,
} from 'react-router-dom';

import './styles/styles.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


const SignUp = () => {

  let history = useHistory();
  const { isUserLoggedIn, setIsUserLoggedIn } = useContext(AppContext);

  const { firstName, setFirstName } = useContext(AppContext);
  const { lastName, setLastName } = useContext(AppContext);
  const { username, setUsername } = useContext(AppContext);
  const { password, setPassword } = useContext(AppContext);

  const onSubmit = (e) => {
    e.preventDefault();
    fetch('/signup', {
      body: JSON.stringify({
        firstName,
        lastName,
        username,
        password,
      }),
      method: 'POST',
      headers: { 'Content-Type': 'Application/JSON' },
    })
      .then(response => response.json())
      .then(res => {
        if (res.isUserLoggedIn === true){
          setIsUserLoggedIn(true);
        }
      })
      .catch(err => console.log('error creating user: ', err))
    }

  useEffect(() => {
      if(isUserLoggedIn) {
          history.push('/connect'); //later, change this to general page
      }
  }, [isUserLoggedIn]);

  
  return (
      <Switch>
        <Route path='/signup'>
          <div id='signup'>
          <img src={require("/src/styles/assets/redisrate1.png")} width="200"></img>
          <form id='signupForm' onSubmit={onSubmit}>
            <TextField className='formElement' margin='normal' label='First Name'  onChange={(e) => setFirstName(e.target.value)} required/>
            <TextField className='formElement' margin='normal' label='Last Name'  onChange={(e) => setLastName(e.target.value)} required/>
            <TextField className='formElement' margin='normal' label='Username'  onChange={(e) => setUsername(e.target.value)} required/>
            <TextField className='formElement' margin='normal' label='Password' type='password'  onChange={(e) => setPassword(e.target.value)} required/>
            <Button id='signupButt' type='submit' variant='outlined'>Signup</Button>
          </form>
          </div>
        </Route>

        <Route path='/memory'>
          <Memory />
        </Route>
    </Switch>

  );
}

export default SignUp;
