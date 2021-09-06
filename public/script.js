const play = document.getElementById('play');
const speed = document.getElementById('speed-input');
const pause = document.getElementById('pause');
const button = document.querySelector('button');
const textarea = document.querySelector('textarea');
const leftArrow = document.getElementById('left');
const rightArrow = document.getElementById('right');
const wordDisplay = document.getElementById('word-display');

speed.value = 200;
play.style.display = 'none';
pause.style.display = 'none';
leftArrow.style.display = 'none';
rightArrow.style.display = 'none';

speed.addEventListener('keyup', () => {
	if (speed.value < 60) {
		speed.style.transition = 'background 2s';
		speed.style.background = 'pink';
	} else {
		speed.style.background = 'hsl(200, 20%, 30%)';
	};
});

button.addEventListener('click', () => {
	if (textarea.value) {
		pause.style.display = 'block';
		showWords();
	};
});

function showWords() {
	const list = textarea.value.split(' ');
	i = 0;
	let out = '';

	const interval = setInterval(() => {
		wordDisplay.innerText = list[i];
		i += 1;

		if (i === list.length) {
			clearInterval(interval);
		};
	}, (60 / speed.value) * 1000);

	eventListeners(interval, list, i, out);
};

function eventListeners(interval, list, i, out) {
	play.addEventListener('click', () => {
		pause.style.display = 'block';
		play.style.display = 'none';
		leftArrow.style.display = 'none';
		rightArrow.style.display = 'none';
		i = list.indexOf(wordDisplay.innerText);

		const newInterval = setInterval(() => {
			wordDisplay.innerText = list[i];
			i += 1;

			if (i === list.length) {
				clearInterval(newInterval);
			};
		}, (60 / speed.value) * 1000);
		out = newInterval;
	});

	pause.addEventListener('click', () => {
		const word = wordDisplay.innerText;
		wordDisplay.innerText = word;
		clearInterval(interval);
		clearInterval(out);
		pause.style.display = 'none';
		play.style.display = 'block';
		leftArrow.style.display = 'block';
		rightArrow.style.display = 'block';
	});

	leftArrow.addEventListener('click', () => {
		let index = list.indexOf(wordDisplay.innerText);
		if (index !== 0 && index !== list.length - 1) {
			index -= 1;
			wordDisplay.innerText = list[index];
		};		
	});

	rightArrow.addEventListener('click', () => {
		let index = list.indexOf(wordDisplay.innerText);
		if (index !== 0 && index !== list.length - 1) {
			index += 1;
			wordDisplay.innerText = list[index];
		};
	});
};