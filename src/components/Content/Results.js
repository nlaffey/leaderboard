import React from 'react';
import Table from '../Table/Table';

class Results extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="results" className="col-md-12">
                <h2>Game results</h2>
                <Table data={this.props.results}
                       columns={[
                           {propName: 'timestamp', friendlyName: 'Date'},
                           {propName: 'winner', friendlyName: 'Winner'},
                           {propName: 'loser', friendlyName: 'Loser'},
                       ]}/>
            </div>
        );
    }
}

export default Results;
