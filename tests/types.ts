import {types} from '../index.d';

types.setTypeParser(20, function (val: string) {
  return parseInt(val);
});

types.setTypeParser(99, 'binary', function (val: Buffer) {});

