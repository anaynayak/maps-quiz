import React, { memo } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

const geoUrl =
  'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json';

const MapChart = ({ selected }) => {
  return (
    <ComposableMap
      data-tip=""
      projection="geoMercator"
      projectionConfig={{
        scale: 100
      }}
    >
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map(geo => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              fill={geo.properties.NAME === selected ? '#F53' : '#9998A3'}
              stroke="#EAEAEC"
            />
          ))
        }
      </Geographies>
    </ComposableMap>
  );
};

export default memo(MapChart);
