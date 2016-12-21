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
    var oneOptions = {};
    var loader = this;
    if (load.metadata.oneOptions) prepend(oneOptions, load.metadata.oneOptions);
    if (loader.oneOptions) prepend(oneOptions, loader.oneOptions);
    
    var extension = load.address.split(".").pop();
    var targetPluginMeta = oneOptions.meta["*." + extension];
    var targetPluginName = targetPluginMeta && targetPluginMeta.loader;
    if(targetPluginMeta && !targetPluginName) {
        return systemFetch(load); // when loader is omitted, assume plain javascript
    }

    var targetPlugin = null;
    if(!targetPluginName) return Promise.resolve()
        .then(function(){
            var extensions = Object.keys(oneOptions.meta).map(function(key){return key.replace("*","")});
            return findFirstValidAddress(load.address,extensions,systemFetch)
        }).then(function(targetAddress){
            return "export * from '"+targetAddress.replace(SystemJS.baseURL,"")+"'";  
        }).catch(function(){
            if(oneOptions.nodeFallback) {
                return "export default SystemJS._nodeRequire && SystemJS._nodeRequire('"+load.address.replace(SystemJS.baseURL,"")+"')"
            } else return Promise.reject('OnePlugin could not resolve', load)
        });
    else return Promise.resolve()
        .then(function(){return SystemJS.import(targetPluginName)}).then(function(imported){targetPlugin = imported})
        .then(function(){
            if(targetPlugin.fetch) return targetPlugin.fetch.call(this,load);
            else return systemFetch(load);
        });
}

function translate(load) {
    var oneOptions = {};
    var loader = this;
    if (load.metadata.oneOptions) prepend(oneOptions, load.metadata.oneOptions);
    if (loader.oneOptions) prepend(oneOptions, loader.oneOptions);
    
    var extension = load.address.split(".").pop();
    var targetPluginMeta = oneOptions.meta["*." + extension];
    var targetPluginName = targetPluginMeta && targetPluginMeta.loader;
    var targetPlugin = null;
    if(!targetPluginName) return load.source;
    else return Promise.resolve()
        .then(function(){return SystemJS.import(targetPluginName)}).then(function(imported){targetPlugin = imported})
        .then(function(){
            if(targetPlugin.translate) return targetPlugin.translate.call(this,load);
            else return load.source;
        });
}

module.exports.translate = translate;
module.exports.fetch = fetch;