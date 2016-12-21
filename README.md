# one-plugin
One SystemJS plugin to rule them all

This plugin allows you to use multiple plugins in the same directory without relying on a uniform default extension.
The reason I made this plugin is that I prefer to organize my files by what they do, not how they are transpiled.

So, lets say you had all these files in a single directory:
```
tsx-test.tsx 
ts-test.ts
js-test.js
coffee-test.coffee
main.js
```

And main.js looks like this:
```
import 'tsx-test'
import 'ts-test'
import 'js-test'
import 'coffee-test'
```

Your main.js can load each of those files with their respective plugins without specifying the file extension.
Nothing is magic, of course, as this plugin will simply try to fetch for each file extension until it finds one that works.
If you bundle your app, however, this price is paid at build time.

See the example under examples/jspm.
You can see the bundled version working right here: https://cdn.rawgit.com/mavericken/one-plugin/0.0.2/examples/jspm/index-with-bundle.html

The config is critical to making this work, so I'll show you right here in the readme:
```
SystemJS.config({
  ...
  packages: {
    "app": {
      "defaultExtension": false,
      "meta": {
        "*": {                 // Use one-plugin to load everything.
          "oneOptions": {
            "meta": {          // Put your individual plugin configurations here
              "*.ts": {        // Files with the first extension will not have 404 errors
                "loader": "ts" // Currently only supports "loader", with fetch and transpile
              },
              "*.tsx": {       // To get here it would need to 404 on *.ts first
                "loader": "ts"
              },
              "*.js":{         // 2 404s here on ts and tsx
                               // If you leave loader blank, it will be treated as normal javascript
              },
              "*.coffee": {    // No 404s if you bundle, however
                "loader": "coffee"
              }
            }
          },
          "loader": "one-plugin.js"
        }
      }
    }
  }
  ...
});
```

I also have included an experimental feature. If you use SystemJS in a node environment, try out "nodeFallback: true" under oneOptions. Once the plugin runs out of extensions to try, it will simply try to use node require instead, which might work if you have npm-installed what you were looking for.