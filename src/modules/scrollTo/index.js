import goPage from "./goPage";
import findText from "./findText";

export default (gdata, pageIndex, txt) => {
	goPage(gdata, pageIndex);
	
	findText(gdata, pageIndex, txt)
};
