import React                    from 'react';
import { Container }            from 'reactstrap';
import LoginInformationForm     from '../components/LoginInformationForm'
import '../assets/styles/LoginContainer.css'

function LoginInformationContainer() {

	return (
		<div className="Root" style={{ backgroundColor: '#FCF8F7', display: "flex" }}>
			<Container >
				<LoginInformationForm className="justify-content-center" />
			</Container>
		</div >
	);
}

export default LoginInformationContainer;