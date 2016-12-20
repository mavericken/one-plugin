//uses some code from https://github.com/systemjs/plugin-babel

function findFirstValidAddress(address, ext, systemFetch) {
    return new Promise(function(resolve,reject){
        if(ext.length === 0) return reject("");
        else return resolve(Promise.resolve(systemFetch({address:address + ext[0], name:address + ext[0], metadata:{}})).then(function(){
            var test = address + ext[0];
            return address + ext[0]
        }).catch(function(){
            return findFirstValidAddress(address, ext.slice(1), systemFetch)
        }))
    })
}

function prepend(a, b) {
  for (var p in b)
    if (!(p in a))
      a[p] = b[p];
  return a;
}

function fetch(load, systemFetch) {
  var loader = this;
  var pluginLoader = loader.pluginLoader || loader;

  var oneOptions = {};
  if (load.metadata.oneOptions)
    prepend(oneOptions, load.metadata.oneOptions);

  if (loader.babelOptions)
    prepend(oneOptions, loader.oneOptions);

  prepend(oneOptions, oneOptions);

    if(oneOptions.extensions.some(function(extension){
        return load.address.endsWith(extension);
    })) return systemFetch.call(this,load);
    else {
        var addressWithoutDotOne = load.address.replace(/\.one$/,"")
        var result = findFirstValidAddress(addressWithoutDotOne,oneOptions.extensions,systemFetch).then(function(targetAddress){
            return "export * from '"+targetAddress.replace(SystemJS.baseURL,"")+"'";    
        })
        if(oneOptions.nodeFallback) result = result.catch(function(){
           return "export default SystemJS._nodeRequire && SystemJS._nodeRequire('"+addressWithoutDotOne.replace(SystemJS.baseURL,"")+"')" 
        })
        return result;
    }
}

module.exports.fetch = fetch;

