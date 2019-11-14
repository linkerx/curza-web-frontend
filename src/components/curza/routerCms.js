import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

class RouterCurzaCms extends React.Component {
    render(){
        return(
            <Switch>
                <Route exact path='/cms' render={ () => (<Redirect to='/' />) } />
                <Route exact path='/cms/departamentos/ciencia-y-tecnologia' render={ () => (<Redirect to='/tecnologia' />) } />
            </Switch>
        )
    }
}
export default RouterCurzaCms;