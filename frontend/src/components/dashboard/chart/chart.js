import React, { PureComponent } from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import * as chartAPI from '../../../util/chart_util';

const COLORS = ['#00C49F', '#FFBB28', '#FF8042', '#0088FE'];

export default class AllocChart extends PureComponent {
	constructor(props) {
		super(props);
		this.state = { assets: {}, currentAllocations: {}	};
		this.renderChart = this.renderChart.bind(this);
	}
	
	componentWillReceiveProps(prevProps) {
		this.setState({assets: prevProps.assets});
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

		return (
			<PieChart width={500} height={300} onMouseEnter={this.onPieEnter}>
				<Pie
					data={data}
					cx="50%"
					cy="50%"
					innerRadius={60}
					outerRadius={120}
					fill="#8884d8"
					paddingAngle={3}
					dataKey="value"
					nameKey="name"
					label
				>
					{
						data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
					}
				</Pie>
				<Tooltip />
				<Legend verticalAlign="top" height={36} />
			</PieChart>
		);
	}
}
