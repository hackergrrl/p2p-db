# p2p-db

> An open-ended peer-to-peer database.

## Usage

```js
var p2p = require('p2p-db')
var hyperdb = require('hyperdb')
var ram = require('random-access-memory')

var hyper = hyperdb(ram, { valueEncoding: 'json' })
var db = p2p(hyper)

// ...
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

