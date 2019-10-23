import React, { Component } from "react";
import "./Map.css";

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

  async renderE5Engineers() {
    try {
      const e5Engineers = await this.getE5Engineers();
      console.log(e5Engineers);
      if (e5Engineers && e5Engineers.length) {
        let markers = [];
        e5Engineers.forEach(item => {
          if (item.lat && item.lng) {
            const marker = window.L.marker([item.lat, item.lng]).addTo(
              this.mapElement
            );
            marker.bindPopup(`
            <table class="popup-table">
              <tr class="popup-table-row">
                <td>Name</td>
                <td>${item.FirstName}</td>
              </tr>
              <tr>
                <td>Postcode</td>
                <td>${item.MobileUserName}</td>
              </tr>
            </table>
            `);
            markers.push(marker);
          }
        });
        this.setState({
          e5Engineers: markers
        });
      } else {
        throw new Error("No Engineers to be rendered");
      }
    } catch (err) {
      console.error(err);
      alert(`Error while rendering E5 Engineers`);
    }
  }

  renderMarkers() {}

  onLoad() {
    console.log(`came here`);

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

      div.innerHTML =
        '\
            <h4>Loading GeoJSON</h4>\
            <div>\
                Areas... <span id="loadAreas">&#x21BB;</span><br>\
                Districts... <span id="loadDistricts">&#x21BB;</span><br>\
                Sectors... <span id="loadSectors">&#x21BB;</span>\
            </div>\
            ';

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
