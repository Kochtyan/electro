import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

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





const scrollLink = document.getElementById('scroll-link');
const scrollElement = document.getElementById('scroll-element');

  scrollLink.addEventListener('click', (event) => {
    event.preventDefault();

    const elementTop = scrollElement.getBoundingClientRect().top + window.pageYOffset;

    window.scrollTo({
      top: elementTop,
      behavior: 'smooth'
    });
  });