import React, { Component } from 'react';
import SheduleView from './SheduleView';


class App extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
			error: null,
			isLoaded: false,
			dummy: [],
			geolocation: null,
			schedule_data: [
				{
					key: '1',
					name: 'John Brown',
					age: 32,
					address: 'New York No. 1 Lake Park',
					tags: ['nice', 'developer'],
				},
				{
					key: '2',
					name: 'Jim Green',
					age: 42,
					address: 'London No. 1 Lake Park',
					tags: ['loser'],
				},
				{
					key: '3',
					name: 'Joe Black',
					age: 32,
					address: 'Sidney No. 1 Lake Park',
					tags: ['cool', 'teacher'],
				},
			],
			columns: [
				{
				    title: 'Name',
				    dataIndex: 'name',
				    key: 'name',
				    render: text => <a>{text}</a>,
				},
				{
				    title: 'Age',
				    dataIndex: 'age',
				    key: 'age',
				},
				{
				    title: 'Address',
				    dataIndex: 'address',
				    key: 'address',
				}
			]
	    }
	}

	componentDidMount() {
		this.getGeoLocation();
		this.fetchSchedule();
		// dispatch({ type: AGENT_LIST_FETCHED })
	}

	getGeoLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				this.setState({
					geolocation: {
						lat: position.coords.latitude,
						long: position.coords.longitude
					}
				})
			});
		} else { 
			this.state.geolocation = null;
		}
	}

	fetchSchedule() {
	    fetch("https://api.tfl.gov.uk/Line/Bakerloo/Timetable/9400ZZLUBST/to/9400ZZLUBST")
			.then(res => res.json())
			.then(
				(result) => {
					this.setState({
						isLoaded: true,
						schedule: result
					});
				},
				(error) => {
					this.setState({
						isLoaded: true,
						error
					});
				}
			)
	}

	render () {
		return (
				<div>
					<h1>Geolocation: </h1>
					{(this.state.geolocation && (
						<div>
							{this.state.geolocation.lat + '  ' + this.state.geolocation.long}
						</div>
						)
					)}
					<SheduleView columns={this.state.columns} schedule={this.state.schedule_data}/>
				</div>
			)
	}
}

export default App;