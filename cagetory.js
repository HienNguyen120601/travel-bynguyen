
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
    var id = localStorage.getItem("detail")
    getTours(function (tours) {
        renderTour(tours, id)
    })
    // localStorage.clear();
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
function renderTour(tours, id = 1) {
    var tourBlock = document.querySelector('.container__detail')
    var tourPackage = tourBlock.querySelector('.row')

    var htmls = tours.map(function (tour) {
        if (tour.id == id)
            return `
        <div class="tour__detail">
                    <div class="tour__package">
                        <div class="tour__package__img">
                            <img src="./asserts/img/travel/${tour.img}" alt="">
                        </div>
                        <div class="tour__pakage__voting">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                        </div>
                        <div class="tour__package__title">
                            <span>${tour.title}</span>
                        </div>
                        <div class="tour__package__detail">
                            <span>${tour.description}</span>
                        </div>
                    </div>
                    <div class="tour__booking">
                        <div class="tour__booking__title">
                            <span> Book This Tour</span>
                        </div>
                        <div class="tour__booking__group">
                            <input type="text" placeholder="Your full name">
                            <input type="email" placeholder="Your email">
                            <input type="number" placeholder="Your phone">
                            <input type="date" class="tour__booking__date">
                            <textarea placeholder="Type your message"></textarea>
                            <button class="tour__booking__btn">Book Now</button>
                        </div>
                    </div>
                </div>`
    })
    tourPackage.innerHTML = htmls.join('')

}

onLoad()

