import MakeElement from '../Tools/MakeElement.js';

const makeEle = new MakeElement;

export default function ProjectsCard() {
	let projectCard = makeEle.createEle('div','projectCardContainer',[12,12,12,12],['projectCardContainer','bodyItems']);

	let projectTitle = makeEle.createEle('div','projectCardTitle', [12,12,6,6],['projectCardTitle']);

	projectTitle.innerHTML = `<div class="title">Projects</div>`;

	projectCard.append(projectTitle);


	return projectCard;
}