import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

function setMainAnimation() {
    gsap.registerPlugin(ScrollTrigger);

    const timeline = gsap.timeline();
    timeline.fromTo('.about', {x: '-100vw', y: '100vh'}, {y: '0'});
    timeline.from('.about__image', {scale: 0.5, opacity: 0, rotate: 10}, '<0.2');
    timeline.fromTo('.category', {x: '-200vw', y: '100vh'}, {y: '0'});
    timeline.from('#category-card__image1', {scale: 0.5, opacity: 0, y: -100}, '<0.2');
    timeline.fromTo('.category', {x: '-200vw', y: '0', backgroundColor: 'white'}, {y: '-100vh', backgroundColor: 'black'}, '>0.2');
    timeline.from('#category-card__image2', {scale: 0.5, opacity: 0, y: -100}, '<0.2');
    timeline.fromTo('.info', {x: '-300vw', y: '100vh'}, {y: '0'});
    timeline.to('.category', {y: '-140vh'}, '<0.1');

    const animBlock = document.querySelector('.anim');
    console.log(animBlock.offsetWidth);

    ScrollTrigger.create({
        animation: timeline,
        trigger: '.anim',
        start: 'top top',
        end: 6000,
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

function initTabs() {
    const tabs = document.querySelectorAll('.tabs');
    if(tabs.length > 0) {
        tabs.forEach((tab) => {
            new Tabs(tab);
        })
    }
}


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
})





/*
const scrollLink = document.getElementById('scroll-link');
const scrollElement = document.getElementById('scroll-element');

  scrollLink.addEventListener('click', (event) => {
    event.preventDefault();

    const elementTop = scrollElement.getBoundingClientRect().top + window.pageYOffset;

    window.scrollTo({
      top: elementTop,
      behavior: 'smooth'
    });
  });*/
/*
let popup = document.getElementById("popup");

function openPopup(){
  popup.classList.add("open-popup");
  document.getElementsByTagName('html')[0].style.overflowY = "hidden";
  document.getElementById('popup-black').style.visibility = "visible";
}

function closePopup(){
  popup.classList.remove("open-popup");
  document.getElementsByTagName('html')[0].style.overflowY = "visible";
  document.getElementById('popup-black').style.visibility = "hidden";
}

function replaceMapComponentsContent() {
const mapComponents = document.querySelector('.map__components');
let originalContent = mapComponents.innerHTML;
mapComponents.innerHTML = `
<div class="map__components">
            <a href="#" class="map__back-link restore-button">
                <div class="map__arrow" style="margin-right: 10px;">
                  <img src="../images/map_leftarrow.svg" alt="Left arrow">
                </div>
                Назад 
            </a>
                <div class="map__text">
                    <p class="map__adress">
                        Барнаул, ул. Партизанская, д. 203
                    </p>
                    <p class="map__name">
                        ИП Шаперина Любовь Сергеевна
                    </p>
                    <p class="map__subtext">
                        Ежедневно с 10:00 до 20:00
                    </p>
                    <a href="tel:89994231973" class="map__back-link">
                        <div class="map__arrow" style="margin-right: 10px;">
                          <img src="../images/icon_phone.svg" alt="Left arrow">
                        </div>
                        8-999-423‒19-73
                    </a>
                </div>
        </div>
`;
document.querySelector('.restore-button').addEventListener('click', function(event) {
event.preventDefault();
mapComponents.innerHTML = originalContent;
});
}

const link = document.querySelector('.map__link');
link.addEventListener('click', (event) => {
event.preventDefault();
replaceMapComponentsContent();
});
*/