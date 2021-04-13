import React from 'react';
import QRCode from 'qrcode.react'

function QRComponent(props) {
	const content = JSON.parse(props.value); 
	return (
        <QRCode value={content.invitation.invitation_url} size={400}/>
	);
}

export default QRComponent;