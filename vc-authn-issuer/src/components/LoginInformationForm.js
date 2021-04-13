import React, { useState }     from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useHistory }          from 'react-router-dom'
import '../assets/styles/Forms.css'

const LoginInformationForm = () => {

  const [username, setUsername] = useState('stpm01')
  const [email, setEmail] = useState('martin.st-pierre@sct.gouv.qc.ca')
  const [firstName, setFirstName] = useState('Martin')
  const [lastName, setLastName] = useState('St-Pierre')
  const history = useHistory();
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const handleRequest = () => {
    if (username === '' | 
        email === '' |
        firstName === '' |
        lastName === '') {
      toggle();
    } else {
      fetch(`/api/connections/create-invitation`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Server': 'Python/3.6 aiohttp/3.6.2', 
            'Access-Control-Allow-Origin': '*', 
            'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, POST, DELETE, OPTIONS', 
            'Access-Control-Allow-Headers': 'Content-Type', 
            'Access-Control-Max-Age': '86400'
          }
        }).then((
          resp => resp.json().then((
            data =>
              history.push('/qrcode',
                {
                  type: "did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/connections/1.0/invitation", 
                  data: {
                    username: username, 
                    email: email, 
                    first_name: firstName, 
                    last_name: lastName
                  },
                  invitation: data
                }
              )
          ))
        ))
    }
  }

  return (
    <Form className="text-center FormBox">
      <h1 className="mb-5 pb-4 mt-3 header">Identité Authentification</h1>
      <h4>Informations personnelles</h4>
      <br />
      <Row form>
      <Col md={4}>
          <FormGroup>
            <Label for="username">Nom usager</Label>
            <Input type="text" className="inputField rounded-pill" name="username" id="username" onChange={(e) => setUsername(e.target.value)} placeholder="Username" value={username} />
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="email">Courriel</Label>
            <Input type="text" className="inputField rounded-pill" name="email" id="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" value={email} />
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="firstName">Prénom</Label>
            <Input type="text" className="inputField rounded-pill" name="firstName" id="firstName" onChange={(e) => setFirstName(e.target.value)} placeholder="First name" value={firstName} />
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="lastName">Nom</Label>
            <Input type="text" className="inputField rounded-pill" name="lastName" id="lastName" onChange={(e) => setLastName(e.target.value)} placeholder="Last name" value={lastName} />
          </FormGroup>
        </Col>
        
      </Row>
      <Button onClick={handleRequest} outline color="primary" className="m-3">Émettre attestation</Button>
      <br />
      <br />
      <br />
      <br />
      <div>
        <Modal isOpen={modal} toggle={toggle} centered>
          <ModalHeader toggle={toggle}>Attestation d'authentification</ModalHeader>
          <ModalBody>Merci de remplir tous les champs.</ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={toggle}>OK</Button>{' '}
          </ModalFooter>
        </Modal>
      </div>
    </Form>
  );
}

export default LoginInformationForm;
