import React from 'react';

// TODO: Find a more robust library component to handle more complex tasks.
// TODO: Separate table children into components.
// TODO: Prevent cross site scripting.
class Table extends React.Component {
    constructor(props) {
        super(props);
    }

    renderTds(item) {
        var tds = [];
        var key = 0;

        var columns = this.props.columns.map(function (column) {
            return column.propName;
        });

        for (var prop in item) {
            if (item.hasOwnProperty(prop) && columns.indexOf(prop) > -1) {
                tds.push(<td key={key}>{item[prop]}</td>)
                key++
            }
        }
        return tds;
    }

    renderRows() {
        var _this = this;
        if (!this.props.data || this.props.data.length === 0) {
            return (<tr>
                <td>No data</td>
            </tr>);
        }

        return this.props.data.map(function (item, idx) {
            return (<tr key={idx}>
                {_this.renderTds(item)}
            </tr>)
        });
    }

    renderTh() {
        if (!this.props.columns || this.props.columns.length == 0) return;
        return this.props.columns.map(function (item, idx) {
            return <th key={idx}>{item.friendlyName}</th>
        });
    }

    render() {
        return (
            <table>
                <thead>
                <tr>{this.renderTh()}</tr>
                </thead>
                <tbody>
                {this.renderRows(this.props.data)}
                </tbody>
            </table>
        );
    }
}

export default Table;
