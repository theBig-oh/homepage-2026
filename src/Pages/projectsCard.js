import MakeElement from '../Tools/MakeElement.js';

const makeEle = new MakeElement();

export default function ProjectsCard(projects) {
	const projectCard = makeEle.createEle(
		'div',
		'Projects',
		[12, 12, 12, 12],
		['projectCardContainer', 'bodyItems'],
	);

	const projectTitle = makeEle.createEle(
		'div',
		'projectCardTitle',
		[12, 12, 12, 12],
		['projectCardTitle'],
	);
	const projectGrid = makeEle.createEle('div', 'projectCardGrid', null, [
		'projectCardGrid',
	]);

	projectTitle.innerHTML = `<div class="title">Projects</div>`;

	(projects || []).forEach((project, i) => {
		const projectItem = makeEle.createEle('div', 'projectItem_' + i, null, [
			'projectItem',
		]);

		projectItem.innerHTML = `
			<img class="project-image" src="${project.projectImage}" alt="${project.name} screenshot" loading="lazy" />
			<h3 class="project-name">
				${project.name}
			</h3>
			<p class="project-framework"><span class="frame-name">${project.framework}</span> <span class="skillIcon">${project.frameIcon || ''}</span> </p> 
			<ul class="project-purpose">${project.purpose.map((line) => `<li>${line}</li>`).join('')}</ul>
			<a class="project-link" href="${project.url}" target="_blank" rel="noopener noreferrer"> Click to see </a>
		`;

		projectGrid.append(projectItem);
	});

	projectCard.append(projectTitle, projectGrid);

	const checkSlideIn = () => {
		if (!projectCard.isConnected) return;
		projectGrid.querySelectorAll('.projectItem').forEach((item) => {
			const top = item.getBoundingClientRect().top;
			if (top < window.innerHeight * 0.85) {
				item.classList.add('inView');
			} else if (top >= window.innerHeight) {
				item.classList.remove('inView');
			}
		});
	};

	window.addEventListener('scroll', checkSlideIn, { passive: true });
	requestAnimationFrame(checkSlideIn);

	const MAX_OFFSET = 150;
	const speed = 0.5;

	const desktopQuery = window.matchMedia('(min-width: 64.0625rem)');

	const onScroll = () => {
		if (!projectCard.isConnected) return;

		if (!desktopQuery.matches) {
			projectTitle.style.transform = '';
			projectTitle.classList.remove('scrolling');
			return;
		}

		const scrolledIn = Math.max(
			window.innerHeight - projectCard.getBoundingClientRect().top,
			0,
		);
		const offsetY = Math.min(scrolledIn * speed, MAX_OFFSET);

		projectTitle.style.transform = `translateY(${offsetY}px)`;
		projectTitle.classList.toggle('scrolling', offsetY >= MAX_OFFSET);
	};

	window.addEventListener('scroll', onScroll, { passive: true });
	desktopQuery.addEventListener('change', onScroll);
	requestAnimationFrame(onScroll);

	return projectCard;
}
