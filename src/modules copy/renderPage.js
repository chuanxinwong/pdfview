const pdfjsViewer = require("pdfjs-dist/web/pdf_viewer.js");

export default (page) => {
  var pageNumber = page.pageNumber;
	var viewport = page.getViewport({ scale: 1.0 });
	
	var eventBus = new pdfjsViewer.EventBus();

  var domview = document.createElement("div"); //
	domview.className = "pageview";


	eventBus.on("pagerender", function () {
		console.log(arguments)
	})
	
	eventBus.on("pagerendered", function () {
		console.log(arguments)
	})
	

  var pageView = new pdfjsViewer.PDFPageView({
    container: domview,
    id: pageNumber,
    scale: 1.0,
    defaultViewport: viewport,
    eventBus: eventBus,
    textLayerFactory: new pdfjsViewer.DefaultTextLayerFactory(),
    // annotationLayerFactory: new pdfjsViewer.DefaultAnnotationLayerFactory(),
  });

  pageView.setPdfPage(page);
  if (pageNumber < 10) {
    // pageView.draw(); // 异步方法，速度很慢
  }

  return { domview, pageView };
};
