import React from 'react';
import { Button } from 'reactstrap';
import '../assets/styles/JumbotronComponent.css'

const JumbotronComponent = () => {
  return (
    <header>
      <div class="pt-5 container-fluid text-center" >

        <div class="row" >
          <div class="col-md-7 col-sm-12">
            <h1>Émmeteur d'attestation</h1>
            
            <p className="lead">
            Ce site sert à démontrer l'utilisation d'un portefeuille numérique pour émettre une attestation basé sur le concept du "self-sovereign identity". 
              </p>
            <Button className="mt-2" outline color="primary" size="lg" onClick={() => window.open("https://www.quebec.ca/", "_blank")} >En savoir plus</Button>
          </div>
          <div class="col-md-5 col-sm-12">
            &nbsp;
          </div>
        </div>
      </div>
    </header>
  );
};


export default JumbotronComponent;