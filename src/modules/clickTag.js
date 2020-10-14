import scrollTo from "./scrollTo";

export default function (gdata) {
  var { pageViewList, thumbViewList } = gdata;

  var mainView = document.querySelector(".padfpageview");
  var tags = document.querySelector(".tags");

  tags.addEventListener("click", function (e) {
    var tgt = e.target;

    if (tgt.className == "tag") {
      scrollTo(gdata, 20, "报告期末，本集团贷款和垫款本金总额25,929.70亿元");
    }
  });
}
