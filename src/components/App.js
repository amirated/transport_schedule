import React, { Component } from 'react';
import SheduleView from './SheduleView';

import { Layout, Menu, Breadcrumb } from 'antd';

const { Header, Content, Footer } = Layout;

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
				// {
				// 	title: 'Mode',
				// 	dataIndex: 'modeName',
				// 	key: 'modeName'
				// },
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
				},
				{
					title: 'Time to Stn.',
					dataIndex: 'timeToStation',
					key: 'timeToStation'
				}
			]
	    }
	}

	componentDidMount() {
		this.getGeoLocation();
		this.interval = setInterval(() => {
			this.fetchSchedule();
		}, 5000);
		
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
				<Layout>
				    <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
				      <div className="logo" />
				      <Menu
				        theme="dark"
				        mode="horizontal"
				        defaultSelectedKeys={['1']}
				        style={{ lineHeight: '64px' }}
				      >
				        <Menu.Item key="1">Schedule</Menu.Item>
				      </Menu>
				    </Header>
				    <Content style={{ padding: '0 50px', marginTop: 64 }}>
				      <Breadcrumb style={{ margin: '16px 0' }}>
				        <Breadcrumb.Item>Transport Schedule</Breadcrumb.Item>
				      </Breadcrumb>
				      <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>
				      
	 				<h1>Geolocation: </h1>
	 				{(this.state.geolocation && (
						<div>
							{'Latitude: ' + this.state.geolocation.lat.toFixed(2) + ',  Longitude: ' + this.state.geolocation.long.toFixed(2)}
						</div>
						)
					)}
					<SheduleView columns={this.state.columns} schedule={this.state.schedule_data}/>
				</div>
				    </Content>
				    <Footer style={{ textAlign: 'center' }}>
				    	Data source: https://api.tfl.gov.uk
				    </Footer>
				</Layout>
			)
	}
}

export default App;