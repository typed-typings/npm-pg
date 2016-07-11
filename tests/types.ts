import {types} from '../index.d';

types.setTypeParser(20, function(val) {
  return parseInt(val);
});
