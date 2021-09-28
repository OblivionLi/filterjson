import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import Homepage from './components/Homepage';
import './App.css';
import UserDetails from './components/UserDetails';

const App = () => {
    return (
        <>
            <div className="title">
                <h1>JSON Manipulation</h1>
                <p>Data taken from: <a href="https://jsonplaceholder.typicode.com/users" rel="noreferrer" target="_blank">https://jsonplaceholder.typicode.com/users</a></p>
                <Link to="/">Homepage</Link>
            </div>

            <div className="content">
                <Switch>
                    <Route exact path="/" component={Homepage} />
                    <Route exact path="/user/:id" component={UserDetails} />
                </Switch>
            </div>
        </>
    )
}

export default App
