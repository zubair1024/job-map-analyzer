(this.webpackJsonpapp=this.webpackJsonpapp||[]).push([[1],{43:function(e,t,n){e.exports=n(81)},71:function(e,t,n){},80:function(e,t,n){},81:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(37),i=n(8),s=n(9),l=n(12),c=n(10),u=n(11),d=n(19),h=n(14),m=n(42),p=function(e){var t=e.component,n=Object(m.a)(e,["component"]);return r.a.createElement(h.b,Object.assign({},n,{render:function(e){return localStorage.getItem("user")?r.a.createElement(t,e):r.a.createElement(h.a,{to:{pathname:"/login",state:{from:e.location}}})}}))},f=n(20),b=n(1),v=n.n(b),g=n(3),y=n(4),w=n(18),E=n.n(w),k=(n(71),n(40)),A=n(41),P=n.n(A),S=function(e){function t(){var e,n;Object(i.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(l.a)(this,(e=Object(c.a)(t)).call.apply(e,[this].concat(r)))).state={loadingDownloadLink:!1,downloadLink:!1,downloadLeadNumber:null,downloadData:[]},n}return Object(u.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this,t=this.props.data.rows,n=r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"Show"),r.a.createElement("th",null,"Name"),r.a.createElement("th",null,"Edit"),r.a.createElement("th",null,"Delete"),r.a.createElement("th",null,"Download Leads"))),a=t.map((function(t,n){return r.a.createElement("tr",{key:n},r.a.createElement("td",{key:"show".concat(n)},r.a.createElement("input",{type:"checkbox",value:t._id,onChange:e.handleShow.bind(e)})),r.a.createElement("td",{key:"column".concat({idx:n})},t.name),r.a.createElement("td",{key:"edit".concat(n)},r.a.createElement("button",{className:"btn btn-dark",value:t._id,onClick:e.handleEdit.bind(e)},"Edit")),r.a.createElement("td",{key:"delete".concat(n)},r.a.createElement("button",{className:"btn btn-dark",value:t._id,onClick:e.handleDelete.bind(e)},"Delete")),r.a.createElement("td",{key:"download".concat(n)},r.a.createElement("button",{className:"btn btn-dark",value:t._id,onClick:e.handleDownload.bind(e)},"Download")))})),o=this.state.downloadLink&&r.a.createElement("div",{style:{float:"right"}},r.a.createElement(k.CSVLink,{data:this.state.downloadData,filename:"my-file.csv",className:"btn btn-dark",target:"_blank"},"Download ",this.state.downloadLeadNumber," Leads")),i=this.state.loadingDownloadLink&&r.a.createElement("div",null,r.a.createElement("h3",null,"Loading..."));return r.a.createElement("div",null,r.a.createElement("table",{className:"table table-bordered table-hover",width:"100%"},n,r.a.createElement("tbody",null,a)),o,i)}},{key:"handleShow",value:function(e){this.props.handleShow(e)}},{key:"handleEdit",value:function(e){this.props.handleEdit(e)}},{key:"handleDelete",value:function(e){this.props.handleDelete(e)}},{key:"handleDownload",value:function(){var e=Object(g.a)(v.a.mark((function e(t){var n,a,r;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,this.setState({loadingDownloadLink:!0,downloadLink:!1}),!(n=this.props.data.rows.find((function(e){return e._id.toString()===t.target.value.toString()})))||!n.layer){e.next=9;break}return a=n.layer.getLatLngs().map((function(e){return[e.lat,e.lng]})),e.next=7,this.getLeads(a);case 7:(r=e.sent).length?this.setState({downloadLeadNumber:r.length,loadingDownloadLink:!1,downloadData:r,downloadLink:!0}):(this.setState({downloadLeadNumber:null,loadingDownloadLink:!1,downloadData:[],downloadLink:!1}),alert("There are no leads in the selected cluster!"));case 9:e.next=15;break;case 11:e.prev=11,e.t0=e.catch(0),alert(e.t0),this.setState({downloadLeadNumber:null,loadingDownloadLink:!1,downloadData:[],downloadLink:!1});case 15:case"end":return e.stop()}}),e,this,[[0,11]])})));return function(t){return e.apply(this,arguments)}}()},{key:"getLeads",value:function(e){return new Promise((function(t,a){n.e(0).then(n.t.bind(null,82,3)).then((function(n){if(n&&n.default){var a=n.default.filter((function(t){if(t.lat&&t.lng){var n=P()(e,[t.lat,t.lng]);return-1===n||0===n}return!1}));t(a)}else t([])})).catch((function(e){a(e)}))}))}}]),t}(a.Component);function x(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function L(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?x(n,!0).forEach((function(t){Object(y.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):x(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var O="https://map247.razrlab.com/api/group",C=function(e){function t(){var e,n;Object(i.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(l.a)(this,(e=Object(c.a)(t)).call.apply(e,[this].concat(r)))).state={newPolygon:!1,editPolygonDetails:{name:"",layer:null},tableData:{columns:["name"],rows:[]},currentPolygonsInView:[],currentPolygonLabels:[]},n}return Object(u.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement("div",{id:"map"}),r.a.createElement("div",{id:"sidebar"},!this.state.newPolygon&&!this.state.editPolygon&&r.a.createElement("div",null,r.a.createElement("h3",null,"Groups"),r.a.createElement(S,{data:this.state.tableData,handleShow:this.handleShow.bind(this),handleEdit:this.handleEdit.bind(this),handleDelete:this.handleDelete.bind(this)}),r.a.createElement("button",{className:"btn btn-primary",onClick:function(){e.createNewPolygon()}},"Create New")),this.state.newPolygon&&r.a.createElement("div",null,r.a.createElement("div",{className:"row",style:{marginTop:"5vh"}},r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{for:"exampleInputEmail1"},"Group Name"),r.a.createElement("input",{type:"text",className:"form-control",id:"exampleInputEmail1","aria-describedby":"emailHelp",placeholder:"Enter Name",value:this.state.editPolygonDetails.name,onChange:function(t){e.setState({editPolygonDetails:L({},e.state.editPolygonDetails,{name:t.target.value})})}}),r.a.createElement("small",{id:"emailHelp",className:"form-text text-muted"},"Please enter a unqiue group name.")),r.a.createElement("button",{className:"btn btn-dark",onClick:function(){e.submitNewPolygon()}},"Save")," ",r.a.createElement("button",{className:"btn btn-danger",onClick:function(){e.cancelNewPolygon()}},"Cancel"))),this.state.editPolygon&&r.a.createElement("div",null,r.a.createElement("div",{className:"row",style:{marginTop:"5vh"}},r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{for:"exampleInputEmail1"},"Group Name"),r.a.createElement("input",{type:"text",className:"form-control",id:"exampleInputEmail1","aria-describedby":"emailHelp",placeholder:"Enter Name",value:this.state.editPolygonDetails.name,onChange:function(t){e.setState({editPolygonDetails:L({},e.state.editPolygonDetails,{name:t.target.value})})}}),r.a.createElement("small",{id:"emailHelp",className:"form-text text-muted"},"Please enter a unqiue group name.")),r.a.createElement("button",{className:"btn btn-dark",onClick:function(){e.submitEditedPolygon()}},"Save")," ",r.a.createElement("button",{className:"btn btn-danger",onClick:function(){e.cancelEditedPolygon()}},"Cancel")))))}},{key:"componentDidMount",value:function(){this.run()}},{key:"handleShow",value:function(e){var t=e.target.value,n=e.target.checked,a=this.state.tableData.rows.find((function(e){return t.toString()===e._id.toString()}));a&&a.layer&&this.renderSelectedPolygon(a,n)}},{key:"handleEdit",value:function(){var e=Object(g.a)(v.a.mark((function e(t){var n,a,r;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=t.target.value,a=!0,!(r=this.state.tableData.rows.find((function(e){return n.toString()===e._id.toString()})))||!r.layer){e.next=11;break}return e.next=6,this.removeAllPolygonsFromMap();case 6:return e.next=8,this.renderSelectedPolygon(r,a);case 8:this.enablePolygonEditControl(),this.editableLayers.addLayer(r.layer),this.setState({editPolygon:!0,editPolygonDetails:{_id:n,name:r.name,layer:r.layer}});case 11:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"handleDelete",value:function(){var e=Object(g.a)(v.a.mark((function e(t){var n,a,r;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=t.target.value,!window.confirm("Are you sure you want to delete?")){e.next=17;break}return e.prev=3,!1,(a=this.state.tableData.rows.find((function(e){return n.toString()===e._id.toString()})))&&a.layer&&this.renderSelectedPolygon(a,!1),e.next=9,this.deleteGroup(a);case 9:e.sent&&(r=this.state.tableData.rows.filter((function(e){return e._id&&n&&e._id.toString()!==n.toString()})),this.setState({tableData:L({},this.state.tableData,{rows:r})})),e.next=17;break;case 13:e.prev=13,e.t0=e.catch(3),console.error(e.t0),alert("An error occurred while deleting...");case 17:case"end":return e.stop()}}),e,this,[[3,13]])})));return function(t){return e.apply(this,arguments)}}()},{key:"renderSelectedPolygon",value:function(){var e=Object(g.a)(v.a.mark((function e(t,n){var a;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.layer){e.next=9;break}if(a=t.layer,!n){e.next=7;break}return e.next=5,this.addPolygonAndLabelToMap(t,a);case 5:e.next=9;break;case 7:return e.next=9,this.removePolygonAndLabelFromMap(t,a);case 9:case"end":return e.stop()}}),e,this)})));return function(t,n){return e.apply(this,arguments)}}()},{key:"addPolygonAndLabelToMap",value:function(e,t){var n=this;return new Promise((function(a){t._parentId=e._id,t.addTo(n.mapElement);var r=new window.L.Label;r.setContent(e.name),r.setLatLng(t.getBounds().getCenter()),r._parentId=e._id,t.bindLabel(r),n.mapElement.showLabel(r),n.setState((function(e){return{currentPolygonsInView:[].concat(Object(f.a)(e.currentPolygonsInView),[t]),currentPolygonLabels:[].concat(Object(f.a)(e.currentPolygonLabels),[r])}})),a()}))}},{key:"removePolygonAndLabelFromMap",value:function(e,t){var n=this;return new Promise((function(a){var r=n.state.currentPolygonLabels.find((function(t){return t._parentId&&e._id&&t._parentId.toString()===e._id.toString()}));r&&n.mapElement.removeLayer(r),t&&n.mapElement.removeLayer(t);var o=n.state.currentPolygonsInView.filter((function(e){return e._parentId&&r._parentId&&e._parentId.toString()!==r._parentId.toString()})),i=n.state.currentPolygonLabels.filter((function(e){return e._parentId&&r._parentId&&e._parentId.toString()!==r._parentId.toString()}));n.setState({currentPolygonsInView:o,currentPolygonLabels:i}),a()}))}},{key:"removeAllPolygonsFromMap",value:function(){var e=this;return new Promise((function(t,n){e.state.currentPolygonsInView.forEach((function(t){e.mapElement.removeLayer(t)})),e.state.currentPolygonLabels.forEach((function(t){e.mapElement.removeLayer(t)})),e.setState({currentPolygonsInView:[],currentPolygonLabels:[]}),t()}))}},{key:"createNewPolygon",value:function(){var e=Object(g.a)(v.a.mark((function e(){return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.removeAllPolygonsFromMap();case 2:this.setState({newPolygon:!0}),this.enablePolygonEditControl();case 4:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"submitNewPolygon",value:function(){var e=Object(g.a)(v.a.mark((function e(){var t,n=this;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,""===this.state.editPolygonDetails.name||!this.state.editPolygonDetails.layer){e.next=21;break}if(!this.state.tableData.rows.find((function(e){return e.name===n.state.editPolygonDetails.name}))){e.next=6;break}return alert("Name already exists"),e.abrupt("return");case 6:return e.next=8,this.saveGroup(this.state.editPolygonDetails);case 8:if(!(t=e.sent)){e.next=18;break}return e.next=12,this.addNewPolygon(t);case 12:return this.resetForm(),this.disablePolygonEditControl(),e.next=16,this.removeAllPolygonsFromMap();case 16:e.next=19;break;case 18:throw new Error("new polygon not returned");case 19:e.next=22;break;case 21:alert("Please input a valid name and shape");case 22:e.next=28;break;case 24:e.prev=24,e.t0=e.catch(0),console.log(e.t0),alert("An error occurred while editing");case 28:case"end":return e.stop()}}),e,this,[[0,24]])})));return function(){return e.apply(this,arguments)}}()},{key:"submitEditedPolygon",value:function(){var e=Object(g.a)(v.a.mark((function e(){var t,n=this;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,""===this.state.editPolygonDetails.name||!this.state.editPolygonDetails.layer){e.next=21;break}if(!this.state.tableData.rows.find((function(e){return e.name===n.state.editPolygonDetails.name&&e._id.toString()!==n.state.editPolygonDetails._id.toString()}))){e.next=6;break}return alert("Name already exists"),e.abrupt("return");case 6:return e.next=8,this.updateGroup(this.state.editPolygonDetails);case 8:if(!(t=e.sent)){e.next=18;break}return e.next=12,this.addEditedPolygon(t);case 12:return this.resetForm(),this.disablePolygonEditControl(),e.next=16,this.removeAllPolygonsFromMap();case 16:e.next=19;break;case 18:throw new Error("new polygon not returned");case 19:e.next=22;break;case 21:alert("Please input a valid name and shape");case 22:e.next=28;break;case 24:e.prev=24,e.t0=e.catch(0),console.error(e.t0),alert("An error occurred while editing");case 28:case"end":return e.stop()}}),e,this,[[0,24]])})));return function(){return e.apply(this,arguments)}}()},{key:"addNewPolygon",value:function(e){var t=this;return new Promise((function(n,a){t.setState({tableData:{rows:[].concat(Object(f.a)(t.state.tableData.rows),[{_id:e._id,name:e.name,layer:e.layer?e.layer:window.L.GeoJSON.geometryToLayer(e.geoJSON)}])}}),n()}))}},{key:"addEditedPolygon",value:function(e){var t=this;return new Promise((function(e,n){var a=t.state.tableData.rows.map((function(e){return t.state.editPolygonDetails._id.toString()===e._id.toString()?Object.assign(e,{name:t.state.editPolygonDetails.name,layer:t.state.editPolygonDetails.layer}):e}));t.setState({tableData:{rows:a}}),e()}))}},{key:"cancelNewPolygon",value:function(){this.resetForm(),this.removeAllPolygonsFromMap(),this.disablePolygonEditControl()}},{key:"cancelEditedPolygon",value:function(){this.resetForm(),this.removeAllPolygonsFromMap(),this.disablePolygonEditControl()}},{key:"resetForm",value:function(){this.setState({newPolygon:!1,editPolygon:!1,editPolygonDetails:{name:"",layer:null}})}},{key:"run",value:function(){var e=Object(g.a)(v.a.mark((function e(){var t;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.onLoad();case 2:return this.addControls(),e.next=5,this.getGroups();case 5:(t=e.sent)&&t.length&&this.populateGroups(t);case 7:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"populateGroups",value:function(e){if(e&&e.length){var t=e.filter((function(e){return e.name&&e.geoJSON&&e._id})).map((function(e){return e.layer=window.L.GeoJSON.geometryToLayer(e.geoJSON),e}));this.setState({tableData:L({},this.state.tableData,{rows:t})})}}},{key:"getGroups",value:function(){return new Promise((function(e,t){E.a.get(O).then((function(n){n&&n.data&&n.data.data?e(n.data.data):t(new Error("There is no data")),e()})).catch((function(e){t(e)}))}))}},{key:"saveGroup",value:function(e){return new Promise((function(t,n){if(e&&e&&e.layer&&e.name&&e.layer.toGeoJSON()&&e.layer.toGeoJSON().geometry){var a=Object.assign({},e);a.geoJSON||(a.geoJSON=a.layer.toGeoJSON().geometry,delete a.layer),E.a.post(O,a).then((function(e){e&&e.data&&e.data.data?t(e.data.data):n(new Error("There is no data"))})).catch((function(e){n(e)}))}else n(new Error("Insufficient parameters are being sent"))}))}},{key:"updateGroup",value:function(e){return new Promise((function(t,n){if(e&&e&&e.layer&&e.name&&e.layer.toGeoJSON()&&e.layer.toGeoJSON().geometry){var a=Object.assign({},e);a.geoJSON||(a.geoJSON=a.layer.toGeoJSON().geometry,delete a.layer),E.a.put(O,a).then((function(e){e&&e.data&&e.data.data?t(e.data.data):n(new Error("There is no data"))})).catch((function(e){n(e)}))}else n(new Error("Insufficient parameters are being sent"))}))}},{key:"deleteGroup",value:function(e){return new Promise((function(t,n){E.a.delete(O,{data:{_id:e._id}}).then((function(e){e&&e.data&&e.data.message?t(e.data.message):n(new Error("There is no data")),t()})).catch((function(e){n(e)}))}))}},{key:"getLeads",value:function(){return new Promise((function(e,t){n.e(0).then(n.t.bind(null,82,3)).then((function(t){if(t&&t.default){var n=t.default.filter((function(e){return e.lat&&e.lng}));console.log("render leads ".concat(n.length)),e(n)}else e([])})).catch((function(e){t(e)}))}))}},{key:"getGroupToRegions",value:function(){return new Promise((function(e,t){n.e(6).then(n.t.bind(null,83,3)).then((function(t){if(t&&t.default){var n=t.default.filter((function(e){return e.lat&&e.lng}));e(n)}else e([])})).catch((function(e){t(e)}))}))}},{key:"getE5Engineers",value:function(){return new Promise((function(e,t){n.e(5).then(n.t.bind(null,84,3)).then((function(t){if(t&&t.default){var n=t.default.filter((function(e){return e.lat&&e.lng}));e(n)}else e([])})).catch((function(e){t(e)}))}))}},{key:"getBoilerJobs",value:function(){return new Promise((function(e,t){n.e(4).then(n.t.bind(null,85,3)).then((function(t){if(t&&t.default){var n=t.default.filter((function(e){return e.lat&&e.lng}));e(n)}else e([])})).catch((function(e){t(e)}))}))}},{key:"getServiceJobs",value:function(){return new Promise((function(e,t){n.e(7).then(n.t.bind(null,86,3)).then((function(t){if(t&&t.default){var n=t.default.filter((function(e){return e.lat&&e.lng}));e(n)}else e([])})).catch((function(e){t(e)}))}))}},{key:"renderE5Engineers",value:function(){var e=Object(g.a)(v.a.mark((function e(){var t,n,a,r=this;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t="e5Engineer",e.prev=1,e.next=4,this.getE5Engineers();case 4:if(!(n=e.sent)||!n.length){e.next=11;break}a=[],n.forEach((function(e){if(e.lat&&e.lng){var n=window.L.marker([e.lat,e.lng],{icon:r.markerIcon(t)}).addTo(r.mapElement);n.bindPopup(r.markerPopupContent(t,e)),a.push(n)}})),this.setState(Object(y.a)({},t,a)),e.next=12;break;case 11:throw new Error("No ".concat(t," to be rendered"));case 12:e.next=18;break;case 14:e.prev=14,e.t0=e.catch(1),console.error(e.t0),alert("Error while rendering ".concat(t));case 18:case"end":return e.stop()}}),e,this,[[1,14]])})));return function(){return e.apply(this,arguments)}}()},{key:"renderE5EngineerCircles",value:function(){var e=Object(g.a)(v.a.mark((function e(){var t,n,a,r=this;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t="e5Engineer",e.prev=1,e.next=4,this.getE5Engineers();case 4:if(!(n=e.sent)||!n.length){e.next=11;break}a=[],n.forEach((function(e){if(e.lat&&e.lng){var t=window.L.circle([e.lat,e.lng],40233.6).addTo(r.mapElement);a.push(t)}})),this.setState(Object(y.a)({},"".concat(t,"Circle"),a)),e.next=12;break;case 11:throw new Error("No ".concat(t," to be rendered"));case 12:e.next=18;break;case 14:e.prev=14,e.t0=e.catch(1),console.error(e.t0),alert("Error while rendering ".concat(t));case 18:case"end":return e.stop()}}),e,this,[[1,14]])})));return function(){return e.apply(this,arguments)}}()},{key:"renderBoilerJobs",value:function(){var e=Object(g.a)(v.a.mark((function e(){var t,n,a,r,o,i=this;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t="boilerJob",e.prev=1,e.next=4,this.getBoilerJobs();case 4:if(!(n=e.sent)||!n.length){e.next=13;break}r=window.L.markerClusterGroup(),o=[],n.forEach((function(e){if(e.lat&&e.lng){var n=window.L.marker([e.lat,e.lng],{icon:i.markerIcon(t)});n.bindPopup(i.markerPopupContent(t,e)),r.addLayer(n),o.push(n)}})),r.addTo(this.mapElement),this.setState((a={},Object(y.a)(a,"".concat(t,"Cluster"),r),Object(y.a)(a,t,o),a)),e.next=14;break;case 13:throw new Error("No ".concat(t," to be rendered"));case 14:e.next=20;break;case 16:e.prev=16,e.t0=e.catch(1),console.error(e.t0),alert("Error while rendering ".concat(t));case 20:case"end":return e.stop()}}),e,this,[[1,16]])})));return function(){return e.apply(this,arguments)}}()},{key:"renderServiceJobs",value:function(){var e=Object(g.a)(v.a.mark((function e(){var t,n,a,r,o,i=this;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t="serviceJob",e.prev=1,e.next=4,this.getServiceJobs();case 4:if(!(n=e.sent)||!n.length){e.next=13;break}r=window.L.markerClusterGroup(),o=[],n.forEach((function(e){if(e.lat&&e.lng){var n=window.L.marker([e.lat,e.lng],{icon:i.markerIcon(t)});n.bindPopup(i.markerPopupContent(t,e)),r.addLayer(n),o.push(n)}})),r.addTo(this.mapElement),this.setState((a={},Object(y.a)(a,"".concat(t,"Cluster"),r),Object(y.a)(a,t,o),a)),e.next=14;break;case 13:throw new Error("No ".concat(t," to be rendered"));case 14:e.next=20;break;case 16:e.prev=16,e.t0=e.catch(1),console.error(e.t0),alert("Error while rendering ".concat(t));case 20:case"end":return e.stop()}}),e,this,[[1,16]])})));return function(){return e.apply(this,arguments)}}()},{key:"renderLeads",value:function(){var e=Object(g.a)(v.a.mark((function e(){var t,n,a,r,o,i=this;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t="lead",e.prev=1,e.next=4,this.getLeads();case 4:if(!(n=e.sent)||!n.length){e.next=13;break}r=window.L.markerClusterGroup(),o=[],n.forEach((function(e){if(e.lat&&e.lng){var n=window.L.marker([e.lat,e.lng],{icon:i.markerIcon(t)});n.bindPopup(i.markerPopupContent(t,e)),r.addLayer(n),o.push(n)}})),r.addTo(this.mapElement),this.setState((a={},Object(y.a)(a,"".concat(t,"Cluster"),r),Object(y.a)(a,t,o),a)),e.next=14;break;case 13:throw new Error("No ".concat(t," to be rendered"));case 14:e.next=20;break;case 16:e.prev=16,e.t0=e.catch(1),console.error(e.t0),alert("Error while rendering ".concat(t));case 20:case"end":return e.stop()}}),e,this,[[1,16]])})));return function(){return e.apply(this,arguments)}}()},{key:"renderServiceJobsHeatMap",value:function(){var e=Object(g.a)(v.a.mark((function e(){var t,n,a,r;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t="serviceJob",e.next=3,this.getServiceJobs();case 3:n=e.sent,a=n.map((function(e){return[e.lat,e.lng,.5]})),r=window.L.heatLayer(a,{radius:10,minOpacity:1}).addTo(this.mapElement),this.setState(Object(y.a)({},"".concat(t,"sHeatMap"),r));case 8:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"renderLeadsHeatMap",value:function(){var e=Object(g.a)(v.a.mark((function e(){var t,n,a,r;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t="lead",e.next=3,this.getLeads();case 3:n=e.sent,a=n.map((function(e){return[e.lat,e.lng,.5]})),r=window.L.heatLayer(a,{radius:10,minOpacity:1}).addTo(this.mapElement),this.setState(Object(y.a)({},"".concat(t,"sHeatMap"),r));case 8:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"renderBoilerJobsHeatMap",value:function(){var e=Object(g.a)(v.a.mark((function e(){var t,n,a,r;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t="boilerJob",e.next=3,this.getBoilerJobs();case 3:n=e.sent,a=n.map((function(e){return[e.lat,e.lng,.5]})),r=window.L.heatLayer(a,{radius:10,minOpacity:1}).addTo(this.mapElement),this.setState(Object(y.a)({},"".concat(t,"sHeatMap"),r));case 8:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"markerPopupContent",value:function(e,t){var n="",a="";return Object.keys(t).forEach((function(e){a+='\n      <tr>\n      <td class="popup-table-row">\n      <td>'.concat(e,"</td>\n      <td>").concat(t[e],"</td>\n      </td>\n        </tr>\n        ")})),a&&(n='\n      <table class="table table-dark">\n      '.concat(a,"\n      </table>\n      ")),n}},{key:"markerIcon",value:function(e){var t="";switch(e){case"e5Engineer":t="https://res.cloudinary.com/razrlab/image/upload/v1571935748/person-marker_wdvvbm.png";break;case"serviceJob":t="https://res.cloudinary.com/razrlab/image/upload/v1571935748/service-marker_tzrx0s.png";break;case"lead":case"boilerJob":t="https://res.cloudinary.com/razrlab/image/upload/v1571935748/home-marker_sskts6.png"}return window.L.icon({iconUrl:t,iconSize:[25,25],iconAnchor:[12,25],popupAnchor:[3,-40]})}},{key:"removeMarkers",value:function(){var e=this;return new Promise((function(t,n){e.removeE5Engineers(),t()}))}},{key:"removeE5EngineerCircles",value:function(){var e=this,t=this.state.e5EngineerCircle;t&&t.length&&t.forEach((function(t){e.mapElement.removeLayer(t)}))}},{key:"removeE5Engineers",value:function(){var e=this,t=this.state.e5Engineer;t&&t.length&&t.forEach((function(t){e.mapElement.removeLayer(t)}))}},{key:"removeServiceJobs",value:function(){var e=this,t=this.state.serviceJob,n=this.state.serviceJobCluster;t&&t.length&&(t.forEach((function(t){e.mapElement.removeLayer(t)})),n&&this.mapElement.removeLayer(n))}},{key:"removeLeads",value:function(){var e=this,t=this.state.lead,n=this.state.leadCluster;t&&t.length&&(t.forEach((function(t){e.mapElement.removeLayer(t)})),n&&this.mapElement.removeLayer(n))}},{key:"removeBoilerJobs",value:function(){var e=this,t=this.state.boilerJob,n=this.state.boilerJobCluster;t&&t.length&&(t.forEach((function(t){e.mapElement.removeLayer(t)})),n&&this.mapElement.removeLayer(n))}},{key:"removeServiceJobsHeatMap",value:function(){var e=this.state.serviceJobsHeatMap;e&&this.mapElement.removeLayer(e)}},{key:"removeLeadsHeatMap",value:function(){var e=this.state.leadsHeatMap;e&&this.mapElement.removeLayer(e)}},{key:"removeBoilerJobsHeatMap",value:function(){var e=this.state.boilerJobsHeatMap;e&&this.mapElement.removeLayer(e)}},{key:"addControls",value:function(){var e=this;window.L.control.custom({position:"bottomleft",content:'\n        <div class="panel-body">\n          <div class="checkbox">\n            <label><input type="checkbox" value="e5Engineers">E5 Engineers</label>\n          </div>\n          <div class="checkbox">\n            <label><input type="checkbox" value="e5EngineerCircles">E5 Engineers Boundaries</label>\n          </div>\n          <div class="checkbox">\n          <label><input type="checkbox" value="leadsHeatMap">Leads Heat Map</label>\n          </div>\n          <div class="checkbox">\n          <label><input type="checkbox" value="serviceJobsHeatMap">Service Jobs Heat Map</label>\n          </div>\n          <div class="checkbox">\n          <label><input type="checkbox" value="boilerJobsHeatMap">Boiler Jobs Heat Map</label>\n          </div>\n          <div class="checkbox">\n            <label><input type="checkbox" value="leads">Leads</label>\n          </div>\n          <div class="checkbox">\n            <label><input type="checkbox" value="serviceJobs">Service Jobs</label>\n          </div>\n          <div class="checkbox">\n            <label><input type="checkbox" value="boilerJobs">Boiler Jobs</label>\n          </div>\n          <hr />\n          <div class="checkbox">\n            <label><input type="checkbox" value="geofenceControls">Polygon Controls</label>\n          </div>  \n        </div>\n        ',classes:"panel panel-default",style:{},events:{click:function(t){if(t&&t.srcElement&&t.srcElement.type)switch(t.srcElement.value){case"leads":t.srcElement.checked?e.renderLeads():e.removeLeads();break;case"leadsHeatMap":t.srcElement.checked?e.renderLeadsHeatMap():e.removeLeadsHeatMap();break;case"e5Engineers":t.srcElement.checked?e.renderE5Engineers():e.removeE5Engineers();break;case"e5EngineerCircles":t.srcElement.checked?e.renderE5EngineerCircles():e.removeE5EngineerCircles();break;case"serviceJobs":t.srcElement.checked?e.renderServiceJobs():e.removeServiceJobs();break;case"serviceJobsHeatMap":t.srcElement.checked?e.renderServiceJobsHeatMap():e.removeServiceJobsHeatMap();break;case"boilerJobs":t.srcElement.checked?e.renderBoilerJobs():e.removeBoilerJobs();break;case"boilerJobsHeatMap":t.srcElement.checked?e.renderBoilerJobsHeatMap():e.removeBoilerJobsHeatMap();break;case"geofenceControls":t.srcElement.checked?e.showSideBar():e.hideSideBar()}}}}).addTo(this.mapElement)}},{key:"initEditableLayer",value:function(){this.editableLayers=new window.L.FeatureGroup,this.mapElement.addLayer(this.editableLayers)}},{key:"initDrawControls",value:function(){var e={position:"topright",draw:{polygon:{allowIntersection:!1,drawError:{color:"#e1e100",message:"<strong>Oh snap!<strong> you can't draw that!"},shapeOptions:{color:"#97009c"}},polyline:!1,circle:!1,rectangle:!1,marker:!1},edit:{featureGroup:this.editableLayers,remove:!1}};this.drawControl=new window.L.Control.Draw(e)}},{key:"enablePolygonEditControl",value:function(){var e=this,t=this.mapElement;t.on("draw:created",(function(t){console.log("draw:created");var n=t.layer;e.setState({editPolygonDetails:L({},e.state.editPolygonDetails,{layer:n}),currentPolygonsInView:[n]}),e.editableLayers.addLayer(n)})),t.on("draw:edited",(function(t){console.log("draw:edited"),t.layers.eachLayer((function(t){e.setState({editPolygonDetails:L({},e.state.editPolygonDetails,{layer:t}),currentPolygonsInView:[t]})}))})),t.addControl(this.drawControl)}},{key:"disablePolygonEditControl",value:function(){this.drawControl&&this.mapElement.removeControl(this.drawControl)}},{key:"onLoad",value:function(){var e=this;return new Promise((function(t,n){var a=window.L,r=window.$,o=window.config,i=a.control({position:"bottomright"}),s={areas:!1,districts:!1,sectors:!1},l={style:o.shapeStyle,onEachFeature:function(e,t){t.setStyle({fillColor:"rgb("+g(0,256)+","+g(0,256)+","+g(0,256)+")"}),t.bindLabel(e.properties.name,{noHide:!0})}},c=a.geoJson(null,l),u=a.geoJson(null,l),d=a.geoJson(null,l),h=a.tileLayer("http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}?key=AIzaSyC0AJcO-U5RksjP02AQHxEuFlEW5xSKzp8",{maxZoom:20,subdomains:["mt0","mt1","mt2","mt3"]}),m=a.tileLayer(o.openStreetMap.url,{attribution:o.openStreetMap.attribution,maxZoom:o.zoom.max}),p={"Google Maps":h,RAZRMAPS:m},f={Areas:c,Districts:u,Sectors:d},b=a.map("map",{center:[53.21919,-1.86768],zoom:7,layers:[m]}),v=a.control.sidebar("sidebar",{closeButton:!0,position:"left"});function g(e,t){return Math.floor(Math.random()*(t-e))+e}b.addControl(v),e.sidebarElement=v,e.mapElement=b,a.control.layers(p,f,{collapsed:!1}).addTo(b),e.initEditableLayer(),e.initDrawControls(),i.onAdd=function(){var e=a.DomUtil.create("div","control loader");return e.innerHTML='\n              <div>                  Areas... <span id="loadAreas">&#x21BB;</span><br>\n                  Districts... <span id="loadDistricts">&#x21BB;</span><br>\n                  Sectors... <span id="loadSectors">&#x21BB;</span>\n              </div>\n              ',e},i.addTo(b),r.getJSON(o.files.areas,(function(e){c.addData(e.features),b.addLayer(c),s.areas=!0,r("#loadAreas").html("&#x2713;")})).error((function(e){console.error("Failed loading '"+o.files.areas+"'","Error: "+e.statusText),r("#loadAreas").html("&#x2717;")})),r.getJSON(o.files.districts,(function(e){u.addData(e.features),s.districts=!0,r("#loadDistricts").html("&#x2713;")})).error((function(e){console.error("Failed loading '"+o.files.districts+"'","Error: "+e.statusText),r("#loadDistricts").html("&#x2717;")})),r.getJSON(o.files.sectors,(function(e){d.addData(e.features),s.sectors=!0,r("#loadSectors").html("&#x2713;")})).error((function(e){console.error("Failed loading '"+o.files.sectors+"'","Error: "+e.statusText),r("#loadSectors").html("&#x2717;")})),t()}))}},{key:"showSideBar",value:function(){this.sidebarElement.show()}},{key:"hideSideBar",value:function(){this.sidebarElement.hide()}}]),t}(a.Component);function D(){var e=JSON.parse(localStorage.getItem("user"));return e&&e.authdata?{Authorization:"Basic "+e.authdata}:{}}var J={login:function(e,t){var n={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:e,password:t})};return fetch("/users/authenticate",n).then(j).then((function(n){return n&&(n.authdata=window.btoa(e+":"+t),localStorage.setItem("user",JSON.stringify(n))),n}))},logout:N,getAll:function(){var e={method:"GET",headers:D()};return fetch("/users",e).then(j)}};function N(){localStorage.removeItem("user")}function j(e){return e.text().then((function(t){var n=t&&JSON.parse(t);if(!e.ok){401===e.status&&(N(),window.location.reload(!0));var a=n&&n.message||e.statusText;return Promise.reject(a)}return n}))}var M=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(l.a)(this,Object(c.a)(t).call(this,e))).state={user:{},users:[]},n}return Object(u.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.setState({user:JSON.parse(localStorage.getItem("user")),users:{loading:!0}}),J.getAll().then((function(t){return e.setState({users:t})}))}},{key:"render",value:function(){var e=this.state;e.user,e.users;return r.a.createElement(C,null)}}]),t}(r.a.Component),I=n(17),G=(n(80),function(e){function t(e){var n;return Object(i.a)(this,t),n=Object(l.a)(this,Object(c.a)(t).call(this,e)),J.logout(),n.state={username:"",password:"",submitted:!1,loading:!1,error:""},n.handleChange=n.handleChange.bind(Object(I.a)(n)),n.handleSubmit=n.handleSubmit.bind(Object(I.a)(n)),n}return Object(u.a)(t,e),Object(s.a)(t,[{key:"handleChange",value:function(e){var t=e.target,n=t.name,a=t.value;this.setState(Object(y.a)({},n,a))}},{key:"handleSubmit",value:function(e){var t=this;e.preventDefault(),this.setState({submitted:!0});var n=this.state,a=n.username,r=n.password;n.returnUrl;a&&r&&(this.setState({loading:!0}),J.login(a,r).then((function(e){var n=(t.props.location.state||{from:{pathname:"/"}}).from;t.props.history.push(n)}),(function(e){return t.setState({error:e,loading:!1})})))}},{key:"render",value:function(){var e=this.state,t=e.username,n=e.password,a=e.submitted,o=e.loading,i=e.error;return r.a.createElement("div",{className:"login-page"},r.a.createElement("div",{className:"form"},r.a.createElement("h2",null,"Map Analyzer"),r.a.createElement("form",{name:"form",onSubmit:this.handleSubmit},r.a.createElement("div",{className:"form-group"+(a&&!t?" has-error":"")},r.a.createElement("input",{type:"text",className:"form-control",name:"username",value:t,onChange:this.handleChange,placeholder:"Username"}),a&&!t&&r.a.createElement("div",{className:"help-block"},"Username is required")),r.a.createElement("div",{className:"form-group"+(a&&!n?" has-error":"")},r.a.createElement("input",{type:"password",className:"form-control",name:"password",value:n,onChange:this.handleChange,placeholder:"Password"}),a&&!n&&r.a.createElement("div",{className:"help-block"},"Password is required")),r.a.createElement("div",{className:"form-group"},r.a.createElement("button",{className:"btn btn-primary",disabled:o},"Login"),o&&r.a.createElement("img",{src:"data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="})),i&&r.a.createElement("div",{className:"alert alert-danger"},i))))}}]),t}(r.a.Component)),H=function(e){function t(){return Object(i.a)(this,t),Object(l.a)(this,Object(c.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement(d.a,null,r.a.createElement("div",null,r.a.createElement(p,{exact:!0,path:"/",component:M}),r.a.createElement(h.b,{path:"/login",component:G})))}}]),t}(r.a.Component);!function(){var e=[{id:1,username:"vp",password:"vptester",firstName:"Test",lastName:"User"}],t=window.fetch;window.fetch=function(n,a){return new Promise((function(r,o){setTimeout((function(){if(n.endsWith("/users/authenticate")&&"POST"===a.method){var i=JSON.parse(a.body),s=e.filter((function(e){return e.username===i.username&&e.password===i.password}));if(s.length){var l=s[0],c={id:l.id,username:l.username,firstName:l.firstName,lastName:l.lastName};r({ok:!0,text:function(){return Promise.resolve(JSON.stringify(c))}})}else o("Username or password is incorrect")}else n.endsWith("/users")&&"GET"===a.method?a.headers&&a.headers.Authorization==="Basic ".concat(window.btoa("vp:vptester"))?r({ok:!0,text:function(){return Promise.resolve(JSON.stringify(e))}}):r({status:401,text:function(){return Promise.resolve()}}):t(n,a).then((function(e){return r(e)}))}),500)}))}}(),Object(o.render)(r.a.createElement(H,null),document.getElementById("root"))}},[[43,2,3]]]);
//# sourceMappingURL=main.cba74fd3.chunk.js.map