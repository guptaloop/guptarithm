import React from 'react';

class Footer extends React.Component {

	render() {
		return (
			<div className="footer">
				<div>
					<a className="github"
						href="https://github.com/guptaloop/Ravenhood">
						<i className="fab fa-3x fa-github" />
					</a>
					<a className="linkedin"
						href="https://www.linkedin.com/in/abhigupta7a/">
						<i className="fab fa-3x fa-linkedin" />
					</a>
				</div>
				<h3>
					This site is intended for educational purposes only!
				</h3>
			</div>
		);
	}
}

export default Footer;