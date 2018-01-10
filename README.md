# p2p-db

> An open-ended peer-to-peer database.

## Mad Science

I'm still figuring out what this is and how it will work. Don't rely on this for
anything yet, but *do* file issues or ping me on IRC `#ddem` with your thoughts!

Semantic versioning will be respected.

## Goals

1. have a minimal api that requires no knowledge of the underlying layers (hyperdb, etc) for consumers
2. implement all logic in pluggable API modules that offer logic and views over
   the append-only log data in hyperdb
3. work in node, electron, and the browser
4. be very very fast for document insertion, iteration, and replication

## Usage

Let's create a minimal distributed OpenStreetMap database using p2p-db and
[p2p-db-osm](https://github.com/noffle/p2p-db-osm):

*TODO: finish making this example run!*

```js
var p2p = require('p2p-db')
var hyperdb = require('hyperdb')
var ram = require('random-access-memory')
var memdb = require('memdb')
var GeoStore = require('grid-point-store')

function createDatabase () {
  var hyper = hyperdb(ram, { valueEncoding: 'json' })
  var level = memdb()

  return p2p([
    // Base runtime dependency for p2p-db: a hyperdb instance
    p2p.provide('hyperdb', hyper),

    // API that extends the database with OpenStreetMap primitives & operations
    require('p2p-db-osm'),
    p2p.provide('leveldb', level),  // needed for p2p-db-osm
    p2p.provide('pointstore', new GeoStore(memdb())),  // needed for p2p-db-osm
  ])
}

var db = createDatabase()

db.osm.create({
  lat: 14,
  lon: 27,
  changeset: '123',
  tags: {}
}, function (err, elm) {
  console.log(err || elm)

  // sync with another p2p-db
  var db2 = createDatabase()

  var rs1 = db.replicate()
  var rs2 = db2.replicate()

  rs1.pipe(rs2).pipe(rs1).once('end', onDone)
})

function onDone () {
  console.log('replication done')

  // query data
  db2.osm.query([[-30, -30], [30, 30]], function (err, nodes) {
    console.log(err, nodes)
  })
}
```

outputs

```
replication done
{ lat: 14, lon: 27, changeset: '123', tags: {} }
```

## API

```js
var p2p = require('p2p-db')
```

### var db = p2p(deps)

Creates a new p2p-db `db`, using the [depj](https://github.com/noffle/depj)
dependencies given. At minimum p2p-db expects a `'hyperdb'`.

The included dependencies form an API, exposed through the resultant `db`
object.

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

- [hyperdb](https://github.com/mafintosh/hyperdb)
- [flumedb](https://github.com/flumedb/flumedb)
- [depj](https://github.com/noffle/depj)

## License

ISC

