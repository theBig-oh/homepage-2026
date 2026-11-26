import MakeElement from '../Tools/MakeElement.js';
import facePic from '../assets/img/bw-face.webp';
import selfPic from '../assets/img/self.webp';

const makeEle = new MakeElement();

const tabs = {
	mobile: ['bio', 'exp'],
	desktop: ['bio', 'exp'],
};

let tabSwitching = false;

function aboutTabClickFunction(dest) {
	const target = document.querySelector('.aboutCard--' + dest);
	const current = document.querySelector('.aboutCard--tab-content.active');

	if (tabSwitching || !target || target === current) return;

	document.querySelectorAll('.aboutTab').forEach((tabLink) => {
		tabLink.classList.toggle(
			'active',
			tabLink.classList.contains('aboutTab_' + dest),
		);
	});

	const show = () => {
		document.querySelectorAll('.aboutCard--tab-content').forEach((tabbed) => {
			tabbed.classList.remove('active');
			tabbed.classList.add('hidden');
		});
		target.classList.remove('hidden');
		target.classList.add('active');
	};

	const reduceMotion = window.matchMedia(
		'(prefers-reduced-motion: reduce)',
	).matches;

	if (!current || reduceMotion) {
		show();
		return;
	}

	// Moving to a later tab: old slides out left, new slides in from the right (and vice versa)
	const currentIndex = tabs.desktop.findIndex((t) =>
		current.classList.contains(t),
	);
	const direction = tabs.desktop.indexOf(dest) > currentIndex ? 1 : -1;

	tabSwitching = true;
	current
		.animate(
			[
				{ transform: 'translateX(0)', opacity: 1 },
				{ transform: `translateX(${-direction * 100}vw)`, opacity: 0 },
			],
			{ duration: 300, easing: 'ease-in', fill: 'forwards' },
		)
		.finished.then(() => {
			show();
			return target.animate(
				[
					{ transform: `translateX(${direction * 100}vw)`, opacity: 0 },
					{ transform: 'translateX(0)', opacity: 1 },
				],
				{ duration: 400, easing: 'ease-out' },
			).finished;
		})
		.finally(() => {
			current.getAnimations().forEach((animation) => animation.cancel());
			tabSwitching = false;
		});
}

const BIO_COPY = `<p><span class="intro">NYC-raised front end developer --</span></p>
<p>I'm <span>Oscar Medrano</span>. For the past 8+ years, I have been building products end to end in Vue, React and TypeScript, mostly for consumer brands like <br/> <span>people</span>, <span>inStyle</span>, <span>the spruce</span> and <span>Food&amp;Wine</span>.</p>
<p>Not being a stranger to <span>A.I.</span> as it is part of the daily workflow, with <span>claude code</span>, <span>cursor</span>, <span>windsurf</span> and <span>chatGPT</span> in the mix. Most recently, I developed an AI workflow to cut development time by 20% at People Inc.</p>
<p>Tech has been part of life long before the career started with coding simple IRC scripts at age 10, to building custom PC's and attaining <span> COMPTIA A&plus;</span> certification. Off the clock, it's <span>Music</span>, which explains why half my side projects are music related.</p>
<p>Quality work and fast turnaround is always a <span>Priority</span>. So let's get in <span>Contact</span> and see what we can accomplish <span>Together</span>.</p>
<p>P.S. If you're still reading this, try to find my dog, he's hidden somewhere in this site. --- <span class="hint">Hint: The logo</span></p>
<br>
<div class="sig">Oscar Medrano</div>
				`;

