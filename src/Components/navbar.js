import MakeElement from '../Tools/MakeElement.js';
import ghostLogo from '../assets/svg/ghost-logo.svg?raw';
import bigOhLogo from '../assets/svg/thebigoh-logo.svg?raw';
import { showGhostOverlay } from './ghostOverlay.js';

const makeEle = new MakeElement;
const SCROLL_THRESHOLD = {
	'mobile': 1,
	'desktop': 230
};


export default function NavBar(siteName, sitePages) {

	// Creating the base
	const navBarContainerBase = makeEle.createEle('div', 'NavBarContainerBase', [12,12,12,12],['navBarContainerBase']);
	const navBarContainerDesktop = makeEle.createEle('div', 'NavBarContainerDesktop', [12, 12, 12, 12], ['navBarContainerDesktop','navBarContainer']);
	const navBarContainerMobile  = makeEle.createEle('div', 'NavBarContainerMobile', null, ['navBarContainerMobile','navBarContainer']);

	// Populating the nav bar
	const navBarName  = makeEle.createEle('div', 'NavBarName', null, ['navBarName','navBarItem']);
	const navBarPages = makeEle.createEle('div', 'NavBarPages', null, ['navBarPages', 'navBarItem']);

	if (siteName && sitePages) {

		navBarName.innerHTML = `<div class="site-logo"> ${bigOhLogo} </div>`;

		sitePages.forEach((page, i) => {
			let pageItem = makeEle.createEle('div','pageItem_'+i,null,['pageItem','pageItem__'+page]);

			pageItem.innerHTML = page === 'Ghost'
				? `<a href="/#${page}" aria-label="Ghost mode"> ${ghostLogo} </a>`
				: `<a href="/#${page}"> ${page} </a>`;

			navBarPages.append(pageItem);
		})
	}
			
	// "scrolling": between the top and the threshold. "scrolled": past the threshold.
	const onScroll = () => {
		const threshold = window.innerWidth < 1025 ? SCROLL_THRESHOLD.desktop : SCROLL_THRESHOLD.mobile;
		const y = window.scrollY;

		navBarContainerBase.classList.toggle('scrolling', y > 0 && y <= threshold);
		navBarContainerBase.classList.toggle('scrolled', y > threshold);
	};

	window.addEventListener('scroll', onScroll, { passive: true });
	onScroll(); // correct state on load (e.g. refresh mid-scroll)

	navBarContainerMobile.append(navBarName.cloneNode(true), navBarPages.cloneNode(true));
	navBarContainerDesktop.append(navBarName, navBarPages);

	navBarContainerBase.append(navBarContainerDesktop,navBarContainerMobile);

	// One delegated listener covers both the desktop and the (cloned) mobile ghost link
	navBarContainerBase.addEventListener('click', (event) => {
		if (!event.target.closest('.pageItem__Ghost a')) return;

		event.preventDefault();
		showGhostOverlay();
	});


	return navBarContainerBase;
}