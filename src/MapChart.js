import React, { memo } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { ZoomableGroup } from 'react-simple-maps';

const MapChart = ({ selected, source }) => {
  return (
    <ComposableMap
      data-tip=""
      projection="geoMercator"
      projectionConfig={{
        scale: 100
      }}
    >
      <ZoomableGroup zoom={source.zoom} center={source.center}>
        <Geographies geography={source.url}>
          {({ geographies }) =>
            geographies.map(geo => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={
                  geo.properties[source.prop] === selected ? '#F53' : '#9998A3'
                }
                stroke="#EAEAEC"
              />
            ))
          }
        </Geographies>
      </ZoomableGroup>
    </ComposableMap>
  );
};

export default memo(MapChart);
