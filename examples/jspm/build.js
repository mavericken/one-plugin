System.registerDynamic("app/js-test.js", [], false, function ($__require, $__exports, $__module) {
  var _retrieveGlobal = System.get("@@global-helpers").prepareGlobal($__module.id, null, null);

  (function ($__global) {
    var container = $__global["container"];
    var container = document.getElementById("container");
    container.innerHTML += "<p>Hello from js-test.js</p>";
    $__global["container"] = container;
  })(this);

  return _retrieveGlobal();
});
System.register('app/js-test', ['app/js-test.js'], function (_export, _context) {
  "use strict";

  return {
    setters: [function (_appJsTestJs) {
      var _exportObj = {};

      for (var _key in _appJsTestJs) {
        if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _appJsTestJs[_key];
      }

      _export(_exportObj);
    }],
    execute: function () {}
  };
});
System.register("app/ts-test.ts", [], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var Enum, container;
    return {
        setters: [],
        execute: function () {
            (function (Enum) {
                Enum[Enum["ThisWasInATypescriptEnum"] = 0] = "ThisWasInATypescriptEnum";
            })(Enum || (Enum = {}));
            container = document.getElementById("container");
            container.innerHTML += "<p>Hello from ts-test.ts <i>" + Enum[Enum.ThisWasInATypescriptEnum] + "</i></p>";
        }
    };
});
System.register('app/ts-test', ['app/ts-test.ts'], function (_export, _context) {
  "use strict";

  return {
    setters: [function (_appTsTestTs) {
      var _exportObj = {};

      for (var _key in _appTsTestTs) {
        if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _appTsTestTs[_key];
      }

      _export(_exportObj);
    }],
    execute: function () {}
  };
});
System.register("app/tsx-test.tsx", [], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var Enum, container, React, somethingSpecificToTSX;
    return {
        setters: [],
        execute: function () {
            (function (Enum) {
                Enum[Enum["ThisWasInATypescriptEnum"] = 0] = "ThisWasInATypescriptEnum";
            })(Enum || (Enum = {}));
            container = document.getElementById("container");
            React = {};
            React.createElement = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return "called React.createElement with arguments " + JSON.stringify(args);
            };
            somethingSpecificToTSX = React.createElement("div", null);
            container.innerHTML += "<p>Hello from tsx-test.tsx <i>" + Enum[Enum.ThisWasInATypescriptEnum] + ", " + somethingSpecificToTSX + "</i></p>";
        }
    };
});
System.register('app/tsx-test', ['app/tsx-test.tsx'], function (_export, _context) {
  "use strict";

  return {
    setters: [function (_appTsxTestTsx) {
      var _exportObj = {};

      for (var _key in _appTsxTestTsx) {
        if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _appTsxTestTsx[_key];
      }

      _export(_exportObj);
    }],
    execute: function () {}
  };
});
System.registerDynamic("app/coffee-test.coffee", [], false, function ($__require, $__exports, $__module) {
  var _retrieveGlobal = System.get("@@global-helpers").prepareGlobal($__module.id, null, null);

  (function ($__global) {
    var container = $__global["container"],
        specialCoffeeMessage = $__global["specialCoffeeMessage"];
    var container, specialCoffeeMessage;

    container = document.getElementById("container");

    if (true) {
      specialCoffeeMessage = "did something weird with coffee script";
    }

    container.innerHTML += "<p>Hello from coffee-test.coffee <i>" + specialCoffeeMessage + "</i></p>";
    $__global["container"] = container;
    $__global["specialCoffeeMessage"] = specialCoffeeMessage;
  })(this);

  return _retrieveGlobal();
});
System.register('app/coffee-test', ['app/coffee-test.coffee'], function (_export, _context) {
  "use strict";

  return {
    setters: [function (_appCoffeeTestCoffee) {
      var _exportObj = {};

      for (var _key in _appCoffeeTestCoffee) {
        if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _appCoffeeTestCoffee[_key];
      }

      _export(_exportObj);
    }],
    execute: function () {}
  };
});
System.register('app/main.js', ['app/js-test', 'app/ts-test', 'app/tsx-test', 'app/coffee-test'], function (_export, _context) {
  "use strict";

  var container;
  return {
    setters: [function (_appJsTest) {}, function (_appTsTest) {}, function (_appTsxTest) {}, function (_appCoffeeTest) {}],
    execute: function () {
      container = document.getElementById("container");

      container.innerHTML += "<p>Hello from main.js</p>";
    }
  };
});
System.register('app/main', ['app/main.js'], function (_export, _context) {
  "use strict";

  return {
    setters: [function (_appMainJs) {
      var _exportObj = {};

      for (var _key in _appMainJs) {
        if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _appMainJs[_key];
      }

      _export(_exportObj);
    }],
    execute: function () {}
  };
});
//# sourceMappingURL=build.js.map