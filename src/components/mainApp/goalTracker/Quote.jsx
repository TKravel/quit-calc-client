import React, { useEffect, useState } from 'react';
import { Spinner } from '../../icons/Spinner';

export const Quote = () => {
	const [quote, setQuote] = useState({ author: '', quote: '' });
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		fetch(`${process.env.REACT_APP_SERVER}/quote/getQuote`, {})
			.then((response) => response.json())
			.then((data) => {
				setQuote(data);
				setIsLoading(false);
			})
			.catch((err) => {
				if (err) {
					console.log(err);
					setError('Error loading quote');
					setIsLoading(false);
				}
			});
	}, []);

	if (isLoading) {
		return (
			<div className='motivational-quote'>
				<Spinner styles='form-spinner' />
			</div>
		);
	} else if (error !== '') {
		return (
			<div className='motivational-quote'>
				<p className='error-msg'>{error}</p>
			</div>
		);
	} else {
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
	}
};
