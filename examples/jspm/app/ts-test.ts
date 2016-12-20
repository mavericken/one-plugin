enum Enum {
    ThisWasInATypescriptEnum
}
var container = document.getElementById("container");
container.innerHTML += "<p>Hello from ts-test.ts <i>"+Enum[Enum.ThisWasInATypescriptEnum]+"</i></p>";