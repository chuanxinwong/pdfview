const pdfjsLib = require("pdfjs-dist/build/pdf");
const pdfWorker = require("pdfjs-dist/build/pdf.worker.js");
const pdfjsViewer = require("pdfjs-dist/web/pdf_viewer.js");
require("pdfjs-dist/web/pdf_viewer.css");

import renderThumb from "./modules/renderThumb";
import renderPage from "./modules/renderPage";
import listenerScroll from "./modules/listenerScroll";
import clickThumb from './modules/clickThumb';
import clickTag from "./modules/clickTag";

import readAllPage from "./modules/readAllPage";
import renderOnePage from "./modules/renderOnePage";

window.pdfjsWorker = pdfWorker;

console.log(pdfjsLib);
console.log(pdfWorker);
console.log(pdfjsViewer);

// debugger

// var file1 = "./pdf/光大银行 2019半年度报告.PDF";
var file1 = "./pdf/奥克斯-2018y.pdf";


function loadPdf(file) {
  var time1 = Date.now();
  var loadingTask = pdfjsLib.getDocument({
    url: file,
  });

  return loadingTask.promise.then((pdfDocument) => {
    console.log(pdfDocument);
    var time2 = Date.now();
    console.log("加载pdf耗时：", time2 - time1);
    return pdfDocument;
  });
}

var gdata = {
  pageList: [],    // pdf page 对象
  pageViewList: [],   // 主页面 dom 列表
  thumbViewList: [],  // 缩略图 dom 列表
  renderList: [],   // 正在渲染的列表
};

window.gd = gdata;

loadPdf(file1)
  .then((pdfDocument) => {
    // 生成 空的dom, 排列顺序
    return readAllPage(pdfDocument);
  })
  .then(({ pageList, pageViewList, thumbViewList }) => {
    // 根据空的 dom 生产 空白的页面
    // 把空的 dom 加入到页面中

    gdata.pageList = pageList;
    gdata.pageViewList = pageViewList;
    gdata.thumbViewList = thumbViewList;

    var mainView = document.querySelector(".padfpageview");
    var thumbView = document.querySelector(".thumbs");

    var time1 = Date.now();

    // 空 dom 添加到页面
    for (let i = 0; i < pageViewList.length; i++) {
      mainView.appendChild(pageViewList[i]);
      thumbView.appendChild(thumbViewList[i]);
    }

    var time2 = Date.now();
    console.log("按序生成空页面：", time2 - time1);
  })
  .then(() => {
    var { pageList, pageViewList, thumbViewList } = gdata;

    // 默认生成3个页面
    for (let i = 0; i < 3; i++) {
      renderOnePage(pageList[i], pageViewList[i], thumbViewList[i]);
    }

    // 开始监听滚动事件
    listenerScroll(gdata);
    clickThumb(gdata);
    clickTag(gdata)
  });
