# p2p-db

> An open-ended peer-to-peer database.

## Usage

Let's create a minimal distributed OpenStreetMap database:

```js
// database creation
var p2p = require('p2p-db')
var hyperdb = require('hyperdb')
var ram = require('random-access-memory')

var hyper = hyperdb(ram, { valueEncoding: 'json' })
var db = p2p(hyper)


// add an API module that extends the database with OpenStreetMap primitives
var OsmTypes = require('p2p-db-osm-types')

db.install('osm', OsmTypes())

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

db.install('geo', Spatial(geo))


// insert & query data
db.geo.query([[-30, -30], [30, 30]], function (err, nodes) {
  console.log(err, nodes)
})
```

outputs

```
{ lat: 14, lon: 27, changeset: '52033272934', tags: {} }
```

## API

```js
var p2p = require('p2p-db')
```

### var db = p2p(hyper)

Creates a new p2p-db `db`, using the
[hyperdb](https://github.com/mafintosh/hyperdb) instance `hyper`.


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

