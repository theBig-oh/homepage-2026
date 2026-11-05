import MakeElement from '../Tools/MakeElement.js';

const makeEle = new MakeElement;

export default function ProjectsCard(projects) {
	let projectCard = makeEle.createEle('div','Projects',[12,12,12,12],['projectCardContainer','bodyItems']);

	let projectTitle = makeEle.createEle('div','projectCardTitle', [12,12,12,12],['projectCardTitle']);
	let projectGrid = makeEle.createEle('div','projectCardGrid', null,['projectCardGrid']);

	projectTitle.innerHTML = `<div class="title">Projects</div>`;

	(projects || []).forEach((project, i) => {
		let projectItem = makeEle.createEle('div','projectItem_'+i, null,['projectItem']);

		projectItem.innerHTML = `
			<img class="project-image" src="${project.projectImage}" alt="${project.name} screenshot" loading="lazy" />
			<h3 class="project-name">
				${project.name}
			</h3>
			<p class="project-framework">${project.framework}</p>
			<ul class="project-purpose">${project.purpose.map((line) => `<li>${line}</li>`).join('')}</ul>
			<a class="project-link" href="${project.url}" target="_blank" rel="noopener noreferrer"> Click to see </a>
		`;

		projectGrid.append(projectItem);
	});

	projectCard.append(projectTitle, projectGrid);

	// Same drift as aboutCardName, but measured from when the card enters the viewport
	// (window.scrollY would already be maxed out by the time this card is reached)
	const MAX_OFFSET = 150;
	const speed = 0.5;  // anything less than 1 slows the drift

	// Desktop only. Same breakpoint as $break-md in settings.scss (64.0625rem)
	const desktopQuery = window.matchMedia('(min-width: 64.0625rem)');

	const onScroll = () => {
		if (!projectCard.isConnected) return;

		// Mobile: no drift, and clear anything left over (e.g. after resizing from desktop)
		if (!desktopQuery.matches) {
			projectTitle.style.transform = '';
			projectTitle.classList.remove('scrolling');
			return;
		}

		const scrolledIn = Math.max(window.innerHeight - projectCard.getBoundingClientRect().top, 0);
		const offsetY = Math.min(scrolledIn * speed, MAX_OFFSET);

		projectTitle.style.transform = `translateY(${offsetY}px)`;
		// On only once the drift has finished (hit MAX_OFFSET); off again when it backs off
		projectTitle.classList.toggle('scrolling', offsetY >= MAX_OFFSET);
	};

	window.addEventListener('scroll', onScroll, { passive: true });
	desktopQuery.addEventListener('change', onScroll); // re-evaluate when crossing the breakpoint
	requestAnimationFrame(onScroll); // initial state once the card is in the DOM

	return projectCard;
}
