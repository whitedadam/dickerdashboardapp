import React from "react";
import './App.css';

class Login extends React.Component{
    render() {
        return(
            <div id="form" className={'login'}>
                <form>
                    <input type='email' name='email' placeholder='Enter email...' />
                    <input type='password' name='pwd' placeholder='Enter password...'/>
                    <button>Login</button>
                </form>
            </div>
        );
    }
}

export default Login;