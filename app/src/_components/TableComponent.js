import React, { Component } from "react";

import { CSVLink } from "react-csv";

import classifyPoint from "robust-point-in-polygon";

class TableComponent extends Component {
  state = {
    loadingDownloadLink: false,
    downloadLink: false,
    downloadLeadNumber: null,
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
          <th>Download Leads</th>
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
          <td key={`column${{ idx }}`}>{row.name}</td>
          <td key={`edit${idx}`}>
            <button
              className="btn btn-dark"
              value={row._id}
              onClick={this.handleEdit.bind(this)}
            >
              Edit
            </button>
          </td>
          <td key={`delete${idx}`}>
            <button
              className="btn btn-dark"
              value={row._id}
              onClick={this.handleDelete.bind(this)}
            >
              Delete
            </button>
          </td>
          <td key={`download${idx}`}>
            <button
              className="btn btn-dark"
              value={row._id}
              onClick={this.handleDownload.bind(this)}
            >
              Download
            </button>
          </td>
        </tr>
      );
    });

    const downloadLink = this.state.downloadLink && (
      <div style={{ float: "right" }}>
        <CSVLink
          data={this.state.downloadData}
          filename={"my-file.csv"}
          className="btn btn-dark"
          target="_blank"
        >
          Download {this.state.downloadLeadNumber} Leads
        </CSVLink>
      </div>
    );

    const loadingComponent = this.state.loadingDownloadLink && (
      <div>
        <h3>Loading...</h3>
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
        {loadingComponent}
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
  async handleDownload(e) {
    try {
      this.setState({
        loadingDownloadLink: true,
        downloadLink: false
      });
      const data = this.props.data.rows.find(item => {
        return item._id.toString() === e.target.value.toString();
      });
      if (data && data.layer) {
        const polygonCoords = data.layer.getLatLngs().map(item => {
          return [item.lat, item.lng];
        });
        const leads = await this.getLeads(polygonCoords);
        if (leads.length) {
          this.setState({
            downloadLeadNumber: leads.length,
            loadingDownloadLink: false,
            downloadData: leads,
            downloadLink: true
          });
        } else {
          this.setState({
            downloadLeadNumber: null,
            loadingDownloadLink: false,
            downloadData: [],
            downloadLink: false
          });
          alert(`There are no leads in the selected cluster!`);
        }
      }
    } catch (err) {
      alert(err);
      this.setState({
        downloadLeadNumber: null,
        loadingDownloadLink: false,
        downloadData: [],
        downloadLink: false
      });
    }
  }

  getLeads(polygonCoords) {
    return new Promise((resolve, reject) => {
      import("../rawdata/leads.json")
        .then(data => {
          if (data && data.default) {
            const validatedData = data.default.filter(item => {
              if (item.lat && item.lng) {
                const classification = classifyPoint(polygonCoords, [
                  item.lat,
                  item.lng
                ]);
                return classification === -1 || classification === 0;
              } else {
                return false;
              }
            });
            resolve(validatedData);
          } else {
            resolve([]);
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}

export default TableComponent;
