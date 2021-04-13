import React, { useState, useEffect }  from 'react'
import { Container, Button, Col, Modal, ModalHeader, ModalBody, ModalFooter, Spinner } from 'reactstrap'
import QRComponent                     from '../components/QRComponent'
import { GET_API_SECRET, GET_CRED_ID } from '../config/constants'
import { fetchWithTimeout }            from '../helpers/fetchWithTimeout'
import '../assets/styles/LoginContainer.css'

function QRCodeLoginInformationContainer(props) {
	const [modal, setModal] = useState(false);
	const [show, setShow] = useState(false);
	const [showAuthButton, setAuthButton] = useState(false);
	const [showLoader, setLoader] = useState(false)

	const schemaName = process.env.REACT_APP_SCHEMA_NAME_CERT; 
	const schemaIssuerDID = process.env.REACT_APP_SCHEMA_ISSUER_DID_CERT; 
	const schemaVersion = process.env.REACT_APP_SCHEMA_VERSION_CERT;

	useEffect(() => getConnectionInfo(), []);

	function getConnectionInfo() {
		try {
			fetchWithTimeout(`/api/connections/${props.location.state.invitation.connection_id}`,
				{
					method: 'GET',
					headers: {
						'X-API-Key': `${GET_API_SECRET()}`,
						'Content-Type': 'application/json; charset=utf-8',
						'Server': 'Python/3.6 aiohttp/3.6.2'
					}
				}, 3000).then((
					resp => {
						try {
							resp.json().then((data => {
								if (data.state) {
									let intervalFunction;
									data.state === "invitation" ? intervalFunction = setTimeout(getConnectionInfo, 5000) : clearIntervalFunction(intervalFunction);
								} else {
									setTimeout(getConnectionInfo, 5000)
								}
							}))
						} catch (error) {
							setTimeout(getConnectionInfo, 5000)
						}
					}
				))
		} catch (error) {
			setTimeout(getConnectionInfo, 5000)
		}
	}

	function clearIntervalFunction(intervalFunction) {
		clearInterval(intervalFunction);
		//setAuthButton(true);
		getCredDefId();
	}


	function getCredDefId() {
		issueCredential(GET_CRED_ID());
	}

	function issueCredential(credential_definition_id) {
		fetch(`/api/issue-credential/send`,
			{
				method: 'POST',
				body: JSON.stringify({
					"schema_name": schemaName,
					"schema_version": schemaVersion, 
					"schema_issuer_did" : schemaIssuerDID,
					"connection_id": props.location.state.invitation.connection_id,
					"cred_def_id": credential_definition_id,
					"credential_proposal": {
						"@type": "did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/issue-credential/1.0/credential-preview",
						"attributes": [
							{
								"name": "username",
								"value": props.location.state.data.username
							},
							{
								"name": "email",
								"value": props.location.state.data.email
							},
							{
								"name": "first_name",
								"value": props.location.state.data.first_name
							},
							{
								"name": "last_name",
								"value": props.location.state.data.last_name
                            }
						]
					}, 
					"comment" : "Émission d'attestation authentification"
				}),
				headers: {
					'X-API-Key': `${GET_API_SECRET()}`,
					'Content-Type': 'application/json; charset=utf-8',
					'Server': 'Python/3.6 aiohttp/3.6.2'
				}
			}).then((resp => {
				props.history.replace('/proof-login-info', props.location.state);
			}));
			
	}

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const toggle = () => {
		setModal(!modal);
		handleShow();
	}
	const issued = () => {
		setModal(!modal)
		handleClose();
		props.history.replace('/login-info')
	}
	const handleAuthorisation = () => {
		setLoader(true);
		getCredDefId();

	}

	return (
		<div className="Root" style={{ backgroundColor: '#FCF8F7', display: "flex" }}>
			<Container >
				<Col>
					<QRComponent value={JSON.stringify(props.location.state)} />
				</Col>
				<Col className="mt-3">
					{showAuthButton && !showLoader ?
						<Button outline color="primary" onClick={handleAuthorisation}>Autoriser émission</Button> : showLoader ? <Spinner /> : null}
				</Col>

				<div>
					<Modal isOpen={modal} toggle={toggle}
						show={show}
						onHide={handleClose}
						backdrop="static"
						keyboard={false} centered>
						<ModalHeader toggle={toggle} closeButton>Attestation d'authentification</ModalHeader>
						<ModalBody>Cette attestation d'authentification a été émise et autorisée.</ModalBody>
						<ModalFooter>
							<Button color="primary" onClick={issued}>OK</Button>{' '}
						</ModalFooter>
					</Modal>
				</div>
			</Container>
		</div>
	);
}

export default QRCodeLoginInformationContainer;