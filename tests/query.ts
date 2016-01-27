import * as pg from "../pg.d"

var conn2 = new pg.Client({ host: "localhost", user: "", password: "" })
var query2 = conn2.query({ name: "getAlls", text: "SELECT * FROM person" })

query2.on("row", (row, result) => {
  result.addRow(row)
})

query2.on("row", (row) => {

})

query2.on("error", (err) => {

})

query2.on("end", (result) => {
  console.log(result.rowCount)
})

conn2.end()