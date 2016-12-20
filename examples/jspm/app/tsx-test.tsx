enum Enum {
    ThisWasInATypescriptEnum
}
var container = document.getElementById("container");
var React = {} as any;
React.createElement = function(...args){return "called React.createElement with arguments "+ JSON.stringify(args)};
var somethingSpecificToTSX = <div></div>;
container.innerHTML += "<p>Hello from tsx-test.tsx <i>"+Enum[Enum.ThisWasInATypescriptEnum]+", "+somethingSpecificToTSX+"</i></p>";