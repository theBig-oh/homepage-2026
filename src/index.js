import '../css/style.scss';
import MakeElement from './Tools/MakeElement.js';
import NavBar from './Components/navbar.js';
import { AboutCardDesktop, AboutCardMobile } from './Pages/aboutCard.js';
import ProjectsCard from './Pages/projectsCard.js';
import Footer from './Components/footer.js';
import Spacer from './Components/spacer.js';
import Data from './data/data.js';

// Need to move this into a data file.
const siteName = 'The_Big_Oh';
const sitePages = ['About', 'Projects', 'Contact', 'Ghost'];

console.log(Data);

function RenderSite() {
	const body = document.querySelector('body');

	console.log(body);

	const makeEle = new MakeElement();

	const bodyContainer = makeEle.createEle(
		'div',
		'bodyContainer',
		false,
		'bodyContain',
	);
	const bodySpacer = makeEle.createEle('div', 'bodyContainer', false, [
		'bodyItems',
		'bodySpacer',
	]);

	const bodyLayout = [
		NavBar(siteName, sitePages),
		bodySpacer,
		AboutCardDesktop(Data.person, Data.work, Data.projects),
		AboutCardMobile(Data.person, Data.work),
		ProjectsCard(Data.projects),
		Footer(Data.person.contact),
	];

	bodyLayout.forEach((item) => {
		console.log(item);
		bodyContainer.append(item);
	});

	body.append(bodyContainer);
}

RenderSite();
