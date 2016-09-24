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
        var confirm = window.confirm("Are you sure you want to clear all game history and people?");
        if (!confirm) return;
        var _this = this;
        var xhr = $.get('/clearData');
        xhr.always(function () {
            _this.props.handleUpdate();
        });
    }

    render() {
        return (
            <div id="players" className="col-md-12">
                <div className="col-xs-6 table-top-header"><h2>Players</h2></div>
                <div className="col-xs-6 text-right">
                    <button id="clearData" onClick={this.clearData.bind(this)} className="btn btn-danger">Clear data
                    </button>
                </div>
                <Table data={this.props.players}
                       columns={[{propName: 'name', friendlyName: 'Name'},
                           {propName: 'win', friendlyName: 'Wins'},
                           {propName: 'loss', friendlyName: 'Losses'},
                           {propName: 'ratio', friendlyName: 'Ratio'}]}/>


            </div>
        );
    }
}

export default Players;
