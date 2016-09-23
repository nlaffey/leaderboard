import React from 'react';
import Table from '../Table/Table';

class Results extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Table data={this.props.results}
                   columns={[
                       {propName: 'timestamp', friendlyName: 'Date'},
                       {propName: 'winners', friendlyName: 'Winner'},
                       {propName: 'losers', friendlyName: 'Loser'},
                   ]}/>
        );
    }
}

export default Results;
