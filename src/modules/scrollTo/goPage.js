export default (gdata, pageIndex) => {
  var mainView = document.querySelector(".padfpageview");
  var { pageViewList } = gdata;

  var page = pageViewList[pageIndex];
  var bcr = page.getBoundingClientRect();

  var stop = mainView.scrollTop;
  var top = bcr.top + stop + bcr.height;

  console.log(top);

  mainView.scroll(0, top);
};
