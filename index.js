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

            SystemJS.one = SystemJS.one || {};
            SystemJS.one.sources = SystemJS.one.sources || {};
            SystemJS.one.inputs = SystemJS.one.sources || {};
            

function translate(load) {
    var oneOptions = {};

    SystemJS.one.inputs[load.address] = load.source;

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

            if(load.source.indexOf("SourceMeta") >=0 ){
                var searchPosition = load.source.length;
                var lineToken = "SourceMeta.line";
                while(searchPosition){
                    console.log("hmm")
                    var position = load.source.lastIndexOf(lineToken,searchPosition)
                    searchPosition = position-1;
                    if(searchPosition <= 0) break;
                    load.source = load.source.slice(0,position) + load.source.slice(0,position).split(/\r\n|\r|\n/).length + load.source.slice(position + lineToken.length)    
                }
                load.source = "var SourceMeta={address:"+JSON.stringify(load.address)+",path:"+JSON.stringify(load.address).replace(SystemJS.baseURL,"")+"};" + load.source;
            }
            if(targetPlugin.translate) return targetPlugin.translate.call(loader,load);
            else return load;
            
        }).then(function(val){
            SystemJS.one.sources[load.address] = val;
            //console.log("typescript result", val)
            return val;
        })
        // .then(function(){return SystemJS.import("plugin-babel")}).then(function(imported){targetPlugin = imported})
        // .then(function(){
        //    // console.log(loader.babelOptions);
        //     //console.log(load)
        //     //console.log("pluginLoader",loader.pluginLoader)
        //     load.metadata.babelOptions = loader.babelOptions
        //     if(targetPlugin.translate) return targetPlugin.translate.call(loader,load);
        //     else return load;
        // })
        // ;
}

module.exports.translate = translate;
module.exports.fetch = fetch;