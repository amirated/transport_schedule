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
			schedule_data: [],
			columns: [
				{
					id: 'ID',
					dataIndex: 'vehicleId',
					key: 'vehicleId'
				},
				{
					title: 'Line ID',
					dataIndex: 'lineId',
					key: 'lineId'
				},
				{
					title: 'Destination',
					dataIndex: 'destinationName',
					key: 'destinationName'
				},
				{
					title: 'Mode',
					dataIndex: 'modeName',
					key: 'modeName'
				},
				{
					title: 'Station Name',
					dataIndex: 'stationName',
					key: 'stationName'
				},
				{
					title: 'Expected Arrival',
					dataIndex: 'expectedArrival',
					key: 'expectedArrival'
				},
				{
					title: 'Expected Departure',
					dataIndex: 'timeToLive',
					key: 'timeToLive'
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
		fetch("https://api.tfl.gov.uk/StopPoint/490005183E/arrivals")
			.then(res => res.json())
			.then(
				(result) => {
					this.setState({
						isLoaded: true,
						schedule_data: result
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