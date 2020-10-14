const pdfjsViewer = require("pdfjs-dist/web/pdf_viewer.js");

export default (pdfPage, domView, thumbView) => {
  
  var time1 = Date.now();
  var pageNumber = pdfPage.pageNumber;
  var viewport = pdfPage.getViewport({ scale: 1.0 });

  var dom = document.createElement("div");
  var eventBus = new pdfjsViewer.EventBus();

  // 正在渲染的对象
  var randering = new pdfjsViewer.PDFPageView({
    container: dom,
    id: pageNumber,
    scale: 1.0,
    defaultViewport: viewport,
    eventBus: eventBus,
    textLayerFactory: new pdfjsViewer.DefaultTextLayerFactory(),
    annotationLayerFactory: new pdfjsViewer.DefaultAnnotationLayerFactory(),
  });

  randering.setPdfPage(pdfPage);
  randering.rendering = 0;    // 0 表示正在进行渲染

  
  // draw 异步方法，速度很慢
  randering.draw().then((res) => {
    var time2 = Date.now();
    console.log("生成一个页面：", pageNumber, time2 - time1);
    

    // 根据已经 渲染的页面生成缩略图
    var canvas = dom.querySelector("canvas");
    var thumbw = parseInt(thumbView.style.width);
    var thumbh = parseInt(thumbView.style.height);
    var canvas2 = document.createElement("canvas");
    var cc2 = canvas2.getContext("2d");
    canvas2.width = thumbw;
    canvas2.height = thumbh;
    thumbView.appendChild(canvas2);
    cc2.drawImage(canvas, 0, 0, thumbw, thumbh);
    domView.appendChild(dom);

    // 只有完全渲染完成 才有这个属性
    if (randering.rendering === 0) {
      randering.rendering = 1;
      console.log(randering.textLayer)
    }
  });

  return randering;
};
