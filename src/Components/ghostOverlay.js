import ghostPic1 from '../assets/ghost/Ghost-pic-1.webp';
import ghostPic2 from '../assets/ghost/Ghost-pic-2.webp';
import ghostPic3 from '../assets/ghost/Ghost-pic-3.webp';
import ghostPic4 from '../assets/ghost/Ghost-pic-4.webp';
import ghostPic5 from '../assets/ghost/Ghost-pic-5.webp';
import ghostPic6 from '../assets/ghost/Ghost-pic-6.webp';
import ghostPic7 from '../assets/ghost/Ghost-pic-7.webp';
import ghostPic8 from '../assets/ghost/Ghost-pic-8.webp';
import ghostPic9 from '../assets/ghost/Ghost-pic-9.webp';

// Pool of pictures. Each press picks randomly: 4 on desktop (one per corner), 1 on mobile
const GHOST_PICS = [ghostPic1, ghostPic2, ghostPic3, ghostPic4, ghostPic5, ghostPic6, ghostPic7, ghostPic8, ghostPic9];
const DESKTOP_COUNT = 4;

const VISIBLE_MS = 3000; // how long the pictures stay on screen before fading
const FADE_MS = 500;     // keep in sync with the opacity transition in ghostOverlay.scss
const SLIDE_MS = 600;    // keep in sync with the transform transition in ghostOverlay.scss
const STAGGER_MS = 300;  // gap between each picture starting its slide
const SLIDE_ORDER = [0, 1, 3, 2]; // corner slot -> slide position: top-left, top-right, bottom-right, bottom-left (slots: TL, TR, BL, BR)
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

// Desktop: 4 random pictures, one per corner (data-slot 0-3). Mobile: one random picture.
const pickPics = () => {
	const shuffled = [...pics].sort(() => Math.random() - 0.5);

	if (desktopQuery.matches) {
		const chosen = shuffled.slice(0, DESKTOP_COUNT);

		chosen.forEach((img, slot) => { img.dataset.slot = slot; });

		return chosen;
	}

	return [shuffled[0]];
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
		img.style.transitionDelay = isDesktop ? `${SLIDE_ORDER[img.dataset.slot] * STAGGER_MS}ms` : '';
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
						delete img.dataset.slot;
					img.style.transitionDelay = '';
				});
				isActive = false;
			}, FADE_MS);
		}, slideTotal + VISIBLE_MS);
	});
}
