import React, { PureComponent } from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import * as algoAPI from '../../../util/algo_util';


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

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
		const assets = this.props.assets;
		const holdings = this.props.holdings;
		const prices = this.props.prices;
		return (
			algoAPI.getPortfolioValue(assets, holdings, prices, true)
		);
	}

	render() {
		const data = this.renderChart();
		console.log(data);
		// const data = [
		// 	{ name: 'Group A', value: 400 },
		// 	{ name: 'Group C', value: 1400 },
		// 	{ name: 'Group B', value: 400 },
		// 	// { name: 'Group D', value: 0 }
		// ];
		return (
			<PieChart width={500} height={300} onMouseEnter={this.onPieEnter}>
				<Pie
					data={data}
					// cx={120}
					// cy={200}
					innerRadius={40}
					outerRadius={100}
					fill="#8884d8"
					paddingAngle={3}
					dataKey="value"
				>
					{
						data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
					}
				</Pie>
			</PieChart>
		);
	}
}
