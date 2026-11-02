import MakeElement from '../Tools/MakeElement.js';
import facePic from '../assets/img/face.png';

const makeEle = new MakeElement;


export default function AboutCard(data) {
	console.log('this is the title card');

	let info = data ? data : null;

	let aboutCard = makeEle.createEle('div','aboutCard',[12,12,12,12],['bodyContainerItem','aboutCardContainer','bodyItems']);
	let aboutCardBG = makeEle.createEle('div','aboutCardBG',[12,12,12,12],['aboutCardBG','aboutCardContainerContent']);
	let aboutCardContent = makeEle.createEle('div','aboutCardContent',[12,12,12,12],['aboutCardContent','aboutCardContainerContent']);
	let aboutCardName = makeEle.createEle('div','aboutCardName',[12,12,6,6],['aboutCardName','aboutCardInnerContent']);
	let aboutCardInfo = makeEle.createEle('div','aboutCardInfo', [12,12,6,6],['aboutCardInfo','aboutCardInnerContent']);
	let aboutCardWork = makeEle.createEle('div','aboutCardWork', [12,12,12,12],['aboutCardWork','aboutCardInnerContent']);
	let aboutCardSkill = makeEle.createEle('div','aboutCardSkill',[12,12,12,12],['aboutCardSkill','aboutCardInnerContent']);
	let aboutCardPortrait = makeEle.createEle('div','aboutCardPortrait',[12,12,6,6],['aboutCardPortrait','aboutCardInnerContent']);
	console.log(data.skillSet);

	data.skillSet.forEach((skill, i) => {
		let skillDiv = makeEle.createEle('div','skillDiv_'+i,[12,12,12,12],['skillDiv','skillDiv_'+i]);

		skillDiv.innerHTML = `<p>${skill.name}</p>`;

		aboutCardSkill.append(skillDiv.cloneNode(true));
	})

	aboutCardName.innerHTML = `<div> Oscar Medrano </div>`; // Change to an SVG later
	aboutCardInfo.innerHTML = `
		<div class="basic-info">
			<p class="basic-title">Software Developer / Web Developer</p>
			<p class="skill-set-title">Skill Set </p>
		</div>
	`;

	aboutCardInfo.append(aboutCardSkill);

	aboutCardPortrait.innerHTML = `<img src="${facePic}" alt="Oscar Medrano portrait" class="portrait-pic" />`;

	const MAX_OFFSET = 200;
	const speed = 0.5;  // anything less than 1 slows the drift

	const onScroll = () => {
		const offsetY = Math.min(window.scrollY * speed, MAX_OFFSET);
		const offsetX = Math.min(window.scrollY * speed, MAX_OFFSET);

		aboutCardName.style.transform = `translateY(${offsetY}px) translateX(${offsetX}px)`;
	}

	window.addEventListener('scroll', onScroll, {passive:true});

	aboutCardContent.append(aboutCardName, aboutCardPortrait, aboutCardInfo);	

	aboutCard.append(aboutCardContent);

	return aboutCard;

}