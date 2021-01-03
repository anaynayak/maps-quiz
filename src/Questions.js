import sampleSize from 'lodash/sampleSize';
import concat from 'lodash/concat';
import shuffle from 'lodash/shuffle';
import difference from 'lodash/difference';
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
}

export default Questions;
