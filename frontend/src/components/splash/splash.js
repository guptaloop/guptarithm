import React from 'react';
import { updatePrices, logSymbols } from '../../util/price_api_util';

class Splash extends React.Component {

	render() {
		// updatePrices();
		// logSymbols();
		return (
			<div className="hero-banner">
				<div className="hero-image">
					<div>
						<p>Welcome to Guptarithm</p>
						<h1>The free DIY investment algorithm</h1>
					</div>
				</div>
			</div>
		);
	}
}

export default Splash;