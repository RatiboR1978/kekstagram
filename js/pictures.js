var arrPictures = [],
	arrDescription = [
		'Тестим новую камеру!',
		'Затусили с друзьями на море',
		'Как же круто тут кормят',
		'Отдыхаем...',
		'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
		'Вот это тачка!'
	],
	arrComments = [
		'Всё отлично!',
		'В целом всё неплохо. Но не всё.',
		'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
		'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
		'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
		'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
	];

function randomNum(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

function randomComent(arrComments) {
	var arr = [],
		index = Math.floor(Math.random() * (2 - 0) + 0);
	if (index === 0) {
		arr.push(arrComments[randomNum(0, arrComments.length)])
	} else {
		for (var i = 0; i < 2; i++) {
			arr.push(arrComments[randomNum(0, arrComments.length)])
		}
	}
	return arr;
}

function creatingObj(index, minLikes, maxLikes, maxDescription) {
	var obj = {
		url: 'photos/' + index + '.jpg',
		likes: randomNum(minLikes, maxLikes),
		comments: randomComent(arrComments),
		description: arrDescription[randomNum(0, maxDescription)]
	};
	return obj;
}

for (var index = 1; index < 26; index++) {
	arrPictures.push(creatingObj(index, 15, 200, arrComments.length, arrDescription.length))
}
var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

function renderPicture(obj) {
	var elementPicture = pictureTemplate.cloneNode(true);

	elementPicture.querySelector('img').src = obj.url;
	elementPicture.querySelector('.picture__comments').textContent = obj.comments.length;
	elementPicture.querySelector('.picture__likes').textContent = obj.likes;
	return elementPicture;
}

var fragment = document.createDocumentFragment();
for (var i = 0; i < arrPictures.length; i++) {
	fragment.appendChild(renderPicture(arrPictures[i]));
}

var pictures = document.querySelector('.pictures');
pictures.appendChild(fragment);

function addText(addClass, text) {
	return document.querySelector(addClass).textContent = text;
}

document.querySelector('.big-picture').classList.remove('hidden');
document.querySelector('.big-picture__img img').src = arrPictures[0].url;
addText('.likes-count', arrPictures[0].likes);
addText('.comments-count', arrPictures[0].comments.length);

var comentsList = document.querySelector('.social__comments');

comentsList.innerHTML = '';

for (var i = 0; i < arrPictures[0].comments.length; i++) {
	comentsList.innerHTML += '<li class="social__comment social__comment--text">\n' +
		'<img class="social__picture" src="img/avatar-\n' +
		'' + randomNum(1, 6) + '.svg"\n' +
		'alt="Аватар комментатора фотографии"\n' +
		'width="35" height="35">\n' +
		'<p class="social__text">' + arrPictures[0].comments[i] + '</p>\n' +
		'</li>';
}

addText('.social__caption', arrPictures[0].description);
document.querySelector('.social__comment-count').classList.add('visually-hidden');
document.querySelector('.social__loadmore').classList.add('visually-hidden');