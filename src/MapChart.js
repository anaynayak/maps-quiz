import React from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker
} from 'react-simple-maps';
import { ZoomableGroup } from 'react-simple-maps';
import { geoArea, geoCentroid } from 'd3-geo';
class MapChart extends React.PureComponent {
  isSelected(geo) {
    return geo.properties[this.props.source.prop] === this.props.selected;
  }

  isSmall(geo) {
    return this.isSelected(geo) && geoArea(geo) < 0.0001;
  }
  render() {
    return (
      <ComposableMap
        data-tip=""
        projection="geoMercator"
        projectionConfig={{
          scale: 100
        }}
      >
        <ZoomableGroup
          zoom={this.props.source.zoom}
          center={this.props.source.center}
        >
          <Geographies geography={this.props.source.url}>
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
          <Geographies geography={this.props.source.url}>
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
                        stroke="yellow"
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
