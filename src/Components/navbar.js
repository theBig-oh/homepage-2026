import MakeElement from '../Tools/MakeElement.js';
import ghostLogo from '../assets/svg/ghost-logo.svg?raw';
import bigOhLogo from '../assets/svg/thebigoh-logo.svg?raw';

const makeEle = new MakeElement;
const SCROLL_THRESHOLD = 230;

export default function NavBar(siteName, sitePages) {

	// Creating the base
	const navBarContainerBase = makeEle.createEle('div', 'NavBarContainerBase', [12,12,12,12],['navBarContainerBase']);
	const navBarContainerDesktop = makeEle.createEle('div', 'NavBarContainerDesktop', [12, 12, 12, 12], ['navBarContainerDesktop','navBarContainer']);
	const navBarContainerMobile  = makeEle.createEle('div', 'NavBarContainerMobile', null, ['navBarContainerMobile','navBarContainer']);
	const navBarLogo 			 = makeEle.createEle('div', 'NavBarContainerLogo', null, ['navBarLogo', 'navBarContainer']);

	// Populating the nav bar
	const navBarName  = makeEle.createEle('div', 'NavBarName', null, ['navBarName','navBarItem']);
	const navBarPages = makeEle.createEle('div', 'NavBarPages', null, ['navBarPages', 'navBarItem']);

	if (siteName && sitePages) {

		navBarName.innerHTML = `<div class="site-logo"> ${bigOhLogo} </div>`;

		sitePages.forEach((page, i) => {
			let pageItem = makeEle.createEle('div','pageItem_'+i,null,['pageItem','pageItem__'+page]);

			pageItem.innerHTML = `<a href="/#${page}"> ${page === 'Ghost' ? ghostLogo : page} </div>`;

			navBarPages.append(pageItem);
		})
	}
			
	const onScroll = () => {
		navBarContainerBase.classList.toggle('scrolled', window.scrollY > SCROLL_THRESHOLD);
	};
	window.addEventListener('scroll', onScroll, { passive: true });
	onScroll();

	navBarContainerMobile.append(navBarName.cloneNode(true), navBarPages.cloneNode(true));
	navBarContainerDesktop.append(navBarName, navBarPages);

	navBarContainerBase.append(navBarContainerDesktop,navBarContainerMobile);


	return navBarContainerBase;
}