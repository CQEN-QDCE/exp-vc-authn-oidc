import React from 'react'
import { Container } from 'reactstrap'

function FooterComponent() {
	return (
		<Container fluid className="fixed-bottom text-center p-3 border-top" style={{ backgroundColor: '#fff' }}>
			© Centre Québecois d'Excellence Numérique, Quebec 2020.
			Tous les droits réservés.
		</Container>
	)
}

export default FooterComponent
