import React, { Component } from "react";

import { CSVLink } from "react-csv";

class TableComponent extends Component {
  state = {
    downloadLink: false,
    downloadData: []
  };
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
          {/* <td key={`download${idx}`}>
            <button value={row._id} onClick={this.handleDownload.bind(this)}>
              Download
            </button>
          </td> */}
        </tr>
      );
    });

    const downloadLink = this.state.downloadLink && (
      <div>
        <CSVLink
          data={this.state.downloadData}
          filename={"my-file.csv"}
          className="btn btn-primary text-white"
          target="_blank"
        >
          Download me
        </CSVLink>
      </div>
    );

    // Decorate with Bootstrap CSS
    return (
      <div>
        <table className="table table-bordered table-hover" width="100%">
          {tableHeaders}
          <tbody>{tableBody}</tbody>
        </table>
        {downloadLink}
      </div>
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
  handleDownload(e) {
    this.setState({
      downloadData: [
        { firstname: "Ahmed", lastname: "Tomi", email: "ah@smthing.co.com" },
        { firstname: "Raed", lastname: "Labes", email: "rl@smthing.co.com" },
        { firstname: "Yezzi", lastname: "Min l3b", email: "ymin@cocococo.com" }
      ],
      downloadLink: true
    });
  }
}

export default TableComponent;
