export default (gdata, pageIndex, txt) => {
  var { pageList, pageViewList, thumbViewList, renderList } = gdata;
  

  var intv = setInterval(() => {
    var pdfView = pageViewList[pageIndex + 1]
    var render = renderList[pageIndex + 1] || {};
    var textLayer = render.textLayer;
    console.log(textLayer);
    if (textLayer && textLayer.textContentItemsStr.length) {
      clearInterval(intv);

      console.log(textLayer);
      console.log(txt);

      const { textContentItemsStr, textDivs } = textLayer;
      var txtarr = txt.split("");

      for (let i = 0; i < textContentItemsStr.length; i++) {
        var cha = textContentItemsStr[i];
        var count = 0; // 统计是否完全一致
        var len = txtarr.length;
        for (let ii = 0; ii < len; ii++) {
          const ti = txtarr[ii];

          if (cha != ti) {
            break;
          } else {
            count++;
            cha = textContentItemsStr[i + count];
          }
        }

        // 找到了 i 和 len
        if (count == len) {
          var start = i;
          var end = start + count;

          var minTop = 9999,
            maxTop = 0,
            minLeft = 9999,
            maxLeft = 0;

          var lastOffsetWidth = 0;
          while (start++ < end && start < textContentItemsStr.length) {
            var span = textDivs[start];
            var { offsetLeft,  offsetTop , offsetHeight, offsetWidth} = span;

            minTop = Math.min(minTop, offsetTop);
            maxTop = Math.max(maxTop, offsetTop);
            minLeft = Math.min(minLeft, offsetLeft);
            maxLeft = Math.max(maxLeft, offsetLeft);
            lastOffsetWidth = offsetWidth;
          }

          var mainView = document.querySelector(".padfpageview");
          var tipRect = document.querySelector(".tiprect");
          var pdfBcr = pdfView.getBoundingClientRect();
          var scrollTop = mainView.scrollTop;

          var left = minLeft + pdfBcr.left - 300 - 20
          var top = scrollTop + pdfBcr.top + minTop;
          var hei = maxTop - minTop || offsetHeight;
          var wid = maxLeft - minLeft + lastOffsetWidth;

          tipRect.style.top = top + "px";
          tipRect.style.left = left + "px";
          tipRect.style.height = hei + "px";
          tipRect.style.width = wid + "px";


          // debugger
        }
      }
    }
  }, 10);
};
