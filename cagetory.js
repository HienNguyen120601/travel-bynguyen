
var cagetory = document.querySelector('.cagetory__wrap')
var apiTour = 'https://632d7be60d7928c7d24c1655.mockapi.io/Tour'
var apiUser = 'https://632d7be60d7928c7d24c1655.mockapi.io/User'
var apiOrder = 'https://632d7be60d7928c7d24c1655.mockapi.io/Order'
var tourTitle
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
function showSingupForm() {

    const registerform = document.querySelector('.registerform')
    registerform.classList.remove('hideModal')
    registerform.classList.add('showModal')
    const modalBg = registerform.querySelector('.modal_background')
    modalBg.addEventListener('click', function () {
        registerform.classList.remove('showModal')
        registerform.classList.add('hideModal')
    })

}
function showSinginForm() {

    const login = document.querySelector('.loginform')
    login.classList.remove('hideModal')
    login.classList.add('showModal')
    const modalBg = login.querySelector('.modal_background')
    modalBg.addEventListener('click', function () {
        login.classList.remove('showModal')
        login.classList.add('hideModal')
    })

}
function onLoad() {
    var id = localStorage.getItem("detail")
    getTours(function (tours) {
        renderTour(tours, id || 1)
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
function getUser(callback) {
    fetch(apiUser).then(function (reponse) {
        return reponse.json()
    })
        .then(callback)
        .catch(function () {
            alert("Có lỗi vui lòng reload")
        })
}
function getOrder(callback) {
    fetch(apiOrder).then(function (reponse) {
        return reponse.json()
    })
        .then(callback)
        .catch(function () {
            alert("Có lỗi vui lòng reload")
        })
}

function renderOrder() {
    const userEmail = sessionStorage.getItem('email')
    const order = document.querySelector('.order')
    order.classList.remove('hideModal')
    const modal_background = order.querySelector('.modal_background')
    modal_background.addEventListener('click', () => {
        order.classList.add('hideModal')
    })
    const orderList = order.querySelector('.modal_body_order')
    getUser(function (users) {
        const userLogin = users.filter((user) => {

            return user.email == userEmail
        })
        getOrder(function (orders) {
            const tourOrders = orders.filter((order) => {
                return order.user_id == userLogin[0].id
            })

            const htmls = tourOrders.map((tourOrder) => {
                getTours(function (tours) {
                    const userTourBooked = tours.filter((tour) => {
                        return tour.id == tourOrder.tour_id
                    })
                    tourTitle = userTourBooked.map((tour) => {
                        return tour.title
                    })

                })
                return `<ul class="order__list">          
                <li class="order__item">
                        ${tourOrder.id}
                        </li>
                        <li class="order__item">
                        ${tourOrder.fullname}
                        </li>
                        <li class="order__item">
                        ${tourOrder.phonenumber}
                        </li>
                        
                        <li class="order__item">
                        ${tourOrder.message}
                        </li>
                        <li class="order__item">
                        ${tourOrder.tour_id}
                        </li>
                        <li class="order__item">
                        ${tourOrder.date}
                        </li>
                        </ul>`
            })

            orderList.innerHTML = `<div class="order__label">
            <span>ID</span>
            <span>Fullname</span>
            <span>PhoneNumber</span>
            <span>Message</span>
            <span>TourID</span>
            <span>Date</span>
        </div>`+ htmls.join('')
        })
    })


}
function showResult() {
    var islogin = sessionStorage.getItem('login')
    if (islogin != 1) {
        alert('You can log in before booking')
        return;
    }
    const main = document.getElementById('toast');
    var booking = document.querySelector('.tour__booking__group')
    var name = booking.querySelector('.tour__booking__name')
    var email = booking.querySelector('.tour__booking__email')
    var phone = booking.querySelector('.tour__booking__phone')
    var date = booking.querySelector('.tour__booking__date')
    var message = booking.querySelector('.tour__booking__message')
    var postname = name.value
    var postEmail = email.value
    var postphone = phone.value
    var postdate = date.value
    var postmessage = message.value
    var tour_id = localStorage.getItem('detail')
    var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    if (name.value == '' || email.value == '' || phone.value == '' || date.value == '') {
        if (main) {
            const toast = document.createElement('div')
            toast.classList.add('toasterror');
            toast.innerHTML = `        
                        <div class="iconerror">
                            <i class="fa-solid fa-circle-check " ></i>
                        </div>
                        <div class="body">
                            <h3 class="title">Error</h3>
                            <p class="message">Type your infomation</p>
                        </div>               
                        `
            main.appendChild(toast);

            setTimeout(function () {
                main.removeChild(toast);
            }, 3000)
        }
    }
    else if (regex.test(email.value) == false) {
        if (main) {

            const toast = document.createElement('div')
            toast.classList.add('toasterror');

            toast.innerHTML = `        
                    <div class="iconerror">
                        <i class="fa-solid fa-circle-check " ></i>
                    </div>
                    <div class="body">
                        <h3 class="title">Error</h3>
                        <p class="message">Type your email</p>
                    </div>               
                    `
            main.appendChild(toast);

            setTimeout(function () {
                main.removeChild(toast);
            }, 3000)
        }
    }
    else {
        if (main) {
            let email = sessionStorage.getItem('email')
            getUser(function (users) {

                const user = users.filter((user) => {
                    return user.email == email
                })

                var data = {
                    user_id: user[0].id,
                    user_name: user[0].username,
                    date: postdate,
                    tour_id: tour_id,
                    message: postmessage,
                    phonenumber: postphone,
                    fullname: postname,
                    email: postEmail
                }

                postOrder(data)
                // localStorage.setItem('userId', user[0].id)

            })

            const toast = document.createElement('div')
            toast.classList.add('toastsuccess');


            toast.innerHTML = `        
                    <div class="iconsuccess">
                        <i class="fa-solid fa-circle-check " ></i>
                    </div>
                    <div class="body">
                        <h3 class="title">Success</h3>
                        <p class="message">Booking Success</p>
                    </div>               
                    `
            main.appendChild(toast);
            name.value = ''
            email.value = ''
            phone.value = ''
            date.value = ''
            message.value = ''
            setTimeout(function () {
                main.removeChild(toast);
            }, 3000)
        }
    }
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
                            <input type="text" class="tour__booking__name" placeholder="Your full name">
                            <input type="email" class="tour__booking__email" placeholder="Your email">
                            <input type="number" class="tour__booking__phone" placeholder="Your phone">
                            <input type="date" class="tour__booking__date">
                            <textarea class="tour__booking__message" placeholder="Type your message"></textarea>
                            <button class="tour__booking__btn" onclick="showResult();">Book Now</button>
                        </div>
                    </div>
                </div>`
    })
    tourPackage.innerHTML = htmls.join('')

}
function postOrder(data) {
    fetch(apiOrder, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)

    })
        .then(function (reponse) {
            reponse.json()
        })
        .then()
}


onLoad()

