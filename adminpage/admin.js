var apiTour = 'https://travel-api-hiennguyen.vercel.app/api/tour'
var apiCount = 'https://travel-api-hiennguyen.vercel.app/api/count'
var apiOrder = 'https://travel-api-hiennguyen.vercel.app/api/order'
var apiOrderDetail = 'https://travel-api-hiennguyen.vercel.app/api/orderDetail'
var apiUser = 'https://travel-api-hiennguyen.vercel.app/api/customer'
function onLoad() {

    const login = sessionStorage.getItem('adminlogin')

    if (login != 1) {
        window.location = './login.html'
    }

    render = sessionStorage.getItem('render')

    if (render == 'tour') {

        renderTour()
    }
    else if (render == 'customer') {
        renderCustormer()
    }
    else if (render == 'report') {
        renderReport()
    }
    else {
        renderTour()
    }




}
function getTours(callback) {
    fetch(apiTour).then(function (reponse) {
        return reponse.json()
    })
        .then(callback)
        .catch(function () {

        })
}
function getCount(callback) {
    fetch(apiCount).then(function (reponse) {
        return reponse.json()
    })
        .then(callback)
        .catch(function () {

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
function postData(api, data) {
    fetch(api, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)

    })
        .then(function (reponse) {
            reponse.json()
        })

}
function deleteData(api, id) {
    fetch(api + '/delete', {
        method: 'POST',
        body: JSON.stringify({ id: id })
        ,
        headers: {
            'content-type': 'application/json'

        },


    })
        .then(function (reponse) {
            reponse.json()
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
async function addTour() {
    const formMain = document.querySelector('.addtour')
    const title = formMain.querySelector('.title').value
    const price = formMain.querySelector('.price').value
    const day = formMain.querySelector('.dayofnumber').value
    const des = formMain.querySelector('.description').value
    const img = formMain.querySelector('.img').value
    const imgpath = img.split('\\')
    const imgname = imgpath[imgpath.length - 1]
    const data = {
        title: title,
        price: price,
        numberOfDay: day,
        description: des,
        img: imgname
    }
    console.log(data)

    await postData(apiTour, data)
    await swal("Good job!", "You added this tour", "success");
    await location.reload()




}
async function updateTour() {
    const formMain = document.querySelector('.updateTour')
    const title = formMain.querySelector('.title').value
    const price = formMain.querySelector('.price').value
    const day = formMain.querySelector('.dayofnumber').value
    const des = formMain.querySelector('.description').value
    const img = formMain.querySelector('.img').value
    const imgpath = img.split('\\')
    const imgname = imgpath[imgpath.length - 1]
    const data = {
        title: title,
        price: price,
        numberOfDay: day,
        description: des,
        img: imgname
    }
    const id = sessionStorage.getItem('tour_id')
    await updateData(apiTour, id, data)
    await swal("Good job!", "You updated this tour", "success");
    await location.reload()
}
async function deleteTour(tour) {
    const tourid = tour.getAttribute('data-id')

    await deleteData(apiTour, tourid)
    await swal("Good job!", "You deleted this tour", "success");
    await location.reload()



}
function renderReport() {
    const header = document.querySelector('.content__header')
    header.innerHTML =
        `
    <span id="title">Quản trị sản phẩm</span>
                <i class="fa-solid fa-chevron-right"></i>
                <span id='product'>Báo cáo</span>
    `
    sessionStorage.setItem('render', 'report')
    const contentProduct = document.querySelector('.content__product')
    const htmls = `
<div>
  <canvas id="myChart"></canvas>
</div>
`
    const contentList = document.querySelector('.content__list')
    contentList.innerHTML = ``
    contentProduct.innerHTML = htmls
    const ctx = document.getElementById('myChart');

    getCount(function (counts) {
        console.log(counts[0])
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Truy cập', 'Đặt hàng'],
                datasets: [{
                    label: '# of Votes',
                    data: [counts[0].visitCount, counts[0].orderCount],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    })

}
function renderTour() {

    const header = document.querySelector('.content__header')
    sessionStorage.setItem('render', 'tour')
    const service = document.querySelector('.content__service')
    header.innerHTML =
        `
    <span id="title">Quản trị sản phẩm</span>
                <i class="fa-solid fa-chevron-right"></i>
                <span id='product'>Sản phẩm</span>
    `
    service.innerHTML =
        `
        <div class="service__search">
        <input type="text" placeholder="Nhập tên tour" class="service__input">
        <i class="fa-solid fa-magnifying-glass" onclick="searchTour();"></i>
    </div>

    <button onclick="showAddForm();" class="service__addtour">Thêm mới</button>
    `
    const contentProduct = document.querySelector('.content__product')
    contentProduct.innerHTML = `<span class="product__label">STT</span>
        <span class="product__label">Title</span>
        <span class="product__label">Price</span>
        <span class="product__label">Day</span>
        <span class="product__label">Description</span>
        <span class="product__label">Img</span>
        <span class="product__label">Action</span>`
    const contentList = document.querySelector('.content__list')

    getTours(function (tours) {
        const htmls = tours.map((tour, index) => {
            return `
                <div class="product__item">
                <span class="product__content">${index + 1}</span>
                <span class="product__content">${tour.title}</span>
                <span class="product__content">${tour.price}</span>
                <span class="product__content">${tour.numberOfDay}</span>
                <span class="product__content">${tour.description}</span>
                <span class="product__content" img-src=${tour.img} onclick="previewImg(this)"><i class="fa-solid fa-eye"></i></span>
                <span class="product__content">
                <i onclick="deleteTour(this);" class="fa-solid fa-circle-xmark" data-id=${tour._id}></i>
                <i onclick="showUpdateForm(this)" class="fa-solid fa-pen" data-id=${tour._id}></i>
                
                </span>
            </div>`
        })

        contentList.innerHTML = htmls.join('')
    })


}
function previewImg(img) {
    const imgSrc = img.getAttribute('img-src')
    const imgPreview = document.querySelector('.img__preview')
    imgPreview.style.display = "block"
    const overlay = imgPreview.querySelector('.preview__overlay')
    const content = imgPreview.querySelector('.preview__content')
    content.innerHTML = `<img src="../asserts/img/travel/${imgSrc}" alt="">
    `
    console.log(overlay)
    overlay.addEventListener('click', () => {
        imgPreview.style.display = "none"
    })
}
function renderCustormer() {
    const header = document.querySelector('.content__header')
    const service = document.querySelector('.content__service')
    sessionStorage.setItem('render', 'customer')
    header.innerHTML =
        `
    <span id="title">Quản trị sản phẩm</span>
                <i class="fa-solid fa-chevron-right"></i>
                <span id='product'>Khách hàng</span>
    `
    service.innerHTML =
        `
        <div class="service__search">
        <input type="text" placeholder="Nhập tên khách hàng" class="service__input">
        <i class="fa-solid fa-magnifying-glass" onclick="searchCustomer();"></i>
    </div>

   
    `
    const contentProduct = document.querySelector('.content__product')
    contentProduct.innerHTML = `
            <span class="customer__label">STT</span>
            <span class="customer__label">Username</span>
            <span class="customer__label">Email</span>
            <span class="customer__label">Password</span>
            <span class="customer__label">Block</span>
            <span class="customer__label">Action</span>`
    const contentList = document.querySelector('.content__list')

    getUser(function (users) {

        const htmls = users.map((user, index) => {
            const hash = CryptoJS.MD5(user.password).words.join('')
            return `
                <div class="customer__item">
                <span class="customer__content">${index + 1}</span>
                <span class="customer__content">${user.username}</span>
                <span class="customer__content">${user.email}</span>
                <span class="customer__content">${hash}</span>
                <span class="customer__content">${user.block}</span>
                <span class="customer__content">
                <i onclick="blockCustormer(this)" class="fa-solid fa-ban" data-id="${user._id}"></i>
                
                </span>
            </div>`
        })

        contentList.innerHTML = htmls.join('')
    })


}
function blockCustormer(customer) {

    const customerId = customer.getAttribute('data-id')
    getUser(async function (users) {
        const custormerBlock = users.filter((user) => {
            return user._id == customerId
        })

        if (custormerBlock[0].block == 0)
            custormerBlock[0].block = 1
        else
            custormerBlock[0].block = 0
        await updateData(apiUser, customerId, custormerBlock[0])
        await swal("Good job!", "", "success");
        await location.reload()
    })


}
function searchTour() {

    const contentList = document.querySelector('.content__list')
    const search = document.querySelector('.service__search')
    const input = search.querySelector('.service__input').value
    getTours(function (tours) {
        const tourByTitle = tours.filter((tour) => {
            return tour.title.toUpperCase().search(input.toUpperCase()) != -1
        })
        const htmls = tourByTitle.map((tour, index) => {
            return `<div class="product__item">
        <span class="product__content">${index + 1}</span>
        <span class="product__content">${tour.title}</span>
        <span class="product__content">${tour.price}</span>
        <span class="product__content">${tour.numberOfDay}</span>
        <span class="product__content">${tour.description}</span>
        <span class="product__content">${tour.img}</span>
        <span class="product__content">
        <i class="fa-solid fa-circle-xmark"></i>
        <i class="fa-solid fa-pen"></i>
        </span>
    </div>`

        })
        contentList.innerHTML = htmls.join('')
    })
}
function searchCustomer() {

    const contentList = document.querySelector('.content__list')
    const search = document.querySelector('.service__search')
    const input = search.querySelector('.service__input').value
    getUser(function (users) {
        const tourByTitle = users.filter((user) => {
            return user.username.toUpperCase().search(input.toUpperCase()) != -1
        })
        const htmls = tourByTitle.map((user, index) => {
            return `
            <div class="customer__item">
            <span class="customer__content">${index + 1}</span>
            <span class="customer__content">${user.username}</span>
            <span class="customer__content">${user.email}</span>
            <span class="customer__content">${user.password}</span>
            <span class="customer__content">${user.block}</span>
            <span class="customer__content">
            <i onclick="blockCustormer(this)" class="fa-solid fa-ban" data-id="${user._id}"></i>
            
            </span>
        </div>`

        })
        contentList.innerHTML = htmls.join('')
    })
}

function showAddForm() {

    const form = document.querySelector('.addtour')
    const formbg = document.querySelector('.modal_background')

    form.classList.remove('hideModal')

    formbg.addEventListener('click', () => {
        form.classList.add('hideModal')
    })
}
function showUpdateForm(tour) {
    // const updateBtn = document.querySelector('.updateTourbtn')
    const form = document.querySelector('.updateTour')
    const formbg = form.querySelector('.modal_background')

    form.classList.remove('hideModal')
    formbg.addEventListener('click', () => {
        form.classList.add('hideModal')
    })
    const id = tour.getAttribute('data-id')
    sessionStorage.setItem('tour_id', id)
    const formMain = document.querySelector('.updateTour')

    const title = formMain.querySelector('.title')
    const price = formMain.querySelector('.price')
    const day = formMain.querySelector('.dayofnumber')
    const des = formMain.querySelector('.description')
    const img = formMain.querySelector('.img')
    getTours(function (tours) {
        const tourById = tours.filter((tour) => {
            return tour._id == id
        })

        title.value = tourById[0].title
        price.value = tourById[0].price
        day.value = tourById[0].numberOfDay
        des.value = tourById[0].description

    })

}
async function renderOrder() {
    const header = document.querySelector('.content__header')
    const service = document.querySelector('.content__service')
    sessionStorage.setItem('render', 'order')
    header.innerHTML =
        `
    <span id="title">Quản trị sản phẩm</span>
                <i class="fa-solid fa-chevron-right"></i>
                <span id='product'>Đơn hàng</span>
    `
    service.innerHTML =
        `
        <div class="service__search">
        <input type="text" placeholder="Nhập tên khách hàng" class="service__input">
        <i class="fa-solid fa-magnifying-glass" onclick="searchOrder();"></i>
    </div>
    `
    const contentProduct = document.querySelector('.content__product')
    contentProduct.innerHTML = `
            <span class="order_label">STT</span>
            <span class="order_label">Customer</span>
            <span class="order_label">Hotel</span>
            <span class="order_label">Tour</span>
            <span class="order_label">Date</span>
            <span class="order_label">PhoneNumber</span>
            <span class="order_label">Status</span>`
    const contentList = document.querySelector('.content__list')
    await getOrder(function (orders) {

        var htmls = orders.map((order, index) => {
            if (order.status)
                var status = "Đã thanh toán"
            else
                var status = "Chưa thanh toán"

            return `
            <div class="order__item" >
                    <span class="order__content">
                    <span class="inner__icon">
                    <i data-id=${order._id} onclick="renderOrderDetail(this);" class="fa-solid fa-sort-down order__icon"></i></span>
                    ${index}</span>
                    <span class="order__content">${order.customer_name}</span>
                    <span class="order__content">${order.hotel_id}</span>
                    <span class="order__content">${order.tour_name}</span>
                    <span class="order__content">${order.date}</span>
                    <span class="order__content">${order.phonenumber}</span>
                    <span class="order__content">
                       ${status
                }
                    </span>
                </div> 
                
            </div>
            <div class="order__detail__${order._id} order__detail hide">
                <div class="order__detail__lab__${order._id} order__detail__lab">
                    
                </div>
                <div class="order__detail__list__${order._id} order__detail__list">
                    
                </div>
                </div>
                `
        })
        contentList.innerHTML = htmls.join('')

        const iconOrder = document.querySelectorAll(".order__icon")

        const orderDetail = document.querySelectorAll('.order__detail')

        Array.from(orderDetail).map((order, index) => {

            Array.from(iconOrder).map((icon, indexicon) => {
                if (index == indexicon) {
                    icon.addEventListener('click', function () {
                        const hide = order.classList.contains('hide')
                        if (hide)
                            order.classList.remove('hide')
                        else
                            order.classList.add('hide')
                    })
                }

            })


        })

    })


}
function renderOrderDetail(tour) {

    const id = tour.getAttribute('data-id')

    const orderdetail = document.querySelector(`.order__detail__${id}`)

    const orderLabel = orderdetail.querySelector(`.order__detail__lab__${id}`)
    const orderList = orderdetail.querySelector(`.order__detail__list__${id}`)
    getOrderDetail(function (orders) {
        const getOrderbyID = orders.filter(order => {
            return id == order.order_id
        })
        orderLabel.innerHTML = `
        <span class="orderDetail_label">Driver</span>
                    <span class="orderDetail_label">Vehicle</span>
                    <span class="orderDetail_label">TourGuide</span>
                    <span class="orderDetail_label">Marge</span>
                    <span class="orderDetail_label">People</span>
                    <span class="orderDetail_label">Note</span>
       `
        const htmls = getOrderbyID.map(order => {
            orderList.innerHTML = `
            <span class="orderDetail_item">${order.driver_id}</span>
            <span class="orderDetail_item">${order.vehicle_id}</span>
            <span class="orderDetail_item">${order.tourguide_id}</span>
            <span class="orderDetail_item">${order.merge_tour}</span>
            <span class="orderDetail_item">${order.numberOfPeople}</span>
            <span class="orderDetail_item">${order.note}</span>
        `
        })
    })


}
function showOrderDetail() {
    const innerIcon = document.querySelector(".inner__icon")
    innerIcon.innerHTML = `<i  class="fa-solid fa-sort-up dropDowIcon"></i>`
    const dropDowIcon = document.querySelector('.dropDowIcon')
    dropDowIcon.addEventListener('click', function () {

    })
}
function searchOrder() {
    const search = document.querySelector('.service__search')
    const input = search.querySelector('.service__input').value
    const contentList = document.querySelector('.content__list')
    getOrder(function (orders) {
        const findOrderByName = orders.filter(order => {
            return order.customer_name.toUpperCase().search(input.toUpperCase()) != -1
        })

        const htmls = findOrderByName.map((order, index) => {

            if (order.status)
                var status = "Đã thanh toán"
            else
                var status = "Chưa thanh toán"

            return `
                <div class="order__item" >
                        <span class="order__content">
                        <span class="inner__icon">
                        <i data-id=${order._id} onclick="renderOrderDetail(this);" class="fa-solid fa-sort-down order__icon"></i></span>
                        ${index}</span>
                        <span class="order__content">${order.customer_name}</span>
                        <span class="order__content">${order.hotel_id}</span>
                        <span class="order__content">${order.tour_name}</span>
                        <span class="order__content">${order.date}</span>
                        <span class="order__content">${order.phonenumber}</span>
                        <span class="order__content">
                           ${status
                }
                        </span>
                    </div> 
                    
                </div>
                <div class="order__detail__${order._id} order__detail hide">
                    <div class="order__detail__lab__${order._id} order__detail__lab">
                        
                    </div>
                    <div class="order__detail__list__${order._id} order__detail__list">
                        
                    </div>
                    </div>
                    `
        })
        contentList.innerHTML = htmls.join('')

        const iconOrder = document.querySelectorAll(".order__icon")

        const orderDetail = document.querySelectorAll('.order__detail')

        Array.from(orderDetail).map((order, index) => {

            Array.from(iconOrder).map((icon, indexicon) => {
                if (index == indexicon) {
                    icon.addEventListener('click', function () {
                        const hide = order.classList.contains('hide')
                        if (hide)
                            order.classList.remove('hide')
                        else
                            order.classList.add('hide')
                    })
                }

            })


        })
    })
}
onLoad()