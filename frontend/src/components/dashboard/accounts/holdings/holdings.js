import React from 'react';

const Holdings = (props) => {
	const holdings = props.holdings;
	const prices = props.prices;

	return (
		// holdings & prices props are passed in from the Accounts component
		(holdings.length > 0) ? (
				<ul>
					{holdings.map(holding => {
						const price = parseFloat(prices[holding.symbol]).toFixed(2);
						const value = Math.round(price * holding.shares).toLocaleString();
						return (
							<li key={holding._id} className="holding">
								<div>
									<h2>{holding.symbol}</h2>
									<h2>{holding.shares}</h2>
									<h2>${price}</h2>
									<h2>${value}</h2>
								</div>
								<button >✏️</button>
								<button >❌</button>
							</li>
						)
					})}
				</ul>
		) : (
			null
		)
	);
}

export default Holdings;