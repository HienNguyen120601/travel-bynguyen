var cagetory = document.querySelector('.cagetory__wrap')
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
