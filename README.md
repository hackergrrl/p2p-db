# p2p-db

> An open-ended peer-to-peer database.

## Usage

```js
// database creation
var p2p = require('p2p-db')
var hyperdb = require('hyperdb')
var ram = require('random-access-memory')

var hyper = hyperdb(ram, { valueEncoding: 'json' })
var db = p2p(hyper)

// add a schema
db.schema('node', {
  isValid: function (node) {
    return typeof node.lat === 'number' &&
           typeof node.lon === 'number' &&
           typeof node.tags === 'object'
  },
  // isCorrect: function (node, cb) {
  //   // ...
  //   cb()
  // }
})

// add a view
var Spatial = require('p2p-db-point-store')
var GeoStore = require('grid-point-store')
var memdb = require('memdb')

var geo = GeoStore(memdb())

db.view('geo', Spatial(geo))

// insert & query data
db.insert('node', { lat: 14, lon: 27, tags: {} })
db.geo.query([[-30, -30], [30, 30]], function (err, nodes) {
  console.log(err, nodes)
})
```

outputs

```
...
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

