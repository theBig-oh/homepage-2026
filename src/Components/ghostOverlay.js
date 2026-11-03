import ghostPic1 from '../assets/ghost/Ghost-pic-1.webp';
import ghostPic2 from '../assets/ghost/Ghost-pic-2.webp';
import ghostPic3 from '../assets/ghost/Ghost-pic-3.webp';
import ghostPic4 from '../assets/ghost/Ghost-pic-4.webp';

// Order = corner order on desktop: top-left, top-right, bottom-left, bottom-right
const GHOST_PICS = [ghostPic1, ghostPic2, ghostPic3, ghostPic4];

const VISIBLE_MS = 3000; // how long the pictures stay on screen before fading
const FADE_MS = 500;     // keep in sync with the opacity transition in ghostOverlay.scss
const SLIDE_MS = 600;    // keep in sync with the transform transition in ghostOverlay.scss
const STAGGER_MS = 300;  // gap between each picture starting its slide
const SLIDE_ORDER = [0, 1, 3, 2]; // pic index -> slide position: top-left, top-right, bottom-right, bottom-left
const desktopQuery = window.matchMedia('(min-width: 64.0625rem)'); // same as $break-md

let overlay = null;
let pics = [];
let isActive = false;

const buildOverlay = () => {
	overlay = document.createElement('div');
	overlay.className = 'ghostOverlay';
	overlay.setAttribute('aria-hidden', 'true'); // decorative

	pics = GHOST_PICS.map((src) => {
		const img = document.createElement('img');

		img.className = 'ghost-pic';
		img.src = src;
		img.alt = '';
		overlay.append(img);

		return img;
	});

	document.body.append(overlay);
};

// Desktop: all four pictures, one per corner. Mobile: one random picture.
const pickPics = () => {
	if (desktopQuery.matches) return pics;

	return [pics[Math.floor(Math.random() * pics.length)]];
};

export function showGhostOverlay() {
	// Already showing: wait for the fade to finish, then it can be pressed again
	if (isActive) return;

	if (!overlay) buildOverlay();

	isActive = true;

	const shown = pickPics();

	const isDesktop = desktopQuery.matches;

	shown.forEach((img) => {
		img.classList.add('show');

		// Desktop: pictures slide in one after another (clockwise from top-left)
		img.style.transitionDelay = isDesktop ? `${SLIDE_ORDER[pics.indexOf(img)] * STAGGER_MS}ms` : '';
	});

	// Flush layout so the pictures start from their offscreen position and actually transition
	void overlay.offsetWidth;

	// Desktop: the 3 seconds start once the last picture has landed
	const slideTotal = isDesktop ? (shown.length - 1) * STAGGER_MS + SLIDE_MS : 0;

	requestAnimationFrame(() => {
		overlay.classList.add('visible');
		shown.forEach((img) => img.classList.add('in'));

		setTimeout(() => {
			overlay.classList.remove('visible');

			// Fade-out finished: reset, and allow another press.
			// A timer rather than "transitionend", which never fires if the transition is skipped.
			setTimeout(() => {
				shown.forEach((img) => {
					img.classList.remove('show', 'in');
					img.style.transitionDelay = '';
				});
				isActive = false;
			}, FADE_MS);
		}, slideTotal + VISIBLE_MS);
	});
}
