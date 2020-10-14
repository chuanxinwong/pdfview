export default function (gdata) {
  var { pageViewList, thumbViewList } = gdata;

  var mainView = document.querySelector(".padfpageview");
  var thumbs = document.querySelector(".thumbs");

  thumbs.addEventListener("click", function (e) {
    var tgt = e.target;

    // thubmview

    if (tgt.tagName == "CANVAS") {
      tgt = tgt.parentNode;
    }

    if (tgt.className.indexOf("thubmview") > -1) {
      var index = tgt.querySelector("div").innerText;
      index -= 1;

      var page = pageViewList[index];

      var bcr = page.getBoundingClientRect();

      // debugger
      var stop = mainView.scrollTop;
      var top = bcr.top + stop + bcr.height;

      console.log(top);

      mainView.scroll(0, top);
    }
  });
}
