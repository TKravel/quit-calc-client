import React, { useEffect, useState } from 'react';

export const Quote = () => {
	const [quote, setQuote] = useState({ auther: '', quote: '' });
	useEffect(() => {
		fetch(`${process.env.REACT_APP_SERVER}/quote/getQuote`, {})
			.then((response) => response.json())
			.then((data) => {
				setQuote(data);
			})
			.catch((err) => {
				if (err) {
					console.log(err);
				}
			});
	}, []);

	return (
		<div className='motivational-quote'>
			<figure>
				<blockquote cite='RapidAPI Inspiring quotes'>
					<p>"{quote.quote}"</p>
				</blockquote>
				<figcaption>
					-{quote.auther} <cite>Brave New World</cite>
				</figcaption>
			</figure>
		</div>
	);
};
