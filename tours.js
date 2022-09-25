
var cagetory = document.querySelector('.cagetory__wrap')
var apiTour = 'https://632d7be60d7928c7d24c1655.mockapi.io/Tour'

function showCagetory() {

    if (cagetory) {
        cagetory.classList.remove('cagetory__wrap__close')
        cagetory.classList.add('cagetory__wrap__show')
        window.onscroll = function () { window.scrollTo(0, 0); };
    }

}
function closeCagetory() {
    if (cagetory) {
        cagetory.classList.remove('cagetory__wrap__show')
        cagetory.classList.add('cagetory__wrap__close')
        window.onscroll = function () { };

    }
}

function showMenu() {
    var menuHide = document.querySelector('.menuhide')
    var menuHideWrap = document.querySelector('.menuhide__wrap')
    if (menuHide) {

        menuHide.classList.add('showMenu')
        menuHide.classList.remove('closeMenu')
        window.onscroll = function () { window.scrollTo(0, 0); };
    }
    if (menuHideWrap) {
        menuHideWrap.addEventListener('click', function () {


            menuHide.classList.remove('showMenu')
            menuHide.classList.add('closeMenu')
            window.onscroll = function () { };
        })
    }

}

function onLoad() {
    getTours(function (tours) {
        renderTour(tours)
    })
}

function getTours(callback) {
    fetch(apiTour).then(function (reponse) {
        return reponse.json()
    })
        .then(callback)
        .catch(function () {
            alert("Có lỗi vui lòng reload")
        })
}
function renderTour(tours) {
    console.log(tours)
    var tourBlock = document.querySelector('.container')
    var tourPackage = tourBlock.querySelector('.row')

    var htmls = tours.map(function (tour) {

        return `
        <div class="container__package col l-4 ms-6 s-12 ">
                    <div class="container__package__img">
                    <img src="./asserts/img/travel/${tour.img}" data-id="${tour.id}" onclick="showTourDetail(this);">
                        <div class="container__package__day"><span>${tour.numberofday}</span></div>
                    </div>
                    <a onclick="showTourDetail(this);"  class="container__package__detail" data-id="${tour.id}">
                        ${tour.title}
                    </a>
                    <div class="container__package__footer">
                        <button onclick="showTourDetail(this);" data-id="${tour.id}" class="container__package__book">
                      BOOK NOW
                        </button>
                        <div class="container__package__price">From</br>
                            <span>${tour.price}</span>
                        </div>
                    </div>
                </div>`
    })

    tourPackage.innerHTML = htmls.join('')

}

function showTourDetail(booking) {
    window.location = './cagetory.html'

    var id = booking.getAttribute('data-id')
    console.log(id)
    localStorage.setItem("detail", id)
}

onLoad()




