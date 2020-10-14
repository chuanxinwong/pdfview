export default (page) => {
  var viewport = page.getViewport({ scale: 0.3 });
  var pageNumber = page.pageNumber;

  var domthumb = document.createElement("div");
  var index = document.createElement("div");
  var canvas = document.createElement("canvas");
  var cc = canvas.getContext("2d");

  index.innerText = pageNumber;
  domthumb.className = "thumbitem";
  domthumb.appendChild(canvas);
  domthumb.appendChild(index);

  canvas.width = viewport.width;
  canvas.height = viewport.height;

  var renderContext = {
    canvasContext: cc,
    viewport: viewport,
  };

  if (pageNumber < 10) {
    // page.render(renderContext);
  }

  return {
    domthumb,
    renderContext,
  };
};