export function AboutCardDesktop(data, work, projects) {
	const aboutCardDesktop = makeEle.createEle(
		'div',
		'About-Desktop',
		[0, 0, 12, 12],
		[
			'bodyContainerItem',
			'aboutCardContainer',
			'bodyItems',
			'aboutCard',
			'aboutCardDesktop',
		],
	);

	const aboutCardContent = makeEle.createEle(
		'div',
		'AboutCardContent',
		[0, 0, 12, 12],
		['aboutCardContent'],
	);
	const aboutCardTabs = makeEle.createEle(
		'div',
		'AboutCardTabs',
		[0, 0, 12, 12],
		['aboutCardTabs'],
	);
	const aboutCardLeft = makeEle.createEle('div', 'AboutCardLeft', null, [
		'aboutCardLeft',
	]);
	const aboutCardRight = makeEle.createEle('div', 'AboutCardRight', null, [
		'aboutCardRight',
	]);

	const aboutCardPortrait = makeEle.createEle(
		'div',
		'AboutCardPortrait',
		[0, 0, 12, 12],
		['aboutCard--portrait'],
	);
	const aboutCardPortraitImage = makeEle.createEle(
		'img',
		'AboutCard--port-img',
		[12, 12, 12, 12],
		['aboutCard--img', 'aboutCardPortrait--item'],
	);
	const aboutCardPortraitName = makeEle.createEle(
		'div',
		'AboutCard--port-name',
		[12, 12, 12, 12],
		['aboutCard--port-name', 'aboutCardPortrait--item'],
	);

	aboutCardPortraitImage.src = facePic;
	aboutCardPortraitName.innerHTML = `<h2> Oscar Medrano </h2>`;

	aboutCardPortrait.append(aboutCardPortraitName, aboutCardPortraitImage);

	tabs.desktop.forEach((tab, i) => {
		const aboutTabLink = makeEle.createEle('div', 'aboutTab_' + i, null, [
			'aboutTab',
			'aboutTab_' + tab,
		]);
		aboutTabLink.innerHTML = `${tab}`;

		aboutTabLink.addEventListener('click', function (e) {
			aboutTabClickFunction(tab);
		});

		aboutCardTabs.append(aboutTabLink);
	});

	const aboutCardBioSection = makeEle.createEle('div', 'aboutBio', null, [
		'aboutCard--bio',
		'bio',
		'aboutCard--tab-content',
	]);
	const aboutCardBioText = makeEle.createEle('div', 'aboutBio--content', null, [
		'aboutCard--bio--text',
		'aboutCard--bio-content',
	]);
	const aboutCardBioSkills = makeEle.createEle('div', 'aboutBio--skills', null, [
		'aboutCard--bio--skills',
		'aboutCard--bio-content',
	]);
	const aboutSkillContain = makeEle.createEle('div', 'aboutSkillContain', null, [
		'aboutSkillContain',
	]);
	const aboutSelfContain = makeEle.createEle('div', 'aboutSelfContain', null, [
		'aboutSelfContain',
	]);
	const aboutSelfPic = makeEle.createEle('img', 'aboutSelfPic', null, [
		'aboutSelfPic',
	]);

	aboutCardBioText.innerHTML = `
		<div class="basic-info">
			${BIO_COPY}
		</div>
	`;

	aboutCardBioSkills.innerHTML = `<h3> Skills: </h3>`;
	data.skillSet.forEach((skill, i) => {
		const skillDiv = makeEle.createEle('div', 'skillDiv_' + i, null, [
			'skillDiv',
			'skillDiv_' + i,
		]);

		skillDiv.innerHTML = `
			<span class="skillIcon">${skill.icon || ''}</span>
			<p>${skill.name}</p>
		`;

		aboutSkillContain.append(skillDiv.cloneNode(true));
	});

	aboutSelfPic.src = selfPic;
	aboutCardBioSkills.append(aboutSkillContain);

	aboutSelfContain.append(aboutSelfPic);
	aboutCardBioSection.append(
		aboutCardBioText,
		aboutSelfContain,
		aboutCardBioSkills,
	);

	const aboutCardExpSection = makeEle.createEle(
		'div',
		'aboutExp',
		[0, 0, 12, 12],
		['aboutCard--exp', 'exp', 'aboutCard--tab-content'],
	);

	(work || []).forEach((job, i) => {
		const workJob = makeEle.createEle('div', 'aboutWork-job-' + i, null, [
			'aboutCard--exp--work-job',
			'job-site',
		]);
		const dates = `${job.startDate} - ${job.isPresent ? 'Present' : job.endDate}`;

		workJob.innerHTML = `
			<h3 class="exp-name">${job.name}</h3>
			<p class="exp-position">${job.position}</p>
			<p class="exp-dates">${dates}</p>
			<ul class="exp-duties">${job.duties.map((duty) => `<li>${duty}</li>`).join('')}</ul>
		`;

		aboutCardExpSection.append(workJob.cloneNode(true));
	});

	const aboutCardProjectsSection = makeEle.createEle(
		'div',
		'aboutProjects',
		[0, 0, 12, 12],
		['aboutCard--projects', 'projects', 'aboutCard--tab-content'],
	);

	const aboutCardProjectTabSelector = makeEle.createEle(
		'div',
		'aboutProjectsSelector',
		[0, 0, 12, 12],
		['aboutCard--project--selector', 'aboutCard--projectSectionSelector'],
	);
	const projectItemContainer = makeEle.createEle(
		'div',
		'projectItemContainer',
		null,
		['projectItemContainer'],
	);

	(projects || []).forEach((project, i) => {
		const projectNavItem = makeEle.createEle('div', 'projectItemTab_' + i, null, [
			'projectItemTab',
			'aboutCard--projectSectionSelector--tab',
			'aboutCard--projectSectionSelector--' + project.codeName,
			'projectItemTab__' + project.codeName,
		]);
		const projectItem = makeEle.createEle('div', 'projectItem_' + i, null, [
			'projectItem',
			'projectItem__' + project.codeName,
		]);

		projectNavItem.innerHTML = `
			<div class="projectTab--name"> ${project.name} </div>
		`;

		projectNavItem.addEventListener('click', function (e) {
			document.querySelectorAll('.projectItemTab').forEach((item) => {
				item.classList.remove('activeProject');

				if (item.classList.contains('projectItemTab__' + project.codeName)) {
					item.classList.add('activeProject');
				}
			});
			document.querySelectorAll('.projectItem').forEach((item) => {
				item.classList.remove('activeProject');

				if (item.classList.contains('projectItem__' + project.codeName)) {
					item.classList.add('activeProject');
				}
			});
		});

		if (i == 0) {
			projectItem.classList.add('activeProject');
			projectNavItem.classList.add('activeProject');
		}

		projectItem.innerHTML = `
			<img class="project-image" src="${project.projectImage}" alt="${project.name} screenshot" loading="lazy" />
			<h3 class="project-name">
				${project.name}
			</h3>
			<p class="project-framework">${project.framework} <span class="skillIcon">${project.frameIcon || ''}</span> </p> 
			<ul class="project-purpose">${project.purpose.map((line) => `<li>${line}</li>`).join('')}</ul>
			<a class="project-link" href="${project.url}" target="_blank" rel="noopener noreferrer"> Link To Project </a>
		`;

		aboutCardProjectTabSelector.append(projectNavItem);
		projectItemContainer.append(projectItem);
	});

	projectItemContainer;
	aboutCardProjectsSection.append(
		aboutCardProjectTabSelector,
		projectItemContainer,
	);

	aboutCardLeft.append(aboutCardPortrait, aboutCardTabs);
	aboutCardRight.append(aboutCardBioSection, aboutCardExpSection);
	aboutCardContent.append(aboutCardLeft, aboutCardRight);

	aboutCardDesktop.append(aboutCardContent);

	const MAX_OFFSET = 150;
	const speed = 0.5;

	const onScroll = () => {
		const progress = Math.min(window.scrollY * speed, MAX_OFFSET);

		aboutCardPortraitName.style.transform = `translateY(${progress - MAX_OFFSET}px)`;
		aboutCardPortraitName.classList.toggle('scrolling', progress >= MAX_OFFSET);
	};

	window.addEventListener('scroll', onScroll, { passive: true });
	onScroll();

	const projectTabs = document.querySelectorAll('.projectItemTab');

	[aboutCardBioSection, aboutCardExpSection, aboutCardProjectsSection].forEach(
		(section, i) => {
			section.classList.toggle('hidden', i !== 0);
			section.classList.toggle('active', i === 0);
		},
	);
	aboutCardTabs.firstElementChild.classList.add('active');

	return aboutCardDesktop;
}

