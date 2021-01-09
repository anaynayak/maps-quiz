import React from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker
} from 'react-simple-maps';
import { ZoomableGroup } from 'react-simple-maps';
import { geoArea, geoCentroid, geoLength } from 'd3-geo';
class MapChart extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      zoom: this.props.source.zoom,
      center: this.props.source.center,
      selected: this.props.selected
    };
  }
  isSelected(geo) {
    return geo.properties[this.props.source.prop] === this.props.selected;
  }

  isSmall(geo) {
    return this.isSelected(geo) && geoArea(geo) < 0.0001;
  }
  zoomLevel(geo) {
    const x = geoLength(geo);
    return 5;
  }
  center(geo) {
    const [x, y] = geoCentroid(geo);
    return [x, y - 10];
  }
  parseGeographies(geos) {
    setTimeout(() => {
      const geo = geos.find(g => this.isSelected(g));
      const viewport = {
        zoom: this.zoomLevel(geo),
        center: this.center(geo),
        selected: this.props.selected
      };
      if (this.props.selected !== this.state.selected) this.setState(viewport);
    });
    geos.map(g => this.zoomLevel(g));
    return geos;
  }
  render() {
    const parseGeographies = this.parseGeographies.bind(this);
    return (
      <ComposableMap
        data-tip=""
        projection="geoMercator"
        projectionConfig={{
          scale: 100
        }}
      >
        <ZoomableGroup zoom={this.state.zoom} center={this.state.center}>
          <Geographies
            geography={this.props.topojson}
            parseGeographies={parseGeographies}
          >
            {({ geographies }) =>
              geographies.map(geo => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={this.isSelected(geo) ? '#F53' : '#9998A3'}
                  stroke="#EAEAEC"
                  strokeWidth=".1"
                />
              ))
            }
          </Geographies>
          <Geographies geography={this.props.topojson}>
            {({ geographies }) =>
              geographies.map(
                geo =>
                  this.isSmall(geo) && (
                    <Marker
                      key={`${geo.rsmKey}-m`}
                      coordinates={geoCentroid(geo)}
                    >
                      <g
                        fill="none"
                        stroke="#F53"
                        strokeWidth=".3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        transform="translate(-12, -12)"
                      >
                        <circle cx="12" cy="12" r="2" />
                      </g>
                    </Marker>
                  )
              )
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    );
  }
}

export default MapChart;
