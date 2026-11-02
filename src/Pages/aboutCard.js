import MakeElement from '../Tools/MakeElement.js';
import facePic from '../assets/img/bw-face.webp';

const makeEle = new MakeElement;


const TABS = ['Bio', 'Exp'];

// Bio copytext: write your paragraph(s) about yourself here
const BIO_COPY = 'I\'m a simple software developer raised in NYC, who likes guitars, food, and interacting with tech, with a dog who has his own fan club.';

export default function AboutCard(data, work) {
	console.log('this is the title card');


	let aboutCard = makeEle.createEle('div','About',[12,12,12,12],['bodyContainerItem','aboutCardContainer','bodyItems']);
	let aboutCardContent = makeEle.createEle('div','aboutCardContent',[12,12,12,12],['aboutCardContent','aboutCardContainerContent']);
	let aboutCardName = makeEle.createEle('div','aboutCardName',[12,12,6,6],['aboutCardName','aboutCardInnerContent']);
	let aboutCardInfo = makeEle.createEle('div','aboutCardInfo', [12,12,6,6],['aboutCardInfo','aboutCardInnerContent']);
	let aboutCardSkill = makeEle.createEle('div','aboutCardSkill',[12,12,12,12],['aboutCardSkill','aboutCardInnerContent']);
	let aboutCardPortrait = makeEle.createEle('div','aboutCardPortrait',[12,12,6,6],['aboutCardPortrait','aboutCardInnerContent']);
	let aboutCardSwitch = makeEle.createEle('div','aboutCardSwitch',null,['aboutCardSwitch']);
	let aboutCardBio = makeEle.createEle('div','aboutCardBio',null,['aboutPanel','aboutCardBio']);
	let aboutCardExp = makeEle.createEle('div','aboutCardExp',null,['aboutPanel','aboutCardExp']);
	let aboutCardNameTitle = makeEle.createEle('div','aboutCardNameTitle', [12,12,12,12],['aboutCardNameTitle']);

	aboutCardNameTitle.innerHTML = `			
			<div class="basic-title">
				<span>Software / Web </span>
				<br/>
				<span>Developer</span>
			</div>
`;

	console.log(data.skillSet);

	data.skillSet.forEach((skill, i) => {
		let skillDiv = makeEle.createEle('div','skillDiv_'+i,[12,12,12,12],['skillDiv','skillDiv_'+i]);

		skillDiv.innerHTML = `<p>${skill.name}</p>`;

		aboutCardSkill.append(skillDiv.cloneNode(true));
	})

	aboutCardName.append(aboutCardPortrait);


	aboutCardName.innerHTML = `<div class="name-text"> Oscar Medrano </div>`; // Change to an SVG later
	aboutCardBio.innerHTML = `
		<div class="basic-info">
			<p class="bio-copy">${BIO_COPY}</p>
		</div>
		<div class="skillHeader"> 
			<p> Skills: 
		</div>

	`;

	// Skills live inside the Bio panel
	aboutCardBio.append(aboutCardSkill);

	// Exp panel, built from the work data
	(work || []).forEach((job) => {
		let jobDiv = makeEle.createEle('div', null, null, ['expItem']);
		let dates = `${job.startDate} - ${job.isPresent ? 'Present' : job.endDate}`;

		jobDiv.innerHTML = `
			<h3 class="exp-name">${job.name}</h3>
			<p class="exp-position">${job.position}</p>
			<p class="exp-dates">${dates}</p>
			<ul class="exp-duties">${job.duties.map((duty) => `<li>${duty}</li>`).join('')}</ul>
		`;

		aboutCardExp.append(jobDiv);
	});

	// 2 button switch: Bio (copy + skills) / Exp
	const panels = { Bio: aboutCardBio, Exp: aboutCardExp };
	const buttons = {};

	const selectTab = (tab) => {
		TABS.forEach((name) => {
			const isActive = name === tab;

			buttons[name].classList.toggle('active', isActive);
			buttons[name].setAttribute('aria-selected', isActive);
			panels[name].hidden = !isActive;
		});
	};

	aboutCardSwitch.setAttribute('role', 'tablist');

	TABS.forEach((name) => {
		const btn = document.createElement('button');

		btn.type = 'button';
		btn.className = 'aboutSwitchBtn';
		btn.textContent = name;
		btn.setAttribute('role', 'tab');
		btn.addEventListener('click', () => selectTab(name));

		buttons[name] = btn;
		aboutCardSwitch.append(btn);
	});

	aboutCardInfo.append(aboutCardSwitch, aboutCardBio, aboutCardExp);
	selectTab('Bio');

	aboutCardPortrait.innerHTML = `<img src="${facePic}" alt="Oscar Medrano portrait" class="portrait-pic" />`;
	aboutCardName.append(aboutCardPortrait, aboutCardNameTitle);

	const MAX_OFFSET = 150;
	const speed = 0.5;  // anything less than 1 slows the drift

	const onScroll = () => {
		const offsetY = Math.min(window.scrollY * speed, MAX_OFFSET);

		aboutCardName.style.transform = `translateY(${offsetY}px)`;
		// On only once the drift has finished (hit MAX_OFFSET); off again when it backs off
		aboutCardName.classList.toggle('scrolling', offsetY >= MAX_OFFSET);
	}

	window.addEventListener('scroll', onScroll, {passive:true});
	onScroll(); // set correct state on load (e.g. refresh mid-scroll)

	aboutCardContent.append(aboutCardName, aboutCardInfo);	

	aboutCard.append(aboutCardContent);

	return aboutCard;

}