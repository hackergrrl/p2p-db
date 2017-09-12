module.exports = DB

function DB (hyper) {
  if (!(this instanceof DB)) return new DB(hyper)

  if (!hyper) throw new Error('missing param "hyper"')

  // ...
}

DB.prototype.install = function (name, api) {
  if (typeof api !== 'object') throw new Error('"api" must be an object')
  if (this[name]) throw new Error('unable to install "'+name+'" -- property already present')

  this[name] = api
}

DB.prototype.replicate = function (opts) {
  return this.hyper.replicate(opts)
}

