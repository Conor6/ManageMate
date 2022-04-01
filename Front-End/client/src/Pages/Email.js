import React from 'react'
import {useState} from 'react';

function Email() {
	const [ sent, setSent ] = useState(false)
	const [ text, setText ] = useState("")
	const handleSend = async (e) => {
		setSent(true)
		try {
            const data = {
      
                text: text,
            }
			const body = data;

            const response = await fetch("http://localhost:3001/send_mail", {
                headers : { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                   },
                method: "POST",
                body: JSON.stringify(body),

            });

		} catch (error) {
			console.error(error)
		}
	}

	return (
		<div className="App">
			{!sent ? (
				<form>
					<input type="text" value={text} onChange={(e) => setText(e.target.value)} />

					<button type="button" onClick={handleSend}>Send Email</button>
				</form>
			) : (
				<h1>Email Sent</h1>
			)}
		</div>
	)
}

export default Email;