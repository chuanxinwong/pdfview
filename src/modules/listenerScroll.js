import renderOnePage from "./renderOnePage";

export default (gdata) => {

  var { pageList, pageViewList, thumbViewList, renderList } = gdata;


  var mainViewIndex = -1;

  var mainView = document.querySelector(".padfpageview");
  var thumbView = document.querySelector(".thumbs");

  // 滚动鼠标滚轮的节流
  var timeout = null;

  mainView.addEventListener("scroll", function (e) {
    updateThumbTop(); // 滚动时更新 缩略图的位置
    renderOne();
  });

  // 用那一个dom滚动判断
  function renderOne() {
    // 清除正在渲染的列表
    // cancleList();

    // 清除上一次的准备渲染的倒计时
    if (timeout) {
      clearTimeout(timeout);
    }

    // 创建一个新的倒计时渲染
    timeout = setTimeout(() => {
      var hei = document.body.clientHeight;
      for (let i = 1; i < pageViewList.length; i++) {
        const item = pageViewList[i];
        var bcr = item.getBoundingClientRect();
        var top = bcr.top;
        
        if (top > 0 && top < hei && !renderList[i]) {
          // 渲染对应的页面。
          var pafPage = pageList[i];
          var domView = pageViewList[i];
          var thumbView = thumbViewList[i]; // 缩略图

          var rendering = renderOnePage(pafPage, domView, thumbView);
          renderList[i] = rendering;
        }
      }
    }, 30);
  }

  // 清除正在渲染的列表
  function cancleList() {
    for (let i = 0; i < renderList.length; i++) {
      const runing = renderList[i];
      if (runing && runing.rendering === 0) {
        runing.cancelRendering();
        console.log("cancelRendering:", i);
      }
    }
  }

  // 更新所缩略图的top
  function updateThumbTop() {
    var hei = document.body.clientHeight;
    for (let i = 0; i < pageViewList.length; i++) {
      const item = pageViewList[i];
      var bcr = item.getBoundingClientRect();
      var top = bcr.top;
      if (top > 0 && top < hei && mainViewIndex != i) {
        mainViewIndex = i;
        var thumb = thumbViewList[i];

        var thtop = thumb.offsetTop;

        var ttop = thtop - hei / 2;
        // console.log(i, ttop);

        thumbView.scroll(0, ttop);
      }
    }
  }
};
