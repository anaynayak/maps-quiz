import sampleSize from 'lodash/sampleSize';
import concat from 'lodash/concat';
import shuffle from 'lodash/shuffle';
import difference from 'lodash/difference';
import flatMap from 'lodash/flatMap';

class Questions {
  constructor(all, question) {
    this.all = shuffle(all);
    this.question = question;
  }

  allq() {
    return this.all.map(q => ({
      name: this.question,
      options: shuffle(concat(sampleSize(difference(this.all, [q]), 3), q)),
      answer: q
    }));
  }
  static from(topojson, question, prop) {
    const names = flatMap(topojson.objects, a =>
      a.geometries.map(g => g.properties[prop])
    );
    return new Questions(names, question);
  }
}

export default Questions;
