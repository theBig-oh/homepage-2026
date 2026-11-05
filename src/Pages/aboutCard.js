import MakeElement from '../Tools/MakeElement.js';
import facePic from '../assets/img/bw-face.webp';

const makeEle = new MakeElement;

const tabs = {
	'mobile': ['bio','exp'],
	'desktop': ['bio','exp','projects']
};


function aboutTabClickFunction(dest) {
	document.querySelectorAll('.aboutCard--tab-content').forEach((tabbed) => {
		tabbed.classList.remove('active');
		tabbed.classList.add('hidden');
	})

	document.querySelectorAll('.aboutTab').forEach((tabLink) => {
		tabLink.classList.toggle('active', tabLink.classList.contains('aboutTab_'+dest));
	})

	const target = document.querySelector('.aboutCard--'+dest);

	target.classList.remove('hidden');
	target.classList.add('active');
}

// Bio copytext: write your paragraph(s) about yourself here
const BIO_COPY = `<p>NYC-raised front end developer who builds things for the web, 
					and lately for smart glasses. When I\'m not coding I\'m probably playing guitar, 
					hunting down good food, or being upstaged by my dog, who has his own fan club.</p>
				  <p>I've been programming professionally since 2017, and been involved in tech most of my life. I can program
					a computer, or build you a custom one for any purpose.</p>
					<p>I believe in delivering quality work in a fast turnaround. So let's get in contact and see what we can accomplish together</p>
					<p> P.S. If you're still reading this, try to find my dog, he's hidden somewhere in this site. --- <span>Hint: The logo</span> </p>
					</br>
					<p class="sig">Oscar Medrano</p>
			
				`;

