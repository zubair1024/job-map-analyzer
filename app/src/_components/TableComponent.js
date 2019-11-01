import React, { Component } from "react";

class TableComponent extends Component {
  state = {};
  render() {
    const dataRows = this.props.data.rows;

    const tableHeaders = (
      <thead>
        <tr>
          <th>Show</th>
          <th>Name</th>
          <th>Edit</th>
          <th>Delete</th>
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
          <td key={`column${{ idx }}`}>{row.Group}</td>
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
