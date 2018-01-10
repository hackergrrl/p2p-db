module.exports = DB

var combine = require('depj')

// Depject helper function
DB.provide = function (name, obj) {
  return {
    gives: name,
    needs: [],
    create: function (api) {
      return obj
    }
  }
}

function DB (deps) {
  var baseApi = {
    gives: 'replicate',
    needs: ['hyperdb'],
    create: function (api) {
      return replicate.bind(api.hyperdb)
    }
  }

  deps = deps.concat(baseApi)

  return combine(deps)
}

function replicate (opts) {
  return this.replicate(opts)
}

