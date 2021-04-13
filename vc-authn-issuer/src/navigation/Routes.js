import React                                      from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import HeaderComponent                            from '../components/HeaderComponent'
import FooterComponent                            from '../components/FooterComponent'
import MainContainer                              from '../containers/MainContainer'
import LoginContainer                             from '../containers/LoginContainer'
import NoAuthContainer                            from '../containers/NoAuthContainer'
import LoginInformationContainer                  from '../containers/LoginInformationContainer'
import QRCodeLoginInformationContainer            from '../containers/QRCodeLoginInformationContainer'
import ProofLoginInformationContainer             from '../containers/ProofLoginInformationContainer'
import Auth from '../helpers/Auth'

const PrivateRoute = ({ component, ...options }) => {
	const finalComponent = Auth.getAuth() ? component : NoAuthContainer;
	return <Route {...options} component={finalComponent} />;
  };

function Routes() {
	return (
		<Router>
			<div>
				<Route component={HeaderComponent}/>
			<Switch>
				{/* Routes attestation d'authentification */}
				<PrivateRoute path="/login-info"       component={LoginInformationContainer} />
				<PrivateRoute path="/qrcode" component={QRCodeLoginInformationContainer} />
				<PrivateRoute path="/proof-login-info"  component={ProofLoginInformationContainer} />

				{/* Routes de base de l'app */}
				<Route path="/noauth" component={NoAuthContainer} />
				<Route path="/login"  component={LoginContainer} />
				<Route path="/" exact component={MainContainer} />

			</Switch>
			<FooterComponent />
			</div>
		</Router>
	)
}

export default Routes
