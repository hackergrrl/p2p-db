# p2p-db

> An open-ended peer-to-peer database.

## Mad Science

I don't know what this is or what it will be or if the API will change. Still
experimenting. Don't rely on this for anything, but *do* send PRs and issues
with your thoughts!

Semantic versioning will be respected.

## Goals

1. have a minimal api that requires no knowledge of the underlying layers (hyperdb, etc)
2. implement all logic in pluggable API modules that offer logic and views over
   the append-only log data in hyperdb
3. work in node, electron, and the browser
4. be very very fast for document insertion, iteration, and replication

## Usage

Let's create a minimal distributed OpenStreetMap database:

```js
// database creation
var p2p = require('p2p-db')
var hyperdb = require('hyperdb')
var ram = require('random-access-memory')

var hyper = hyperdb(ram, { valueEncoding: 'json' })
var db = p2p(hyper)


// add an API module that extends the database with OpenStreetMap primitives &
// operations
var OsmTypes = require('p2p-db-osm')

db.install('osm', Osm(db))

db.osm.beginChangeset(function (err, id) {
  db.osm.insertNode({
    lat: 14,
    lon: 27,
    changeset: id,
    tags: {}
  })
  db.osm.finishChangeset(id)
})

// add a view for querying points
var GeoStore = require('grid-point-store')
var memdb = require('memdb')
var Spatial = require('p2p-db-point-store')

var geo = GeoStore(memdb())

db.install('geo', Spatial(db, geo))



// sync with another p2p-db
var db2 = p2p(hyper(ram(), { valueEncoding: 'json' }))

var rs1 = db.replicate()
var rs2 = db2.replicate()

rs1.pipe(rs2).pipe(rs1)

rs1.once('end', onDone)
rs1.once('error', onDone)

function onDone (err) {
  console.log('replication', err ? 'failed' : 'succeeded')

  // query data
  db2.geo.query([[-30, -30], [30, 30]], function (err, nodes) {
    console.log(err, nodes)
  })
}
```

outputs

```
replication succeeded
{ lat: 14, lon: 27, changeset: '52033272934', tags: {} }
```

## API

```js
var p2p = require('p2p-db')
```

### var db = p2p(hyper)

Creates a new p2p-db `db`, using the
[hyperdb](https://github.com/mafintosh/hyperdb) instance `hyper`.

### db.install(name, api)

Installs the API provided by the object instance `api`.

`name` becomes a property of `db` referring to the object `api`. An error is
thrown if there is a name conflict with an existing API.

### var ds = db.replicate([opts])

Creates a duplex stream `ds` that can be used to replicate this database with a
p2p-db on the other end of another replication stream.

Valid `opts` include:

- `live` (Boolean): if `true`, the duplex stream will not close on its own: new
  changes will continue to be sent in both directions. Defaults to `false`.

## Implementing a p2p-db API

*TODO*

## Install

With [npm](https://npmjs.org/) installed, run

```
$ npm install p2p-db
```

## See Also

- [flumedb](https://github.com/flumedb/flumedb)
- [hyperdb](https://github.com/mafintosh/hyperdb)

## License

ISC

