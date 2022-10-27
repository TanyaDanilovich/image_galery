
let imgCount = '30'
let imgPage = getRandomeNumber(1, 2500)
let imgGalery = document.querySelector('.img__galery')
const input = document.querySelector('.search-input')
const searchIcon = document.querySelector('.search-icon')
const imgBox = document.querySelector('.img-box')
const shadow = document.querySelector('.shadow')
const closePopup = document.querySelector('.close-popup')

let tags = 'srilanka'
let sortItems = {
	1: "date-posted-asc",
	2: "date-posted-desc",
	3: "date-taken-asc",
	4: "date-taken-desc",
	5: "interestingness-desc",
	6: "interestingness-asc",
	7: "relevance"
}
let url = ''

function getRandomeNumber(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return String(Math.floor(Math.random() * (max - min + 1)) + min)
}

function getrandomSortItem() {
	let key = getRandomeNumber(1, 7)
	//console.log(sortItems[key]);
	return sortItems[key]
}

function imgClick1(event) {
	//if (event.target.classList.contains('img')) {
	const url = event.target.getAttribute('src_big')
	showImgBox(url)
	//}
}

function getUrl() {
	imgPage = getRandomeNumber(1, 2500)
	//console.log(imgPage);
	return `https://www.flickr.com/services/rest/?method=flickr.photos.search&per_page=30&page=${imgPage}&api_key=61ea2084e52c50b950d0d27a3b02d645&extras=date_taken,owner_name,url_m,url_c,tags&sort=${getrandomSortItem()}&format=json&nojsoncallback=1&orientation=landscape&tags=${tags}`
}


async function getData() {
	url = getUrl()
	//console.log(url);
	const res = await fetch(url);
	const data = await res.json();
	//console.log(data.photos.photo[1]);
	showData(data)
}

function showData(data) {
	for (let i = 0; i < imgCount; i++) {
		createGalery(data.photos.photo[i].url_m, data.photos.photo[i].ownername, data.photos.photo[i].datetaken, data.photos.photo[i].url_c, data.photos.photo[i].title);
	}
}



function createGalery(urlSrc, ownername, datetaken, urlSrcBig, title) {
	const imgItem = document.createElement('div')
	imgItem.classList.add('img__item')
	imgGalery.append(imgItem);
	const img = document.createElement('img')
	img.classList.add('img')
	img.src = `${urlSrc}`;
	img.setAttribute('src_big', `${urlSrcBig}`)
	img.alt = `${title}`;
	imgItem.append(img);

	const imgInfo = document.createElement('div')
	imgInfo.classList.add('img-info')
	imgItem.append(imgInfo)

	const text = document.createElement('p')
	text.classList.add('text')
	text.textContent = 'photo by'
	imgInfo.append(text)

	const info = document.createElement('div')
	info.classList.add('info')
	imgInfo.append(info)

	const ownersName = document.createElement('p')
	ownersName.classList.add('owners-name')
	ownersName.textContent = ownerNameCut(ownername)
	//console.log(ownername.length);
	info.append(ownersName)

	const dateTaken = document.createElement('p')
	dateTaken.classList.add('date-taken')
	dateTaken.textContent = datetaken.slice(0, 11)
	info.append(dateTaken)
}

document.addEventListener("DOMContentLoaded", getData);

function ownerNameCut(ownername) {
	if (ownername.length >= 26) {
		return `${ownername.slice(0, 23)}...`
	} else { return ownername }
}

function deleteGalery() {
	imgGalery.innerHTML = "";
}

function checkEnterKey(key) {
	if (input.value != '' && key.keyCode == 13) {
		tags = input.value
		getUrl();
		deleteGalery();
		getData();
	}
}
input.addEventListener('keyup', checkEnterKey)

function searchIconOnClick() {
	if (input.value != '') {
		tags = input.value
		getUrl();
		deleteGalery();
		getData();
	}
	imgGalery = document.querySelector('.img__galery')
}


function showImgBox(url) {
	imgBox.style.backgroundImage = `url("${url}")`
	imgBox.classList.add('active')
	shadow.classList.add('active')
}

function imgClick(event) {
	if (event.target.classList.contains('img')) {
		const url = event.target.getAttribute('src_big')
		showImgBox(url)
	}
}
function imgBoxClose() {
	imgBox.classList.remove('active')
	shadow.classList.remove('active')
}



imgGalery.addEventListener('click', imgClick)

closePopup.addEventListener('click', imgBoxClose)

console.log('Верстка:\n  На странице есть несколько фото и строка поиска;\n  В футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс;\n  При загрузке приложения на странице отображаются полученные от API изображения;\n  Если в поле поиска ввести слово и отправить поисковый запрос, на странице отобразятся изображения соответствующей тематики, если такие данные предоставляет API;\n  Поиск:\n  при открытии приложения курсор находится в поле ввода;\n  Есть placeholder;\n  Автозаполнение поля ввода отключено(нет выпадающего списка с предыдущими запросами);\n  Поисковый запрос можно отправить нажатием клавиши Enter;\n  После отправки поискового запроса и отображения результатов поиска, поисковый запрос продолжает отображаться в поле ввода;\n  В поле ввода есть крестик при клике по которому поисковый запрос из поля ввода удаляется и отображается placeholder;\n  Дополнительный не предусмотренный в задании функционал, улучшающий качество приложения - выводится на экран автор фотографии и дата снимка, также в alt изображения записывается название фотографии.\n  	Оценка 60 баллов.');