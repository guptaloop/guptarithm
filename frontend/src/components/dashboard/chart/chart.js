import React, { PureComponent } from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import * as chartAPI from '../../../util/chart_util';
import {assetAnalysis} from './analysis';

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

	renderDeepDive(allocation) {

		const analysis = assetAnalysis(allocation);
	
		return (
			<div className="deep-dive">
				<h1>Deep Dive</h1>
				<h2>{analysis.stocks}</h2>
				<h2>{analysis.eM}</h2>
				<h2>{analysis.smallCap}</h2>
				<h2>{analysis.bonds}</h2>
				<h2>{analysis.other}</h2>
				<h2>{analysis.US}</h2>
				<h2>{analysis.foreign}</h2>
			</div>
		);
	}

	render() {
		const data = this.renderChart();
		const pieChart = (
			<PieChart width={550} height={300} onMouseEnter={this.onPieEnter}>
				<Pie
					data={data}
					cx="50%"
					cy="50%"
					innerRadius={60}
					outerRadius={120}
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

		// generates Deep Dive analysis section
		const allocation = {};
			data.forEach(pair => {
				allocation[pair.name] = pair.value;
			});
		const deepDive = this.renderDeepDive(allocation); 

		return (
			<>
				<div className="aa-div">
					<h1>Asset Allocation Analysis</h1>
					{pieChart}
				</div>
				<div>
					{deepDive}
				</div>
			</>
		);
		
	}
}
