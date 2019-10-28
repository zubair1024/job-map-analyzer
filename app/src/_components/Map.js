import React, { Component } from "react";
import "./Map.css";

import TableComponent from "./TableComponent";

class Map extends Component {
  state = {
    tableData: {
      columns: ["Group"],
      rows: [
        {
          _id: "1234",
          Group: "Group Name 1"
        }
      ]
    }
  };

  render() {
    return (
      <div>
        <div id="map"></div>
        <div id="sidebar">
          <h1>Groups</h1>
          <TableComponent
            data={this.state.tableData}
            handleShow={this.handleShow}
            handleEdit={this.handleEdit}
            handleDelete={this.handleDelete}
          />
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.run();
  }

  handleShow(e) {
    console.log(e.target.value);
  }
  handleEdit(e) {
    console.log(e.target.value);
  }

  handleDelete(e) {
    console.log(e.target.value);
  }

  async run() {
    let postcodeWithRegions = await this.getGroupToRegions();
    this.setState({
      postcodeWithRegions: postcodeWithRegions
    });
    this.onLoad();
    this.addControls();
  }

  getLeads() {
    return new Promise((resolve, reject) => {
      import("../rawdata/leads.json")
        .then(data => {
          if (data && data.default) {
            const validatedData = data.default.filter(item => {
              return item.lat && item.lng;
            });
            console.log(`render leads ${validatedData.length}`);
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

  getGroupToRegions() {
    return new Promise((resolve, reject) => {
      import("../rawdata/postcodeWithRegions.json")
        .then(data => {
          if (data && data.default) {
            const validatedData = data.default.filter(item => {
              return item.lat && item.lng;
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

  getE5Engineers() {
    return new Promise((resolve, reject) => {
      import("../rawdata/e5Engineers.json")
        .then(data => {
          if (data && data.default) {
            const validatedData = data.default.filter(item => {
              return item.lat && item.lng;
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

  getBoilerJobs() {
    return new Promise((resolve, reject) => {
      import("../rawdata/boilerJobs.json")
        .then(data => {
          if (data && data.default) {
            const validatedData = data.default.filter(item => {
              return item.lat && item.lng;
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

  getServiceJobs() {
    return new Promise((resolve, reject) => {
      import("../rawdata/serviceJobs.json")
        .then(data => {
          if (data && data.default) {
            const validatedData = data.default.filter(item => {
              return item.lat && item.lng;
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

  async renderE5Engineers() {
    const type = "e5Engineer";
    try {
      const arrayContent = await this.getE5Engineers();
      if (arrayContent && arrayContent.length) {
        let markers = [];
        arrayContent.forEach(item => {
          if (item.lat && item.lng) {
            const marker = window.L.marker([item.lat, item.lng], {
              icon: this.markerIcon(type)
            }).addTo(this.mapElement);
            marker.bindPopup(this.markerPopupContent(type, item));
            markers.push(marker);
          }
        });
        this.setState({
          [type]: markers
        });
      } else {
        throw new Error(`No ${type} to be rendered`);
      }
    } catch (err) {
      console.error(err);
      alert(`Error while rendering ${type}`);
    }
  }

  async renderE5EngineerCircles() {
    const type = "e5Engineer";
    try {
      const arrayContent = await this.getE5Engineers();
      if (arrayContent && arrayContent.length) {
        let circles = [];
        arrayContent.forEach(item => {
          if (item.lat && item.lng) {
            let circle = window.L.circle([item.lat, item.lng], 40233.6).addTo(
              this.mapElement
            );
            circles.push(circle);
          }
        });
        this.setState({
          [`${type}Circle`]: circles
        });
      } else {
        throw new Error(`No ${type} to be rendered`);
      }
    } catch (err) {
      console.error(err);
      alert(`Error while rendering ${type}`);
    }
  }

  async renderBoilerJobs() {
    const type = "boilerJob";
    try {
      const arrayContent = await this.getBoilerJobs();
      if (arrayContent && arrayContent.length) {
        let markerLayer = window.L.markerClusterGroup();
        let markers = [];
        arrayContent.forEach(item => {
          if (item.lat && item.lng) {
            const marker = window.L.marker([item.lat, item.lng], {
              icon: this.markerIcon(type)
            });
            marker.bindPopup(this.markerPopupContent(type, item));
            markerLayer.addLayer(marker);
            markers.push(marker);
          }
        });
        markerLayer.addTo(this.mapElement);
        this.setState({
          [`${type}Cluster`]: markerLayer,
          [type]: markers
        });
      } else {
        throw new Error(`No ${type} to be rendered`);
      }
    } catch (err) {
      console.error(err);
      alert(`Error while rendering ${type}`);
    }
  }

  async renderServiceJobs() {
    const type = "serviceJob";
    try {
      const arrayContent = await this.getServiceJobs();
      if (arrayContent && arrayContent.length) {
        let markerLayer = window.L.markerClusterGroup();
        let markers = [];
        arrayContent.forEach(item => {
          if (item.lat && item.lng) {
            const marker = window.L.marker([item.lat, item.lng], {
              icon: this.markerIcon(type)
            });
            marker.bindPopup(this.markerPopupContent(type, item));
            markerLayer.addLayer(marker);
            markers.push(marker);
          }
        });
        markerLayer.addTo(this.mapElement);
        this.setState({
          [`${type}Cluster`]: markerLayer,
          [type]: markers
        });
      } else {
        throw new Error(`No ${type} to be rendered`);
      }
    } catch (err) {
      console.error(err);
      alert(`Error while rendering ${type}`);
    }
  }

  async renderLeads() {
    const type = "lead";
    try {
      const arrayContent = await this.getLeads();
      if (arrayContent && arrayContent.length) {
        let markerLayer = window.L.markerClusterGroup();
        let markers = [];
        arrayContent.forEach(item => {
          if (item.lat && item.lng) {
            const marker = window.L.marker([item.lat, item.lng], {
              icon: this.markerIcon(type)
            });
            marker.bindPopup(this.markerPopupContent(type, item));
            markerLayer.addLayer(marker);
            markers.push(marker);
          }
        });
        markerLayer.addTo(this.mapElement);
        this.setState({
          [`${type}Cluster`]: markerLayer,
          [type]: markers
        });
      } else {
        throw new Error(`No ${type} to be rendered`);
      }
    } catch (err) {
      console.error(err);
      alert(`Error while rendering ${type}`);
    }
  }

  async renderServiceJobsHeatMap() {
    const type = "serviceJob";
    const arrayContent = await this.getServiceJobs();
    const addressPoints = arrayContent.map(function(p) {
      return [p.lat, p.lng, 0.5];
    });
    const heat = window.L.heatLayer(addressPoints, {
      radius: 10,
      minOpacity: 1
    }).addTo(this.mapElement);
    this.setState({
      [`${type}sHeatMap`]: heat
    });
    try {
    } catch (err) {
      console.error(err);
      alert(`Error while rendering ${type}`);
    }
  }

  async renderLeadsHeatMap() {
    const type = "lead";
    const arrayContent = await this.getLeads();
    const addressPoints = arrayContent.map(function(p) {
      return [p.lat, p.lng, 0.5];
    });
    const heat = window.L.heatLayer(addressPoints, {
      radius: 10,
      minOpacity: 1
    }).addTo(this.mapElement);
    this.setState({
      [`${type}sHeatMap`]: heat
    });
    try {
    } catch (err) {
      console.error(err);
      alert(`Error while rendering ${type}`);
    }
  }

  async renderBoilerJobsHeatMap() {
    const type = "boilerJob";
    const arrayContent = await this.getBoilerJobs();
    const addressPoints = arrayContent.map(function(p) {
      return [p.lat, p.lng, 0.5];
    });
    const heat = window.L.heatLayer(addressPoints, {
      radius: 10,
      minOpacity: 1
    }).addTo(this.mapElement);
    this.setState({
      [`${type}sHeatMap`]: heat
    });
    try {
    } catch (err) {
      console.error(err);
      alert(`Error while rendering ${type}`);
    }
  }

  markerPopupContent(type, item) {
    let content = "";
    let tableContent = "";
    Object.keys(item).forEach(k => {
      tableContent =
        tableContent +
        `
      <tr>
      <td class="popup-table-row">
      <td>${k}</td>
      <td>${item[k]}</td>
      </td>
        </tr>
        `;
    });
    if (tableContent) {
      content = `
      <table class="table table-dark">
      ${tableContent}
      </table>
      `;
    }
    return content;
  }

  markerIcon(type) {
    //   "https://res.cloudinary.com/razrlab/image/upload/c_scale,co_rgb:D12711,e_colorize:100,f_png/v1541359481/pin_t5dc4n.png",
    let icon = "";
    switch (type) {
      case "e5Engineer":
        icon =
          "https://res.cloudinary.com/razrlab/image/upload/v1571935748/person-marker_wdvvbm.png";
        break;
      case "serviceJob":
        icon =
          "https://res.cloudinary.com/razrlab/image/upload/v1571935748/service-marker_tzrx0s.png";
        break;
      case "lead":
      case "boilerJob":
        icon =
          "https://res.cloudinary.com/razrlab/image/upload/v1571935748/home-marker_sskts6.png";
        break;
      default:
        //nothing
        break;
    }
    const iconElement = window.L.icon({
      iconUrl: icon,
      iconSize: [25, 25],
      iconAnchor: [12, 25],
      popupAnchor: [3, -40]
    });

    return iconElement;
  }

  removeMarkers() {
    return new Promise((resolve, reject) => {
      this.removeE5Engineers();
      resolve();
    });
  }

  removeE5EngineerCircles() {
    let circles = this.state.e5EngineerCircle;
    if (circles && circles.length) {
      circles.forEach(item => {
        this.mapElement.removeLayer(item);
      });
    }
  }

  removeE5Engineers() {
    let e5EngineerMarkers = this.state.e5Engineer;
    if (e5EngineerMarkers && e5EngineerMarkers.length) {
      e5EngineerMarkers.forEach(item => {
        this.mapElement.removeLayer(item);
      });
    }
  }

  removeServiceJobs() {
    let markers = this.state.serviceJob;
    let clusters = this.state.serviceJobCluster;
    if (markers && markers.length) {
      markers.forEach(item => {
        this.mapElement.removeLayer(item);
      });
      clusters && this.mapElement.removeLayer(clusters);
    }
  }

  removeLeads() {
    let markers = this.state.lead;
    let clusters = this.state.leadCluster;
    if (markers && markers.length) {
      markers.forEach(item => {
        this.mapElement.removeLayer(item);
      });
      clusters && this.mapElement.removeLayer(clusters);
    }
  }

  removeBoilerJobs() {
    let markers = this.state.boilerJob;
    let clusters = this.state.boilerJobCluster;
    if (markers && markers.length) {
      markers.forEach(item => {
        this.mapElement.removeLayer(item);
      });
      clusters && this.mapElement.removeLayer(clusters);
    }
  }

  removeServiceJobsHeatMap() {
    const layer = this.state.serviceJobsHeatMap;
    layer && this.mapElement.removeLayer(layer);
  }

  removeLeadsHeatMap() {
    const layer = this.state.leadsHeatMap;
    layer && this.mapElement.removeLayer(layer);
  }

  removeBoilerJobsHeatMap() {
    const layer = this.state.boilerJobsHeatMap;
    layer && this.mapElement.removeLayer(layer);
  }
  addControls() {
    const L = window.L;
    L.control
      .custom({
        position: "bottomleft",
        content: `
        <div class="panel-body">
          <div class="checkbox">
            <label><input type="checkbox" value="e5Engineers">E5 Engineers</label>
          </div>
          <div class="checkbox">
            <label><input type="checkbox" value="e5EngineerCircles">E5 Engineers Boundaries</label>
          </div>
          <div class="checkbox">
          <label><input type="checkbox" value="leadsHeatMap">Leads Heat Map</label>
          </div>
          <div class="checkbox">
          <label><input type="checkbox" value="serviceJobsHeatMap">Service Jobs Heat Map</label>
          </div>
          <div class="checkbox">
          <label><input type="checkbox" value="boilerJobsHeatMap">Boiler Jobs Heat Map</label>
          </div>
          <div class="checkbox">
            <label><input type="checkbox" value="leads">Leads</label>
          </div>
          <div class="checkbox">
            <label><input type="checkbox" value="serviceJobs">Service Jobs</label>
          </div>
          <div class="checkbox">
            <label><input type="checkbox" value="boilerJobs">Boiler Jobs</label>
          </div>
          <hr />
          
        </div>
        `,

        // <div class="checkbox">
        //     <label><input type="checkbox" value="geofenceControls">Geofence Controls</label>
        //   </div>
        classes: "panel panel-default",
        style: {},
        events: {
          click: data => {
            if (data && data.srcElement && data.srcElement.type) {
              switch (data.srcElement.value) {
                case "leads":
                  data.srcElement.checked
                    ? this.renderLeads()
                    : this.removeLeads();
                  break;
                case "leadsHeatMap":
                  data.srcElement.checked
                    ? this.renderLeadsHeatMap()
                    : this.removeLeadsHeatMap();
                  break;
                case "e5Engineers":
                  data.srcElement.checked
                    ? this.renderE5Engineers()
                    : this.removeE5Engineers();
                  break;
                case "e5EngineerCircles":
                  data.srcElement.checked
                    ? this.renderE5EngineerCircles()
                    : this.removeE5EngineerCircles();
                  break;
                case "serviceJobs":
                  data.srcElement.checked
                    ? this.renderServiceJobs()
                    : this.removeServiceJobs();
                  break;
                case "serviceJobsHeatMap":
                  data.srcElement.checked
                    ? this.renderServiceJobsHeatMap()
                    : this.removeServiceJobsHeatMap();
                  break;
                case "boilerJobs":
                  data.srcElement.checked
                    ? this.renderBoilerJobs()
                    : this.removeBoilerJobs();
                  break;
                case "boilerJobsHeatMap":
                  data.srcElement.checked
                    ? this.renderBoilerJobsHeatMap()
                    : this.removeBoilerJobsHeatMap();
                  break;
                case "geofenceControls":
                  data.srcElement.checked
                    ? this.showSideBar()
                    : this.hideSideBar();
                  break;
                default:
                  break;
              }
            }
          }
        }
      })
      .addTo(this.mapElement);
  }

  enableGeofenceEditControl() {
    const L = window.L;
    const map = this.mapElement;
    let editableLayers = new L.FeatureGroup();
    map.addLayer(editableLayers);

    let drawPluginOptions = {
      position: "topright",
      draw: {
        polygon: {
          allowIntersection: false, // Restricts shapes to simple polygons
          drawError: {
            color: "#e1e100", // Color the shape will turn when intersects
            message: "<strong>Oh snap!<strong> you can't draw that!" // Message that will show when intersect
          },
          shapeOptions: {
            color: "#97009c"
          }
        },
        // disable toolbar item by setting it to false
        polyline: false,
        circle: false, // Turns off this drawing tool
        rectangle: false,
        marker: false
      },
      edit: {
        featureGroup: editableLayers, //REQUIRED!!
        remove: false
      }
    };

    // Initialise the draw control and pass it the FeatureGroup of editable layers
    let drawControl = new L.Control.Draw(drawPluginOptions);
    map.addControl(drawControl);

    // let editableLayers = new L.FeatureGroup();
    map.addLayer(editableLayers);

    map.on("draw:created", e => {
      console.log("draw:created");
      console.log(e);
      var type = e.layerType,
        layer = e.layer;

      if (type === "marker") {
        layer.bindPopup("A popup!");
      }

      editableLayers.addLayer(layer);
    });
  }

  onLoad() {
    const L = window.L;
    const $ = window.$;
    const config = window.config;
    const loading = L.control({ position: "bottomright" }),
      loaded = {
        areas: false,
        districts: false,
        sectors: false
      },
      geoJsonLayerOptions = {
        style: config.shapeStyle,
        onEachFeature: onEachFeature
      },
      layerAreas = L.geoJson(null, geoJsonLayerOptions),
      layerDistricts = L.geoJson(null, geoJsonLayerOptions),
      layerSectors = L.geoJson(null, geoJsonLayerOptions),
      layerGoogle = L.tileLayer(
        "http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}?key=AIzaSyC0AJcO-U5RksjP02AQHxEuFlEW5xSKzp8",
        {
          maxZoom: 20,
          subdomains: ["mt0", "mt1", "mt2", "mt3"]
        }
      ),
      layerOSM = L.tileLayer(config.openStreetMap.url, {
        // OpenStreetMap tile layer (default)
        attribution: config.openStreetMap.attribution,
        maxZoom: config.zoom.max
      }),
      tileMaps = {
        // Tile map layer switcher
        "Google Maps": layerGoogle,
        RAZRMAPS: layerOSM
      },
      overlayMaps = {
        // GeoJSON layer switcher
        Areas: layerAreas,
        Districts: layerDistricts,
        Sectors: layerSectors
      },
      map = L.map("map", {
        // Setup map object
        center: [53.21919, -1.86768],
        zoom: 7,
        layers: [layerOSM]
      });

    const sidebar = L.control.sidebar("sidebar", {
      closeButton: true,
      position: "left"
    });
    map.addControl(sidebar);

    //expose some elements
    this.sidebarElement = sidebar;
    this.mapElement = map;

    // this.enableGeofenceEditControl();

    // Add layers control
    L.control.layers(tileMaps, overlayMaps, { collapsed: false }).addTo(map);

    // For each feature, set random fill colour and bind 'name' label
    function onEachFeature(feature, layer) {
      layer.setStyle({ fillColor: randomColor() });
      layer.bindLabel(feature.properties.name, { noHide: true });
    }

    function randomRange(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }

    function randomColor() {
      return (
        "rgb(" +
        randomRange(0, 256) +
        "," +
        randomRange(0, 256) +
        "," +
        randomRange(0, 256) +
        ")"
      );
    }

    // Setup GeoJSON loading indicator and add to map
    loading.onAdd = function() {
      const div = L.DomUtil.create("div", "control loader");

      div.innerHTML = `
            <div>\
                Areas... <span id="loadAreas">&#x21BB;</span><br>
                Districts... <span id="loadDistricts">&#x21BB;</span><br>
                Sectors... <span id="loadSectors">&#x21BB;</span>
            </div>
            `;

      return div;
    };
    loading.addTo(map);

    // Automatically set the GeoJSON layer depending on zoom level
    // map.on("zoomend", function() {
    //   if (!(loaded.areas && loaded.districts && loaded.sectors)) {
    //     return;
    //   }

    //   const zoom = map.getZoom();

    //   if (
    //     zoom >= config.zoom.areas &&
    //     zoom < config.zoom.districts &&
    //     !map.hasLayer(layerAreas)
    //   ) {
    //     map.removeLayer(layerDistricts);
    //     map.removeLayer(layerSectors);
    //     map.addLayer(layerAreas);
    //   } else if (
    //     zoom >= config.zoom.districts &&
    //     zoom < config.zoom.sectors &&
    //     !map.hasLayer(layerDistricts)
    //   ) {
    //     map.removeLayer(layerAreas);
    //     map.removeLayer(layerSectors);
    //     map.addLayer(layerDistricts);
    //   } else if (zoom >= config.zoom.sectors && !map.hasLayer(layerSectors)) {
    //     map.removeLayer(layerAreas);
    //     map.removeLayer(layerDistricts);
    //     map.addLayer(layerSectors);
    //   }
    // });

    // Load postcode Areas GeoJSON file
    $.getJSON(config.files.areas, function(data) {
      // Add loaded GeoJSON data to layer
      layerAreas.addData(data.features);

      // Show Areas layer by default
      map.addLayer(layerAreas);

      loaded.areas = true;
      $("#loadAreas").html("&#x2713;");
    }).error(function(error) {
      console.error(
        "Failed loading '" + config.files.areas + "'",
        "Error: " + error.statusText
      );

      $("#loadAreas").html("&#x2717;");
    });

    // Load postcode Districts GeoJSON file
    $.getJSON(config.files.districts, function(data) {
      // Add loaded GeoJSON data to layer
      layerDistricts.addData(data.features);

      loaded.districts = true;
      $("#loadDistricts").html("&#x2713;");
    }).error(function(error) {
      console.error(
        "Failed loading '" + config.files.districts + "'",
        "Error: " + error.statusText
      );

      $("#loadDistricts").html("&#x2717;");
    });

    // Load postcode Sectors GeoJSON file
    $.getJSON(config.files.sectors, function(data) {
      // Add loaded GeoJSON data to layer
      layerSectors.addData(data.features);

      loaded.sectors = true;
      $("#loadSectors").html("&#x2713;");
    }).error(function(error) {
      console.error(
        "Failed loading '" + config.files.sectors + "'",
        "Error: " + error.statusText
      );

      $("#loadSectors").html("&#x2717;");
    });
  }

  showSideBar() {
    this.sidebarElement.show();
  }

  hideSideBar() {
    this.sidebarElement.hide();
  }
}

export { Map };
