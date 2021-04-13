import React from 'react';
import { Container, Col, Row } from 'reactstrap';
import Success from '../assets/images/success.png';
import ProofLoginInformationForm  from '../components/ProofLoginInformationForm';
import '../assets/styles/ProofContainer.css';

const ProofLoginInformationContainer = (props) => {
  return (
    <Container className="my-5">
      <Row form>
        <ProofLoginInformationForm data={props.location.state} />
        <Col lg={7} className="text-center proof-left-col">
          <img className="text-center w-25" src={Success} alt="proof-banner" />
          <h4 className="ml-md-5 pb-4 mt-4">
            Attestation d'authentification a été émise avec success. 
          </h4>
        </Col>
      </Row>
    </Container>
  );
};

export default ProofLoginInformationContainer;
