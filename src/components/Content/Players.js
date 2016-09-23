import React from 'react';
import Table from '../Table/Table';
import AddPlayerForm from '../Form/AddPlayerForm';

class Players extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errorMessage: '',
            xhrProcessing: false
        };

    }

    render() {
        return (
            <div id="players">
                <h2>Players</h2>
                <div>{this.state.errorMessage}</div>
                <Table data={this.props.players}
                       columns={[{propName: 'name', friendlyName: 'Name'},
                           {propName: 'win', friendlyName: 'Wins'},
                           {propName: 'loss', friendlyName: 'Losses'},
                           {propName: 'ratio', friendlyName: 'Ratio'}]}/>
                <h3> Add a new player </h3>
                <AddPlayerForm onSuccess={this.props.handleUpdate}/>
            </div>
        );
    }
}

export default Players;
