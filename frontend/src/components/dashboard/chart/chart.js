import React, { PureComponent } from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import * as chartAPI from '../../../util/chart_util';

const COLORS = ['#00C49F','#FFBB28','#FF8042','#0088FE',
	'#800080', '#87CEFA',	'#FF0000'];

export default class AllocChart extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {};
		this.renderChart = this.renderChart.bind(this);
	}

	renderChart() {
		const prices = this.props.prices;
		let holdings = [];
		if (this.props.accounts.length > 0) {
			(this.props.accounts).forEach(account => {
				(account.holdings).forEach(holding => {
					holdings.push(holding);
				});
			});
		}
		return chartAPI.getChartData(holdings, prices);
	}

	render() {
		const data = this.renderChart();
		const pieChart = (
			<PieChart width={450} height={300} onMouseEnter={this.onPieEnter}>
				<Pie
					data={data}
					cx="50%"
					cy="50%"
					innerRadius={50}
					outerRadius={100}
					fill="#8884d8"
					paddingAngle={4}
					dataKey="value"
					nameKey="name"
				// label
				>
					{
						data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
					}
				</Pie>
				<Tooltip />
				<Legend verticalAlign="bottom" height={60} />
			</PieChart>
		);

		const allocation = {};
			data.forEach(pair => {
				allocation[pair.name] = pair.value;
			});
		
		let stocks = allocation["Stocks"] ? "Investing in individual company stocks is extremely risky, we recommend diversifying your assets (don't put your eggs in one basket!)" : null;
		let eM = allocation["Emerging Markets"] ? "Emerging Markets is a risky asset class for your portfolio, we recommend reallocating to Large Cap US or Foreign funds" : null;
		let bonds = allocation["Fixed Income"] ? "Fixed Income is too conservative for your portfolio, you are likely missing out on significant returns by taking less risk here." : null;
		let smallCap = allocation["Small Cap"] ? "Small Cap is a risky asset class for your portfolio, we recommend reallocating to Large Cap US or Foreign funds." : null;
		let other = allocation["Other"] ? "We are unable to classify some of your assets, it is likely these assets are not appropriate for your portfolio." : null;

		const analysis = (
			<div className="analysis">
				<h1>Asset Allocation Analysis</h1>
				<h2>{stocks}</h2>
				<h2>{eM}</h2>
				<h2>{bonds}</h2>
				<h2>{smallCap}</h2>
				<h2>{other}</h2>
			</div>
		);
		return (
			<div>
				{pieChart}
				{analysis}
			</div>
		);
		
	}
}
