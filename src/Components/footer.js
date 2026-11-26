import MakeElement from '../Tools/MakeElement.js';

const makeEle = new MakeElement();

// Which contact entries (by name in data.js) show up, in this order
const FOOTER_CONTACTS = ['Email', 'linkedIn', 'Github'];

export default function Footer(contacts) {
	// id "Contact" so the navbar's /#Contact link lands here
	const footer = makeEle.createEle('div', 'Contact', null, [
		'footerContainer',
		'footer-container',
		'bodyItems',
	]);
	const footerTitle = makeEle.createEle('div', 'footerTitle', null, [
		'footerTitle',
	]);
	const footerLinks = makeEle.createEle('div', 'footerLinks', null, [
		'footerLinks',
	]);

	footerTitle.innerHTML = `<div class="title">Contact</div>`;

	FOOTER_CONTACTS.forEach((name) => {
		const contact = (contacts || []).find((c) => c.name === name);

		if (!contact) return;

		const isMail = contact.link.toLowerCase().startsWith('mailto:');
		const newTab = isMail ? '' : 'target="_blank" rel="noopener noreferrer"';

		const linkItem = makeEle.createEle('div', 'footerLink_' + name, null, [
			'footerLink',
		]);

		linkItem.innerHTML = `
			<a href="${contact.link}" ${newTab} aria-label="${contact.name}">
				<img class="footer-icon" src="${contact.icon}" alt="" />
				<span class="footer-handle">${contact.handle}</span>
			</a>
		`;

		footerLinks.append(linkItem);
	});

	footer.append(footerTitle, footerLinks);

	return footer;
}
