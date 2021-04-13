import React from 'react';
import { Col, FormGroup, Input, Label } from 'reactstrap';

export default function ProofLoginInformationForm(props) {
  const { username,
          email,
          first_name,
          last_name
  } = props.data.data

  return (
    <Col lg={5}>
      <h5 className="mb-4 pb-4 mt-2 text-center">Information de l'attestation d'authentification</h5>
      <FormGroup row>
        <Label for="username" sm={3}>
          Nom d'utilisateur
        </Label>
        <Col sm={10}>
          <Input type="text" name="username" id="username" value={username} disabled />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="email" sm={3}>
          Courriel
        </Label>
        <Col sm={10}>
          <Input type="text" name="email" id="email" value={email} disabled />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="firstName" sm={3}>
          Prénom
        </Label>
        <Col sm={10}>
          <Input type="text" name="firstName" id="firstName" value={first_name} disabled />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="lastName" sm={3}>
          Nom
        </Label>
        <Col sm={10}>
          <Input type="text" name="lastName" id="lastName" value={last_name} disabled />
        </Col>
      </FormGroup>
      <br />
    </Col>
  );
}
