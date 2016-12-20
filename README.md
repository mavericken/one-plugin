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

The config is critical to making this work, so I'll show you right here in the readme:
```
SystemJS.config({
  packages: {
    "app": {
      "defaultExtension": "one", // Notice that you need a default extension to make this work.
      "meta": {
        "*.ts": { // You include each of your loader configs like normal.
          "loader": "ts"
        },
        "*.tsx": {
          "loader": "ts"
        },
        "*.coffee": {
          "loader": "coffee"
        },
        "*.one": { // This plugin is hardcoded to use the ".one" extension.
          "oneOptions": { // The oneOptions tells which file extensions to try, and in what order.
            "extensions": [
              ".ts", // The first extension in your list will not have to incur the cost of a 404 check.
              ".tsx",
              ".js",
              ".coffee" // To get to .coffee, you will incur 3 404 errors.
            ]
          },
          "loader": "one-plugin.js"
        }
      }
    }
  }
});
```

I also have included an experimental feature.  If you use SystemJS in a node environment, try out "nodeFallback: true" under oneOptions.  Once the plugin runs out of extensions to try, it will simply try to use node require instead, which might work if you have npm installed what you were looking for.