export function AboutCardDesktop(data, work, projects) {
	const aboutCardDesktop = makeEle.createEle('div','About-Desktop',[0,0,12,12],['bodyContainerItem','aboutCardContainer','bodyItems','aboutCard','aboutCardDesktop']);

	// Structure
	let aboutCardContent = makeEle.createEle('div','AboutCardContent',[0,0,12,12],['aboutCardContent']);
	let aboutCardTabs = makeEle.createEle('div','AboutCardTabs',[0,0,12,12],['aboutCardTabs']);
	let aboutCardLeft = makeEle.createEle('div','AboutCardLeft',null,['aboutCardLeft']);
	let aboutCardRight = makeEle.createEle('div','AboutCardRight',null,['aboutCardRight']);

	//Content


	//Portrait - Desktop
	let aboutCardPortrait = makeEle.createEle('div','AboutCardPortrait',[0,0,12,12],['aboutCard--portrait']);
	let aboutCardPortraitImage = makeEle.createEle('img','AboutCard--port-img',[12,12,12,12],['aboutCard--img','aboutCardPortrait--item']);
	let aboutCardPortraitName = makeEle.createEle('div', 'AboutCard--port-name',[12,12,12,12],['aboutCard--port-name','aboutCardPortrait--item']);

	aboutCardPortraitImage.src = facePic;
	aboutCardPortraitName.innerHTML = `<h2> Oscar Medrano </h2>`;

	aboutCardPortrait.append(aboutCardPortraitName, aboutCardPortraitImage);

	//Tabs
	tabs.desktop.forEach((tab, i) => {

		let aboutTabLink = makeEle.createEle('div','aboutTab_'+i,null,['aboutTab','aboutTab_'+tab]);
		aboutTabLink.innerHTML = `${tab}`;

		aboutTabLink.addEventListener('click', function(e) {
			aboutTabClickFunction(tab);
			console.log(e);
		})

		aboutCardTabs.append(aboutTabLink);
	})


	//Bio section
	let aboutCardBioSection = makeEle.createEle('div','aboutBio',null,['aboutCard--bio','bio','aboutCard--tab-content']);
	let aboutCardBioText = makeEle.createEle('div','aboutBio--content',null,['aboutCard--bio--text','aboutCard--bio-content']);
	let aboutCardBioSkills = makeEle.createEle('div','aboutBio--skills',null,['aboutCard--bio--skills','aboutCard--bio-content']);
	let aboutSkillContain = makeEle.createEle('div','aboutSkillContain',null,['aboutSkillContain']);
	aboutCardBioText.innerHTML = `
		<div class="basic-info">
			${BIO_COPY}
		</div>
	`;

	aboutCardBioSkills.innerHTML = `<h3> Skills: </h3>`;
	data.skillSet.forEach((skill, i) => {
		let skillDiv = makeEle.createEle('div','skillDiv_'+i,null,['skillDiv','skillDiv_'+i]);

		skillDiv.innerHTML = `
			<span class="skillIcon">${skill.icon || ''}</span>
			<p>${skill.name}</p>
		`;

		aboutSkillContain.append(skillDiv.cloneNode(true));
	})

	aboutCardBioSkills.append(aboutSkillContain);

	aboutCardBioSection.append(aboutCardBioText, aboutCardBioSkills);

	//Exp section
	let aboutCardExpSection = makeEle.createEle('div','aboutExp',[0,0,12,12],['aboutCard--exp','exp','aboutCard--tab-content']);

	(work || []).forEach((job, i) => {
		let workJob = makeEle.createEle('div','aboutWork-job-'+i,null,['aboutCard--exp--work-job','job-site']);
		let dates = `${job.startDate} - ${job.isPresent ? 'Present' : job.endDate}`;

		workJob.innerHTML = `
			<h3 class="exp-name">${job.name}</h3>
			<p class="exp-position">${job.position}</p>
			<p class="exp-dates">${dates}</p>
			<ul class="exp-duties">${job.duties.map((duty) => `<li>${duty}</li>`).join('')}</ul>
		`;

		aboutCardExpSection.append(workJob.cloneNode(true));
	})

	//Projects section
	let aboutCardProjectsSection = makeEle.createEle('div','aboutProjects',[0,0,12,12],['aboutCard--projects','projects','aboutCard--tab-content']);

	(projects || []).forEach((project, i) => {
		let projectItem = makeEle.createEle('div','projectItem_'+i, null,['projectItem']);

		projectItem.innerHTML = `
			<img class="project-image" src="${project.projectImage}" alt="${project.name} screenshot" loading="lazy" />
			<h3 class="project-name">
				${project.name}
			</h3>
			<p class="project-framework">${project.framework}</p>
			<ul class="project-purpose">${project.purpose.map((line) => `<li>${line}</li>`).join('')}</ul>
			<a class="project-link" href="${project.url}" target="_blank" rel="noopener noreferrer"> Link To Project </a>
		`;

		aboutCardProjectsSection.append(projectItem);
	});


	//Putting everything together now
	aboutCardLeft.append(aboutCardPortrait, aboutCardTabs);
	aboutCardRight.append(aboutCardBioSection, aboutCardExpSection, aboutCardProjectsSection)
	aboutCardContent.append(aboutCardLeft, aboutCardRight);

	aboutCardDesktop.append(aboutCardContent);


	//Animations 
	const MAX_OFFSET = 150;
	const speed = 0.5;  // anything less than 1 slows the drift

	const onScroll = () => {
		const progress = Math.min(window.scrollY * speed, MAX_OFFSET);

		// Starts MAX_OFFSET px above its resting spot and drifts down to 0
		aboutCardPortraitName.style.transform = `translateY(${progress - MAX_OFFSET}px)`;
		// On only once the drift has finished (hit MAX_OFFSET); off again when it backs off
		aboutCardPortraitName.classList.toggle('scrolling', progress >= MAX_OFFSET);
	}

	window.addEventListener('scroll', onScroll, {passive:true});
	onScroll(); // set correct state on load (e.g. refresh mid-scroll)

	// Initial state: Bio shown, others hidden (elements aren't in the DOM yet, so set classes directly)
	[aboutCardBioSection, aboutCardExpSection, aboutCardProjectsSection].forEach((section, i) => {
		section.classList.toggle('hidden', i !== 0);
		section.classList.toggle('active', i === 0);
	});
	aboutCardTabs.firstElementChild.classList.add('active');

	return aboutCardDesktop;
}



export function AboutCardMobile(data, work) {

	let aboutCard = makeEle.createEle('div','About',[12,12,12,12],['bodyContainerItem','aboutCardContainer','bodyItems','aboutCard', 'aboutCardMobile']);
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

		skillDiv.innerHTML = `
			<span class="skillIcon">${skill.icon || ''}</span>
			<p>${skill.name}</p>
		`;

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
	const panels = { bio: aboutCardBio, exp: aboutCardExp };
	const buttons = {};

	const selectTab = (tab) => {
		tabs.mobile.forEach((name) => {
			const isActive = name === tab;

			buttons[name].classList.toggle('active', isActive);
			buttons[name].setAttribute('aria-selected', isActive);
			panels[name].hidden = !isActive;
		});
	};

	aboutCardSwitch.setAttribute('role', 'tablist');

	tabs.mobile.forEach((name) => {
		const btn = document.createElement('button');

		btn.type = 'button';
		btn.className = 'aboutSwitchBtn';
		btn.innerHTML = name;
		btn.setAttribute('role', 'tab');
		btn.addEventListener('click', () => selectTab(name));

		buttons[name] = btn;
		aboutCardSwitch.append(btn);
	});

	aboutCardInfo.append(aboutCardSwitch, aboutCardBio, aboutCardExp);
	selectTab('bio');

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