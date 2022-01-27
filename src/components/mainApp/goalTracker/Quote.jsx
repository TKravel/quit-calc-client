import React, { useEffect, useState } from 'react';

export const Quote = () => {
	const [quote, setQuote] = useState({ author: '', quote: '' });
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
					<p className='quote'>"{quote.quote}"</p>
				</blockquote>
				<figcaption className='author'>
					- <cite>{quote.author}</cite>
				</figcaption>
			</figure>
		</div>
	);
};
