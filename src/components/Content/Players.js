import React from 'react';
import Form from '../Form/Form';
import Table from '../Table/Table';
import $ from 'jquery';
import errorMessages from '../../helpers/errorMessages';
import AddUserForm from '../Form/AddUserForm';

class Players extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            players: [],
            errorMessage: '',
            xhrProcessing: false
        };

    }

    componentDidMount() {
        var players = this.getPlayers();
        this.setState({players: players});
    }



    getPlayers() {
        var _this = this;
        this.setState({xhrProcessing: true});
        var xhr = $.get('/getPlayers');

        xhr.done(function (data) {
            // TODO: Error handling here. What else can come back?
            _this.setState({players: data});
        });

        xhr.fail(function () {
            _this.setState('errorMessage', errorMessages.UNKNOWN)
        });

        xhr.always(function () {
            _this.setState({xhrProcessing: false});
        });
    }


    render() {
        return (
            <div>
                <h2>Add a new player</h2>
                <AddUserForm onSuccess={this.getPlayers.bind(this)}/>
                <h2>Players</h2>
                <div>{this.state.errorMessage}</div>
                <Table data={this.state.players} columns={[{propName: 'name', friendlyName: 'Name'}]}/>
            </div>
        );
    }
}

export default Players;
