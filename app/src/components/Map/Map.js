import React, { Component } from "react";

import "./Map.css";

class MapComponent extends Component {
  state = {};
  render() {
    return (
      <div>
        <h1>Map Component</h1>
        <div id="map"></div>
      </div>
    );
  }
  componentDidMount() {
    this.onLoad();
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