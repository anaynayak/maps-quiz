import sampleSize from 'lodash/sampleSize';
import concat from 'lodash/concat';
import shuffle from 'lodash/shuffle';

class Questions {
  static Countries =
    'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json';
  constructor(all) {
    this.all = all;
  }

  allq() {
    return this.all.map(q => ({
      name: 'Identify the country',
      options: shuffle(concat(sampleSize(this.all, 3), q)),
      answer: q
    }));
  }
}

export default Questions;
