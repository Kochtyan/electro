import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import { doc } from "prettier";

function setMainAnimation() {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    const timeline = gsap.timeline();
    timeline.fromTo('.about', {x: '-100vw', y: '100vh'}, {y: '0'});
    timeline.from('.about__image', {scale: 0.5, opacity: 0, rotate: 10}, '<0.2');
    timeline.fromTo('.category', {x: '-200vw', y: '100vh'}, {y: '0'});
    timeline.from('#category-card__image1', {scale: 0.5, opacity: 0, y: -100}, '<');
    timeline.fromTo('.category', {x: '-200vw', y: '0', backgroundColor: 'white'}, {y: '-100vh', backgroundColor: 'black'}, '>0.1');
    timeline.from('#category-card__image2', {scale: 0.5, opacity: 0, y: -100}, '<');
    timeline.fromTo('.info', {x: '-300vw', y: '100vh', ease: 'none'}, {y: '60vh', ease: 'none'}, '<');
    timeline.fromTo('.info', {x: '-300vw', y: '60vh', ease: 'none'}, {y: '0', ease: 'none'});
    timeline.fromTo('.category', {y: '-100vh', ease: 'none'}, {y: '-165vh', ease: 'none'}, '<');

    const animBlock = document.querySelector('.anim');
    console.log(animBlock.offsetWidth);

    ScrollTrigger.create({
        animation: timeline,
        trigger: '.anim',
        start: 'top top',
        end: 4000,
        scrub: true,
        pin: true
    })
}

class Tabs {
    constructor(root) {
        this.root = root;
        this.buttons = this.root.querySelectorAll('.tabs__button');
        this.panes = this.root.querySelectorAll('.tabs__pane');
        this.activeIndex = 0;

        if(this.buttons.length != this.panes.length) {
            console.error('Length of buttons and panes not equal (class Tabs)');
            return;
        }

        this.bindListeners();
    }

    bindListeners() {
        this.buttons.forEach((button, index) => {
            button.addEventListener('click', (event) => {
                this.switchPane(index);
            })
        })
    }

    switchPane(index) {
        this.panes[this.activeIndex].classList.remove('tabs__pane_show');
        this.buttons[this.activeIndex].classList.remove('button_accent');
        this.activeIndex = index;
        this.panes[this.activeIndex].classList.add('tabs__pane_show');
        this.buttons[this.activeIndex].classList.add('button_accent');
    }
}

class Popup {
    constructor(root) {
        this.root = root;
        this.closeButton = this.root.querySelector('.popup__close');
        this.overlay = this.root;
        this.html = document.querySelector('html');
        this.bindListeners();
    }

    bindListeners() {
        this.root.addEventListener('click', (event) => {
            //Если нажатие на оверлей или на кнопку закрытия
            if(event.target == this.overlay || event.target == this.closeButton) {
                event.preventDefault();
                this.close();
            }
        })
    }

    open() {
        console.log('open');
        this.html.classList.add('no-scroll');
        this.root.classList.add('popup__overlay_show');
    }

    close() {
        this.html.classList.remove('no-scroll');
        this.root.classList.remove('popup__overlay_show');
    }
}

function initTabs() {
    const tabs = document.querySelectorAll('.tabs');
    if(tabs.length > 0) {
        tabs.forEach((tab) => {
            new Tabs(tab);
        })
    }
}

function initPopup() {
    //Feedback
    const popupNode = document.querySelector('#popup');
    const popup = new Popup(popupNode);

    const popupButtons = document.querySelectorAll('a[href="#feedback"]');
    if(popupButtons.length > 0) {
        popupButtons.forEach((button) => {
            button.addEventListener('click', (event) => {
                popup.open();
            })
        })
    }

    //Mobile menu
    const mobileMenuNode = document.querySelector('#mobile-menu');
    const mobileMenu = new Popup(mobileMenuNode);


    const mobileMenuButton = document.querySelector('.menu__burger');
    if(mobileMenuButton) {
        mobileMenuButton.addEventListener('click', (event) => {
            mobileMenu.open();
        })
    }
}

function initMapList() {
    //Temporary
    console.log(123);
    const mapItems = document.querySelector('.map__items');
    const mapMenu = document.querySelector('.map__menu');
    const mapDetail = document.querySelector('.map__detail');
    const mapBack = document.querySelector('.map__back-link');
    if(mapItems) {
        mapItems.addEventListener('click', (event) => {
            mapMenu.classList.add('hidden');
            mapDetail.classList.remove('hidden');
        })
        mapBack.addEventListener('click', (event) => {
            mapDetail.classList.add('hidden');
            mapMenu.classList.remove('hidden');
        })
    }
}

/*function scrollToAboutBlock() {
    console.log(123);
    gsap.to(window, {duration: 0, scrollTo: "#about"});
}*/

document.addEventListener('DOMContentLoaded', (event) => {
    const isTablet = document.documentElement.clientWidth < 1100;
    const isMobile = document.documentElement.clientWidth < 768;

    if(!isTablet) {
        const animBlock = document.querySelector('.anim');
        if(animBlock) {
            setMainAnimation();
        }
    }

    initTabs();
    initPopup();
    initMapList();
})