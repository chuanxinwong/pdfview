export default (list) => {
  var mainView = document.querySelector(".padfpageview");
  var thumbs = document.querySelector(".thumbs");

  mainView.addEventListener("scroll", function (e) {
    // console.log(e);

    var hei = document.body.clientHeight;
    

    for (let i = 1; i < list.length; i++) {
      var item = list[i];
      var { page, domthumb, renderContext, domview, pageView, flag } = item;

      if (!flag) {
        var bcr = domview.getBoundingClientRect();
        if (bcr.top < 3000) {
          console.log(i)
          item.flag = true;
          (function (pageView, page, renderContext) {
            setTimeout(() => {
              pageView.draw(); // 渲染单个页面
              // page.render(renderContext); // 渲染缩略图
            }, 0);
          })(pageView, page, renderContext);
        }
      }
    }

    var time2 = Date.now();
  });
};
