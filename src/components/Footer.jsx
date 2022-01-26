import React, { useContext } from 'react';

const date = new Date();
const currentYear = date.getFullYear();

const Footer = () => {
	return <p className='footer'>&copy; {currentYear} TKDevDesign.com</p>;
};

export default Footer;
