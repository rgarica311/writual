import React from 'react'
import { Redirect } from 'react-router-dom'

class ProtectedRoute extends React.Component {
   
    render() {
        const Component = this.props.component
        const componentName = this.props.componentName
        const history = this.props.history
        const isAuthenticated = localStorage.getItem('logged_in')
       
        return isAuthenticated 
            ? <Component  /> 
            : <Redirect to={{ pathname: '/' }} />
        
    }
}

export default ProtectedRoute;