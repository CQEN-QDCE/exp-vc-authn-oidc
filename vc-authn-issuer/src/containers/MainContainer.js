import React              from 'react';
import { Container }      from 'reactstrap';
import JumbotronComponent from '../components/JumbotronComponent';

function MainContainer() {
	return (

		< Container fluid style={{ backgroundColor: '#FCF8F7' }}>
			<JumbotronComponent />
		</Container >
	);
}

export default MainContainer;