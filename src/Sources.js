const Sources = Object.freeze({
  WORLD: {
    url:
      'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json',
    prop: 'NAME',
    question: 'Identify the country',
    zoom: 1,
    center: [0, 0]
  },
  INDIA: {
    url:
      'https://gist.githubusercontent.com/anilnairxyz/1ca20f47982712cf6d4128064e3a6feb/raw/3e0c829745ebf567cb8e15399168ba2777ba1864/ne_10m_admin_1_India_Official.json',
    prop: 'name',
    question: 'Identify states of India',
    zoom: 5,
    center: [73, 20]
  }
});

export default Sources;
