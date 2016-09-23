import React from 'react';
import filterData from '../../helpers/filterData';

// TODO: Find a more robust library component to handle more complex tasks.
// TODO: Separate table children into components.
// TODO: Prevent cross site scripting.
class Table extends React.Component {
    constructor(props) {
        super(props);
    }

    renderTds(item) {
        var tds = this.props.columns.map(function (column, idx) {
            if (item.hasOwnProperty(column.propName)) {
                var value = filterData(column.propName, item[column.propName]);
                return <td key={idx}>{value}</td>
            }
        });

        return tds;
    }

    renderRows() {
        var _this = this;
        if (!this.props.data) {
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

    renderTh(columns) {
        if (!columns || columns == 0) return;
        return this.props.columns.map(function (item, idx) {
            return <th key={idx}>{item.friendlyName}</th>
        });
    }

    render() {
        return (
            <table className="table table-striped table-bordered table-condensed">
                <thead>
                <tr>{this.renderTh(this.props.columns)}</tr>
                </thead>
                <tbody>
                {this.renderRows(this.props.data)}
                </tbody>
            </table>
        );
    }
}

export default Table;
