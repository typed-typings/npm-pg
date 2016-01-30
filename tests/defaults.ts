import * as pg from "../pg.d"

pg.defaults.poolSize = 25;

var pool = pg.pools.all['abc']
var size = pool.getPoolSize()