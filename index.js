
var cagetory = document.querySelector('.cagetory__wrap')
var apiTour = 'https://travel-api-hiennguyen.vercel.app/api/tour'
var apiUser = 'https://travel-api-hiennguyen.vercel.app/api/customer'
var apiOrder = 'https://travel-api-hiennguyen.vercel.app/api/order'
var apiCount = 'https://travel-api-hiennguyen.vercel.app/api/count'


function onLoad() {
    const visits = sessionStorage.getItem("visit");
    console.log(visits)
    if (!visits) {
        getCount(function (counts) {
            const id = counts[0]._id
            const data = {
                visitCount: counts[0].visitCount + 1,
                orderCount: counts[0].orderCount
            }
            updateData(apiCount, id, data)
            sessionStorage.setItem("visit", true)
        })

    }

    getTourbyNumber()
    setTimeout(() => {
        closeAdmin()
    }, 2000)


}
var tourTitle
function getTourbyNumber() {
    getTours(function (tours) {

        var sixtour = tours.filter(function (tour, index) {
            return index < 6
        })

        renderTour(sixtour)
    })
}
function updateData(api, id, data) {
    fetch(api + '/' + id, {
        method: 'Put',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)

    })
        .then()


}
function getCount(callback) {
    fetch(apiCount).then(function (reponse) {
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

    var tourBlock = document.querySelector('.container')
    var tourPackage = tourBlock.querySelector('.row')

    var htmls = tours.map(function (tour) {

        return `
        <div class="container__package col l-4 ms-6 s-12 ">
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
                            <span>$${tour.price}.00</span>
                        </div>
                    </div>
                </div>`
    })

    tourPackage.innerHTML = htmls.join('')

}
function showTourDetail(booking) {
    window.location = './cagetory.html'

    var id = booking.getAttribute('data-id')

    localStorage.setItem("detail", id)
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
function searchTour() {
    const searchBox = document.querySelector('.search__box')
    const searchInput = searchBox.querySelector('.search__input').value
    const resultBox = document.querySelector('.result__search')
    const resulBody = resultBox.querySelector('.result__body')
    if (searchInput == '') {
        resulBody.innerHTML = ``
    }
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
onLoad()




