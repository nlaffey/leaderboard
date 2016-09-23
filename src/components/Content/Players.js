import React from 'react';
import Table from '../Table/Table';
import AddPlayerForm from '../Form/AddPlayerForm';
import $ from 'jquery';

class Players extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errorMessage: '',
            xhrProcessing: false
        };

    }

    clearData() {
        var _this = this;
        var xhr = $.get('/clearData');
        xhr.always(function () {
            _this.props.handleUpdate();
        });
    }

    render() {
        return (
            <div id="players">
                <h2>Players</h2>
                    <Table data={this.props.players}
                           columns={[{propName: 'name', friendlyName: 'Name'},
                               {propName: 'win', friendlyName: 'Wins'},
                               {propName: 'loss', friendlyName: 'Losses'},
                               {propName: 'ratio', friendlyName: 'Ratio'}]}/>
                    <button id="clearData" onClick={this.clearData.bind(this)} className="btn btn-danger">Clear data
                    </button>
                <h3> Add player </h3>
                <AddPlayerForm onSuccess={this.props.handleUpdate}/>
            </div>
        );
    }
}

export default Players;
