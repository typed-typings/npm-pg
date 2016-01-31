import * as pg from "../pg.d"

var pool = pg.pools.all['abc']
var size = pool.getPoolSize()