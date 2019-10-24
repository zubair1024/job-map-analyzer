import React, { Component } from "react";
import "./Map.css";

// import groupToRegions from "../../rawdata/postCodeWithRegions.json";

class MapComponent extends Component {
  state = {};
  render() {
    return (
      <div>
        <div id="map"></div>
      </div>
    );
  }

  componentDidMount() {
    this.onLoad();
    setTimeout(() => {
      this.renderE5Engineers();
      // this.renderBoilerJobs();
      // this.renderServiceJobs();
    }, 3000);
  }

  getE5Engineers() {
    return new Promise((resolve, reject) => {
      import("../../rawdata/e5Engineers.json")
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
      import("../../rawdata/boilerJobs.json")
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
      import("../../rawdata/serviceJobs.json")
        .then(data => {
          debugger;
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

  async renderBoilerJobs() {
    const type = "boilerJob";
    try {
      const arrayContent = await this.getBoilerJobs();
      if (arrayContent && arrayContent.length) {
        let markers = [];
        arrayContent.forEach(item => {
          if (item.lat && item.lng) {
            const marker = window.L.marker([item.lat, item.lng]).addTo(
              this.mapElement
            );
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

  async renderServiceJobs() {
    const type = "serviceJob";
    try {
      const arrayContent = await this.getServiceJobs();
      console.log(arrayContent);
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
    switch (type) {
      case "e5Engineer":
        content = `
        <table class="popup-table">
         ${tableContent}
        </table>
        `;
        break;
      default:
        //do nothing
        break;
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
      default:
        //nothing
        break;
    }
    const iconElement = window.L.icon({
      iconUrl: icon,
      iconSize: [25, 25],
      iconAnchor: [25, 25]
    });

    return iconElement;
  }

  removeMarkers() {
    return new Promise((resolve, reject) => {
      let e5EngineerMarkers = this.state.e5Engineers;
      if (e5EngineerMarkers && e5EngineerMarkers.length) {
        e5EngineerMarkers.forEach(item => {
          this.mapElement.removeLayer(item);
        });
      }
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
      layerMapbox = L.tileLayer(config.mapbox.url, {
        // Mapbox tile layer
        id: config.mapbox.id,
        attribution: config.mapbox.attribution,
        maxZoom: config.zoom.max
      }),
      layerOSM = L.tileLayer(config.openStreetMap.url, {
        // OpenStreetMap tile layer (default)
        attribution: config.openStreetMap.attribution,
        maxZoom: config.zoom.max
      }),
      tileMaps = {
        // Tile map layer switcher
        Mapbox: layerMapbox,
        OpenStreetMap: layerOSM
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

    this.mapElement = map;

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
            <h4>Loading GeoJSON</h4>
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
    map.on("zoomend", function() {
      if (!(loaded.areas && loaded.districts && loaded.sectors)) {
        return;
      }

      const zoom = map.getZoom();

      if (
        zoom >= config.zoom.areas &&
        zoom < config.zoom.districts &&
        !map.hasLayer(layerAreas)
      ) {
        map.removeLayer(layerDistricts);
        map.removeLayer(layerSectors);
        map.addLayer(layerAreas);
      } else if (
        zoom >= config.zoom.districts &&
        zoom < config.zoom.sectors &&
        !map.hasLayer(layerDistricts)
      ) {
        map.removeLayer(layerAreas);
        map.removeLayer(layerSectors);
        map.addLayer(layerDistricts);
      } else if (zoom >= config.zoom.sectors && !map.hasLayer(layerSectors)) {
        map.removeLayer(layerAreas);
        map.removeLayer(layerDistricts);
        map.addLayer(layerSectors);
      }
    });

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
}

export default MapComponent;
