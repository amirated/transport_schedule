import React, { Component } from 'react';
// import { connect } from 'react-redux';
import { Table } from 'antd';


class SheduleView extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	      error: null,
	      isLoaded: false,
	      schedule_data: {

	      }
	    };
	  }

	componentDidMount() {
		
		// dispatch({ type: AGENT_LIST_FETCHED })
	}

	// onChange = (pagination, filters, sorter) => {
	//     console.log('params', pagination, filters, sorter);
	// };

	render () {
		return (
				<Table rowKey={record => record.id} columns={this.props.columns} dataSource={this.props.schedule} onChange={this.onChange} />
			)
	}
}

export default SheduleView;