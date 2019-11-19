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
			<PieChart width={550} height={350} onMouseEnter={this.onPieEnter}>
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
				<Legend 
					layout="vertical" verticalAlign="middle" align="right" height={100}
				/>
			</PieChart>
		);

		const allocation = {};
			data.forEach(pair => {
				allocation[pair.name] = pair.value;
			});
		
		let stocks = allocation["Stocks"] ? `Stock-picking is extremely risky. Don't put your eggs in one basket - diversify!` : null;
		let eM = allocation["Emerging Markets"] ? "Emerging Markets is risky for your portfolio. We recommend reallocating to broad market equity ETFs like IVV (US) or VXUS (Foreign)." : null;
		let bonds = allocation["Bonds"] ? "Bonds are very conservative (less risk = less return). You're young! Take on more risk now to get higher returns." : null;
		let smallCap = allocation["Small Cap"] ? "Small Cap is a risky asset class for your portfolio. We recommend reallocating to broad market equity ETFs like IVV (US) or VXUS (Foreign)." : null;
		let other = allocation["Other"] ? "We are unable to classify some of your assets, it is likely these investments are not appropriate for your retirement portfolio." : null;
		let US = allocation["US Equity"] < 55 ? "US Equity funds are a great asset class to invest in, but it looks like you're underallocated. Run the algorithm to see trade recs." : "US Equity funds are a great asset class to invest in, but it looks like you're overallocated. Run the algorithm to see trade recs.";
		let foreign = allocation["Foreign Equity"] < 45 ? "Foreign Equity funds are a great asset class to invest in, but it looks like you're underallocated. Run the algorithm to see trade recs." : "Foreign Equity funds are a great asset class to invest in, but it looks like you're overallocated. Run the algorithm to see trade recs.";

		const analysis = (
			<div className="analysis">
				<h1>Asset Allocation Analysis</h1>
				<h2>{stocks}</h2>
				<h2>{eM}</h2>
				<h2>{smallCap}</h2>
				<h2>{bonds}</h2>
				<h2>{other}</h2>
				<h2>{US}</h2>
				<h2>{foreign}</h2>
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
