import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

class RouterCurzaCms extends React.Component {
    render(){
        return(
            <Switch>
                <Route exact path='/cms' ><Redirect to='/' /></Route>
                <Route exact path='/cms/departamentos/ciencia-y-tecnologia'><Redirect to='/tecnologia' /></Route>
            </Switch>
        )
    }
}
export default RouterCurzaCms;