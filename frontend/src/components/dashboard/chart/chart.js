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
		const data = chartAPI.getChartData(holdings, prices);
		console.log(data);
		return data;
	}

	render() {
		const data = this.renderChart();

		return (
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
	}
}
