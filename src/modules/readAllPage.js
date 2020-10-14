/**
 * 根据 pdfDocument 对象获取 pdf 的页数， 生成空的dom，用于之后渲染
 */

export default (pdfDocument) => {
  var pageList = []; // pdf Page
  var pageViewList = []; // 页面的空 dom
  var thumbViewList = []; // 空的缩略图 dom

  return new Promise((resolve, reject) => {
    var time1 = Date.now();

    var CSS_UNITS = 96 / 72;

    var count = 0;
    var len = pdfDocument.numPages;
    for (let i = 0; i < len; i++) {
      pdfDocument.getPage(i + 1).then((pdfPage) => {
        // console.log(pdfPage);
        // pdfPage.getOperatorList().then((res) => {
        //   console.log("---------");
        //   console.log(i, pdfPage);
        //   console.log(res);
        // });

        count++;
        var pageNumber = pdfPage.pageNumber;
        var viewport = pdfPage.getViewport({ scale: 1.0 });
        var viewport2 = pdfPage.getViewport({ scale: 0.3 }); // 用于显示缩略图

        // console.log(pdfDocument)

        var pageviewDom = document.createElement("div"); //
        pageviewDom.className = "pageview pageview" + pageNumber;
        pageviewDom.style.width = viewport.width * CSS_UNITS + "px";
        pageviewDom.style.height = viewport.height * CSS_UNITS + "px";

        var thubmViewDom = document.createElement("div"); //
        thubmViewDom.className = "thubmview thubmview" + pageNumber;
        thubmViewDom.style.width = viewport2.width + "px";
        thubmViewDom.style.height = viewport2.height + "px";
        thubmViewDom.innerHTML = `<div>${pageNumber}</div>`;

        pageList[i] = pdfPage;
        pageViewList[i] = pageviewDom;
        thumbViewList[i] = thubmViewDom;

        if (count == len) {
          var time2 = Date.now();
          console.log("按序读取每一页pdf：", time2 - time1);
          resolve({ pageList, pageViewList, thumbViewList });
        }
      });
    }
  });
};
