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
      'https://gist.githubusercontent.com/anaynayak/3e66e1f7b80e2f153719f8c0bbb38bf9/raw/d552cd21eec91d822d9f503c33743825f1c69f80/ne_10m_admin_1_India_Official.json',
    prop: 'name',
    question: 'Identify states of India',
    zoom: 5,
    center: [75, 12]
  },
  default: () => {
    if (window.location.pathname === '/') return Sources.INDIA;
    return {
      url: `https://raw.githubusercontent.com/anaynayak/gadm-topo/master/topojson${window.location.pathname}/1.json`,
      prop: 'NAME_1',
      question: `Identify states of ${window.location.pathname.slice(1)}`
    };
  }
});

export default Sources;
