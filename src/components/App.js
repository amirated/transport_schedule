import React, { Component } from 'react';

class App extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	      error: null,
	      isLoaded: false,
	      dummy: [],
	      geolocation: null
	    };
	  }

	componentDidMount() {
		this.getGeoLocation();
		this.fetchDummy();
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

	fetchDummy() {
	    fetch("https://api.myjson.com/bins/wrme3")
			.then(res => res.json())
			.then(
				(result) => {
					this.setState({
						isLoaded: true,
						dummy: result.a
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
					{(this.state.dummy && (this.state.dummy.map(function(elem){
						return (
							<div key={elem.c}>{elem.b}</div>
							);
					})))}
				</div>
			)
	}
}

export default App;