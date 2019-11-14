import React from 'react';
import { Switch, Route, } from 'react-router-dom';

class RouterCurzaCms extends React.Component {
    render(){
        return(
            <Switch>
                <Route exact='/cms' render={ () => (<Redirect to='/' />) } />
                <Route exact='/cms/departamentos/ciencia-y-tecnologia' render={ () => (<Redirect to='/tecnologia' />) } />
            </Switch>
        )
    }
}
export default RouterCurzaCms;