export function AboutCardMobile(data, work) {
	const aboutCard = makeEle.createEle(
		'div',
		'About',
		[12, 12, 12, 12],
		[
			'bodyContainerItem',
			'aboutCardContainer',
			'bodyItems',
			'aboutCard',
			'aboutCardMobile',
		],
	);
	const aboutCardContent = makeEle.createEle(
		'div',
		'aboutCardContent',
		[12, 12, 12, 12],
		['aboutCardContent', 'aboutCardContainerContent'],
	);
	const aboutCardName = makeEle.createEle(
		'div',
		'aboutCardName',
		[12, 12, 6, 6],
		['aboutCardName', 'aboutCardInnerContent'],
	);
	const aboutCardInfo = makeEle.createEle(
		'div',
		'aboutCardInfo',
		[12, 12, 6, 6],
		['aboutCardInfo', 'aboutCardInnerContent'],
	);
	const aboutCardSkill = makeEle.createEle(
		'div',
		'aboutCardSkill',
		[12, 12, 12, 12],
		['aboutCardSkill', 'aboutCardInnerContent'],
	);
	const aboutCardPortrait = makeEle.createEle(
		'div',
		'aboutCardPortrait',
		[12, 12, 6, 6],
		['aboutCardPortrait', 'aboutCardInnerContent'],
	);
	const aboutCardSwitch = makeEle.createEle('div', 'aboutCardSwitch', null, [
		'aboutCardSwitch',
	]);
	const aboutCardBio = makeEle.createEle('div', 'aboutCardBio', null, [
		'aboutPanel',
		'aboutCardBio',
	]);
	const aboutCardExp = makeEle.createEle('div', 'aboutCardExp', null, [
		'aboutPanel',
		'aboutCardExp',
	]);
	const aboutCardNameTitle = makeEle.createEle(
		'div',
		'aboutCardNameTitle',
		[12, 12, 12, 12],
		['aboutCardNameTitle'],
	);

	aboutCardNameTitle.innerHTML = `			
			<div class="basic-title">
				<span>Software / Web </span>
				<br/>
				<span>Developer</span>
			</div>
`;

	console.log(data.skillSet);

	data.skillSet.forEach((skill, i) => {
		const skillDiv = makeEle.createEle(
			'div',
			'skillDiv_' + i,
			[12, 12, 12, 12],
			['skillDiv', 'skillDiv_' + i],
		);

		skillDiv.innerHTML = `
			<span class="skillIcon">${skill.icon || ''}</span>
			<p>${skill.name}</p>
		`;

		aboutCardSkill.append(skillDiv.cloneNode(true));
	});

	aboutCardName.append(aboutCardPortrait);

	aboutCardName.innerHTML = `<div class="name-text"> Oscar Medrano </div>`;
	aboutCardBio.innerHTML = `
		<div class="basic-info">
			<p class="bio-copy">${BIO_COPY}</p>
		</div>
		<div class="skillHeader"> 
			<p> Skills: 
		</div>

	`;

	aboutCardBio.append(aboutCardSkill);

	(work || []).forEach((job) => {
		const jobDiv = makeEle.createEle('div', null, null, ['expItem']);
		const dates = `${job.startDate} - ${job.isPresent ? 'Present' : job.endDate}`;

		jobDiv.innerHTML = `
			<h3 class="exp-name">${job.name}</h3>
			<p class="exp-position">${job.position}</p>
			<p class="exp-dates">${dates}</p>
			<ul class="exp-duties">${job.duties.map((duty) => `<li>${duty}</li>`).join('')}</ul>
		`;

		aboutCardExp.append(jobDiv);
	});

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
	const speed = 0.5;

	const onScroll = () => {
		const offsetY = Math.min(window.scrollY * speed, MAX_OFFSET);

		aboutCardName.style.transform = `translateY(${offsetY}px)`;
		aboutCardName.classList.toggle('scrolling', offsetY >= MAX_OFFSET);
	};

	window.addEventListener('scroll', onScroll, { passive: true });
	onScroll();

	aboutCardContent.append(aboutCardName, aboutCardInfo);

	aboutCard.append(aboutCardContent);

	return aboutCard;
}
