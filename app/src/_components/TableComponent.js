import React, { Component } from "react";

class TableComponent extends Component {
  state = {};
  render() {
    // Data
    const dataColumns = this.props.data.columns;
    const dataRows = this.props.data.rows;

    const tableHeaders = (
      <thead>
        <tr>
          <th key="showAll">Show</th>
          {dataColumns.map(function(column, idx) {
            return <th key={`header${idx}`}>{column}</th>;
          })}
          <th key="editall">Edit</th>
          <th key="deleteall">Delete</th>
        </tr>
      </thead>
    );

    const tableBody = dataRows.map((row, idx) => {
      return (
        <tr key={idx}>
          <td key={`show${idx}`}>
            <input
              type="checkbox"
              value={row._id}
              onChange={this.handleShow.bind(this)}
            />
          </td>
          {dataColumns.map(function(column, idx) {
            return <td key={`column${{ idx }}`}>{row[column]}</td>;
          })}
          <td key={`edit${idx}`}>
            <button value={row._id} onClick={this.handleEdit.bind(this)}>
              Edit
            </button>
          </td>
          <td key={`delete${idx}`}>
            <button value={row._id} onClick={this.handleDelete.bind(this)}>
              Delete
            </button>
          </td>
        </tr>
      );
    });

    // Decorate with Bootstrap CSS
    return (
      <table className="table table-bordered table-hover" width="100%">
        {tableHeaders}
        <tbody>{tableBody}</tbody>
      </table>
    );
  }

  handleShow(e) {
    this.props.handleShow(e);
  }
  handleEdit(e) {
    this.props.handleEdit(e);
  }
  handleDelete(e) {
    this.props.handleDelete(e);
  }
}

export default TableComponent;
