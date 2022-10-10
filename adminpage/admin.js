var apiTour = 'https://travel-api-hiennguyen.herokuapp.com/api/tour'

var apiOrder = 'https://632d7be60d7928c7d24c1655.mockapi.io/Order'
var apiUser = 'https://travel-api-hiennguyen.herokuapp.com/api/customer'
function onLoad() {

    const login = sessionStorage.getItem('adminlogin')

    if (login != 1) {
        window.location = './login.html'
    }

    render = sessionStorage.getItem('render')
    console.log(render)
    if (render == 'tour') {

        renderTour()
    }
    else if (render == 'customer') {
        renderCustormer()
    }
    else {
        renderTour()
    }



    showAddForm()

}
function getTours(callback) {
    fetch(apiTour).then(function (reponse) {
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
function addTour() {
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

    postData(apiTour, data)
    alert("Success!")
    setTimeout(() => {
        location.reload()
    }, 1500)




}
function updateTour() {
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
    updateData(apiTour, id, data)
    alert("Success!")
    setTimeout(() => {
        location.reload()
    }, 1500)
}
function deleteTour(tour) {
    const tourid = tour.getAttribute('data-id')

    deleteData(apiTour, tourid)
    alert("Success!")
    setTimeout(() => {

        location.reload()
    }, 1500)



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
        <i class="fa-solid fa-magnifying-glass" onclick="search();"></i>
    </div>

    <button class="service__addtour">Thêm mới</button>
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
                <span class="product__content">${tour.img}</span>
                <span class="product__content">
                <i onclick="deleteTour(this);" class="fa-solid fa-circle-xmark" data-id=${tour._id}></i>
                <i onclick="showUpdateForm(this)" class="fa-solid fa-pen" data-id=${tour._id}></i>
                </span>
            </div>`
        })

        contentList.innerHTML = htmls.join('')
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
        <input type="text" placeholder="Nhập tên tour" class="service__input">
        <i class="fa-solid fa-magnifying-glass" onclick="search();"></i>
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
        console.log(contentList)
        const htmls = users.map((user, index) => {

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
function blockCustormer(customer) {

    const customerId = customer.getAttribute('data-id')
    getUser(function (users) {
        const custormerBlock = users.filter((user) => {
            return user._id == customerId
        })

        if (custormerBlock[0].block == 0)
            custormerBlock[0].block = 1
        else
            custormerBlock[0].block = 0
        updateData(apiUser, customerId, custormerBlock[0])
        alert('Success')
        setTimeout(() => {
            location.reload()
        }, 1500)
    })


}
function search() {

    const contentList = document.querySelector('.content__list')
    const search = document.querySelector('.service__search')
    const input = search.querySelector('.service__input').value
    getTours(function (tours) {
        const tourByTitle = tours.filter((tour) => {
            return tour.title.search(input) != -1
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

function showAddForm() {
    const btnAdd = document.querySelector('.service__addtour')
    const form = document.querySelector('.addtour')
    const formbg = document.querySelector('.modal_background')
    btnAdd.addEventListener('click', () => {

        form.classList.remove('hideModal')
    })
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

onLoad()