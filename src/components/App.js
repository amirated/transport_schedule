import React, { Component } from 'react';

class App extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	      error: null,
	      isLoaded: false,
	      dummy: []
	      
	    };
	  }

	  componentDidMount() {
	    this.fetchDummy();
	    // dispatch({ type: AGENT_LIST_FETCHED })
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
	          console.log(this.state.dummy);
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
					<h1>My App in React</h1>
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