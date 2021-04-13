import React, { useState } from 'react';
import { Button, Label, Col, FormGroup, Form, InputGroup, Input, Container, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Auth                from '../helpers/Auth';
import { GET_PASSCODE }    from '../config/constants'
import '../assets/styles/LoginContainer.css'

function LoginContainer(props) {

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const [modal, setModal] = useState(false);

	const toggle = () => setModal(!modal);

	const handleSubmit = () => {
		let pass = GET_PASSCODE()
		if (email === 'experimentation' && password === pass) {
			Auth.authenticate();
			props.history.replace('/login-info')
		}
		else {
			toggle();
		}
	}

	return (
		<div className="Root" style={{ backgroundColor: '#FCF8F7' }}>

			<Container className="App" >
				<Form className="form">
					<h2 className="text-center">Log In</h2>
					<p className="text-center" style={{ color: '#808080', fontSize: '10px' }}>Si vous avez besoin d'information pour l'utilisation, référez-vous à la page <span style={{ color: '#800000' }}>README.md</span></p>
						<Col>
						<FormGroup>
							<Label className="mt-2">Nom usager</Label>
							<InputGroup>
								<Input className="inputField rounded-pill"
									type="email"
									name="email"
									id="Email"
									onChange={(e) => setEmail(e.target.value)}
									placeholder="experimentation"
								/>
							</InputGroup>

						</FormGroup>
					</Col>
					<Col>
						<FormGroup>
							<Label for="Password">Mot de passe</Label>
							<Input className="inputField rounded-pill"
								type="password"
								name="password"
								id="Password"
								onChange={(e) => setPassword(e.target.value)}
								placeholder="••••••••••••"
								autoComplete="currentPassword"
							/>
						</FormGroup>
					</Col>
					<div className="text-center ">
						<Button className="mt-2" outline color="primary" size="lg" onClick={handleSubmit}>Envoyer</Button>
					</div>
				</Form>
				<div>
					<Modal isOpen={modal} toggle={toggle} centered>
						<ModalHeader toggle={toggle}>Information de Login</ModalHeader>
						<ModalBody>Merci de saisir les infos correctes.</ModalBody>
						<ModalFooter>
							<Button color="primary" onClick={toggle}>OK</Button>{' '}
						</ModalFooter>
					</Modal>
				</div>
			</Container>
		</div >
	);
}

export default LoginContainer;