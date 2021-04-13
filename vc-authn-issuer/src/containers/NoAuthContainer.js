import React               from 'react';
import { Form, Container } from 'reactstrap';

function NoAuthContainer() {
	return (
		<Container className="d-flex pt-5">
			<Form className="w-50 mx-auto mt-5 text-center pt-5">
				<h1>You are lost somewhere...</h1>
                <h3>You shouldn't be here!</h3>
			</Form>
		</Container>
	);
}

export default NoAuthContainer