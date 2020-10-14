const pdfjsLib = require("pdfjs-dist/build/pdf");
const pdfWorker = require("pdfjs-dist/build/pdf.worker.js");
const pdfjsViewer = require("pdfjs-dist/web/pdf_viewer.js");
require("pdfjs-dist/web/pdf_viewer.css");

import renderThumb from "./modules/renderThumb";
import renderPage from "./modules/renderPage";
import listenerScroll from "./modules/listenerScroll";

window.pdfjsWorker = pdfWorker;

console.log(pdfjsLib);
console.log(pdfjsViewer);
console.log(pdfWorker);

// debugger

var time1 = 0;

var file1 = "./pdf/光大银行 2019半年度报告.PDF";

var eventBus = new pdfjsViewer.EventBus();
console.log(eventBus);

function loadPdf(file) {
  // 用于保存页面和缩略图  thumb。 view
  var list = [];

  return new Promise((resolve, reject) => {
    time1 = Date.now();
    var loadingTask = pdfjsLib.getDocument({
      url: file,
    });

    console.log(loadingTask);

    loadingTask.promise.then((pdfDocument) => {
      console.log(pdfDocument);

      var numPages = pdfDocument.numPages || 1;
      var count = 0;

      for (var i = 1; i <= numPages; i++) {
        pdfDocument.getPage(i).then((page) => {
          // pdfPage.getOperatorList().then((res) => {
          //   console.log("---------");
          //   console.log(i, pdfPage);
          //   console.log(res);
          // });
          count++;
          // console.log(page);
          var pageNumber = page.pageNumber;

          var { domthumb, renderContext } = renderThumb(page);
          var { domview, pageView } = renderPage(page, eventBus);

          /**
           * page: 解析的Page对象，
           * domthumb： 缩略图的dom
           * renderContext： 缩略图的绘制canvas 参数
           * domview： 页面的dom
           * pageView: 使用dom渲染的页面对象
           * flag： 表示是否已经渲染过了
           */
          list[pageNumber] = { page, domthumb, renderContext, domview, pageView, flag: false };

          if (count == numPages) {
            console.log("count:", count);
            resolve(list);
          }
        });
      }
    });
  });
}

loadPdf(file1).then((list) => {
  var mainView = document.querySelector(".padfpageview");
  var thumbs = document.querySelector(".thumbs");

  console.log(list);
  var count = 5; // 默认渲染的个数
  for (let i = 1; i < list.length; i++) {
    var item = list[i]
    var { page, domthumb, renderContext, domview, pageView, flag } = item;
    thumbs.appendChild(domthumb);
    mainView.appendChild(domview);

    if (i < count && !flag) {
      list[i].flag = true;
      (function (item) {
        setTimeout(() => {
          var { pageView, page, renderContext } = item;
          var time1 = Date.now();

          // 渲染单个页面
          pageView.draw().then((res) => {
            var time2 = Date.now();
            console.log(time2 - time1);
          });
          // page.render(renderContext); // 渲染缩略图
        }, 0);
      })(item);
    }
  }

  listenerScroll(list);
});
