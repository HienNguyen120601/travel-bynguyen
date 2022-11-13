
var cagetory = document.querySelector('.cagetory__wrap')
var apiTour = 'https://travel-api-hiennguyen.vercel.app/api/tour'
var apiUser = 'https://travel-api-hiennguyen.vercel.app/api/customer'
var apiOrder = 'https://travel-api-hiennguyen.vercel.app/api/order'
var apiOrderDetail = 'https://travel-api-hiennguyen.vercel.app/api/orderDetail'
var tourTitle

function showAdmin() {
    const adminbtn = document.querySelector('.showDetail')
    const btnShow = adminbtn.querySelector('.showdetail__btn')
    adminbtn.classList.add('showadmin')
    btnShow.innerHTML = `<i onclick="closeAdmin();" class="fa-solid fa-angles-left"></i>`
}
function closeAdmin() {
    const adminbtn = document.querySelector('.showDetail')
    const btnShow = adminbtn.querySelector('.showdetail__btn')
    adminbtn.classList.remove('showadmin')
    btnShow.innerHTML = `<i onclick="showAdmin();" class="fa-solid fa-angles-right"></i>`
}
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
function showSearchBox() {
    const navbar = document.querySelector('.nav__bar')
    const search__box = navbar.querySelector('.search__box')

    search__box.classList.add('showSearchBar')
}
function closeSearchBox() {
    const navbar = document.querySelector('.nav__bar')
    const search__box = navbar.querySelector('.search__box')
    search__box.classList.remove('showSearchBar')
}
function showResultSearch() {
    const resultSearch = document.querySelector('.result__search')
    resultSearch.classList.remove('hideResult__search')
}
function closeResultSearch() {
    const resultSearch = document.querySelector('.result__search')
    resultSearch.classList.add('hideResult__search')
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
        renderTour(tours, id || "6357ad0add19d4ece548d0e7")
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
function getOrderDetail(callback) {
    fetch(apiOrderDetail).then(function (reponse) {
        return reponse.json()
    })
        .then(callback)
        .catch(function () {
            alert("Có lỗi vui lòng reload")
        })
}
function searchTour() {
    const searchBox = document.querySelector('.search__box')
    const searchInput = searchBox.querySelector('.search__input').value
    const resultBox = document.querySelector('.result__search')
    const resulBody = resultBox.querySelector('.result__body')
    if (searchInput == '') { resulBody.innerHTML = `` }
    else {
        getTours(function (tours) {
            const tourBySearch = tours.filter((tour) => {
                return tour.title.toUpperCase().search(searchInput.toUpperCase()) != -1
            })
            console.log(tourBySearch)
            const htmls = tourBySearch.map((tour) => {
                return `<div class="container__package result__style col l-4 ms-6 s-12 ">
<div class="container__package__img">
<img src="./asserts/img/travel/${tour.img}" data-id="${tour._id}" onclick="showTourDetail(this);">
    <div class="container__package__day"><span>${tour.numberOfDay}</span></div>
</div>
<a onclick="showTourDetail(this);"  class="container__package__detail" data-id="${tour._id}">
    ${tour.title}
</a>
<div class="container__package__footer">
    <button onclick="showTourDetail(this);" data-id="${tour._id}" class="container__package__book">
  BOOK NOW
    </button>
    <div class="container__package__price">From</br>
        <span>${tour.price}</span>
    </div>
</div>
</div>
`
            })
            resulBody.innerHTML = htmls.join('')
        })
    }
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

                return order.customer_id == userLogin[0]._id
            })

            const htmls = tourOrders.map((tourOrder) => {


                if (tourOrder.status == true)
                    var status = 'Đã thanh toán'
                else
                    var status = 'Chưa thanh toán'

                return `<ul class="order__list">          
                
                        <li class="order__item">
                        ${tourOrder.customer_name}
                        </li>
                        <li class="order__item">
                        ${tourOrder.phonenumber}
                        </li>
                        
                        <li class="order__item">
                        ${status}
                        </li>
                        <li class="order__item">
                        ${tourOrder.tour_name}
                        </li>
                        <li class="order__item">
                        ${tourOrder.date}
                        </li>
                        </ul>`
            })

            orderList.innerHTML = `<div class="order__label">
           
            <span>Fullname</span>
            <span>PhoneNumber</span>
            <span>Status</span>
            <span>TourName</span>
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

    var phone = booking.querySelector('.tour__booking__phone')
    var hotel = booking.querySelector('.tour__booking__hotel')
    var vehicle = booking.querySelector('.tour__booking__vehicle')
    var date = booking.querySelector('.tour__booking__date')
    var message = booking.querySelector('.tour__booking__message')
    var tour_merge = booking.querySelector('.policy__check')
    var numberOfpeople = booking.querySelector('.tour__booking__numberOfpeople')


    var postName = name.value
    var posthotel = hotel.value
    var postvehicle = vehicle.value
    var postpolicy = tour_merge.checked
    var postphone = phone.value
    var postdate = date.value
    var postNumber = numberOfpeople.value
    var postmessage = message.value + ""

    var tour_id = localStorage.getItem('detail')


    if (name.value == '' || phone.value == '' || date.value == '' || vehicle.value == 'Choose your vehicle' || hotel.value == 'Choose your hotel' || numberOfpeople.value == '') {
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

    else {
        if (main) {
            let email = sessionStorage.getItem('email')
            getUser(function (users) {
                const user = users.filter((user) => {
                    return user.email == email
                })
                getTours(function (tours) {
                    const tourid = localStorage.getItem('detail')
                    const getTourbyId = tours.filter(tour => {
                        return tour._id == tourid
                    })
                    var data = {
                        customer_id: user[0]._id,
                        customer_name: postName,
                        hotel_id: posthotel,
                        tour_id: tour_id,
                        tour_name: getTourbyId[0].title,
                        date: postdate,
                        phonenumber: postphone,
                        status: false
                    }
                    postOrder(apiOrder, data, function (callback) {
                        var dataDetail = {
                            order_id: callback._id,
                            driver_id: 'Driver1',
                            vehicle_id: postvehicle,
                            tourguide_id: 'Tour guide 1',
                            merge_tour: postpolicy,
                            numberOfPeople: postNumber,
                            note: postmessage
                        }
                        postOrderDetail(apiOrderDetail, dataDetail)
                    })
                })
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
            phone.value = ''
            date.value = ''
            message.value = ''
            numberOfpeople.value = ''
            setTimeout(function () {
                main.removeChild(toast);
            }, 3000)
        }
    }
}
function renderTour(tours, id) {
    var tourBlock = document.querySelector('.container__detail')
    var tourPackage = tourBlock.querySelector('.tour__detail')

    var htmls = tours.map(function (tour) {
        if (tour._id == id)
            return `
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
                            <input type="number" class="tour__booking__phone" placeholder="Your phone">
                            <input type="number" class="tour__booking__numberOfpeople" placeholder="Number of peole">
                            <input type="date" class="tour__booking__date">
                            <select class="tour__booking__hotel">
                                <option>Choose your hotel</option>
                                <option>hotel 1</option>
                                <option>hotel 2</option>
                                <option>hotel 3</option>
                                <option>hotel 4</option>
                                <option>hotel 5</option>
                                <option>hotel 7</option>
                            </select>
                            <select class="tour__booking__vehicle">
                                <option>Choose your vehicle</option>
                                <option>vehicle 1</option>
                                <option>vehicle 2</option>
                                <option>vehicle 3</option>
                                <option>vehicle 4</option>
                                <option>vehicle 5</option>
                                <option>vehicle 7</option>
                            </select>
                            <div class="tour__booking__policy">
                                <input class="policy__check" type="checkbox">
                                <span>
                                    If you choose it will allow tour merge
                                    </br>
                                    If you do not choose, you will have to pay the full cost
                                </span>
                            </div>


                            <textarea class="tour__booking__message" placeholder="Type your message"></textarea>
                            <button class="tour__booking__btn" onclick="showResult();">Book Now</button>
                        </div>
                    </div>
       `
    })
    tourPackage.innerHTML = htmls.join('')

}
function postOrder(api, data, callback) {
    fetch(api, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)

    })
        .then(function (reponse) {
            return reponse.json()
        })
        .then(callback)

}
function postOrderDetail(api, data) {
    fetch(api, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)

    })
        .then(function (reponse) {
            return reponse.json()
        })


}
onLoad()

