module.exports = DB

function DB (hyper) {
  if (!(this instanceof DB)) return new DB(hyper)

  if (!hyper) throw new Error('missing param "hyper"')

  // ...
}
