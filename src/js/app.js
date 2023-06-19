import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const timeline = gsap.timeline();
timeline.fromTo('.about', {x: '-100vw', y: '+100vh'}, {y: '0'});
timeline.fromTo('.categoryes', {x: '-200vw', y: '+100vh'}, {y: '0'});

const main = document.querySelector('main');

ScrollTrigger.create({
  animation: timeline,
  trigger: '.anim',
  start: 'top top',
  end: () => main.offsetWidth / 1.2,
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