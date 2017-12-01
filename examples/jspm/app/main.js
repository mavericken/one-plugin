import 'app/js-test'
import 'app/ts-test'
import 'app/tsx-test'
import 'app/coffee-test'


SystemJS.import("app/coffee-test2-for-import");

var container = document.getElementById("container");
container.innerHTML += "<p>Hello from main.js</p>";