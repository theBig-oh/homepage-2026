import MakeElement from '../Tools/MakeElement.js';

const makeEle = new MakeElement;

function Spacer(spaceName, spaceContent) {
	const spacerContainer = makeEle.createEle('div',spaceName+'__spacer', null, ['spacer','bodyItems',spaceName+'__spacer']);




	return spacerContainer;
}

export default Spacer;