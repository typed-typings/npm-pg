import * as pg from "../index.d"

var pool = pg.pools.all['abc']
var size = pool.getPoolSize()