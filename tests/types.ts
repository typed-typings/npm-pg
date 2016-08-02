import {types} from '../index.d';

types.setTypeParser(20, function(val) {
  //val is a String
  return parseInt(val);
});

types.setTypeParser(99, 'binary', function(val) {
  //val is a Buffer
});

