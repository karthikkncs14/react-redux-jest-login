import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Login from './features/User/Login';
import SignUp from './features/User/SignUp';
import Dashboard from './features/User/Dashboard';
import { PrivateRoute } from './helpers/PrivateRoute';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import './App.css';

function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route exact component={Login} path="/login" />
                    <Route exact component={SignUp} path="/SignUp" />
                    <PrivateRoute exact component={Dashboard} path="/" />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
