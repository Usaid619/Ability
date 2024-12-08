const navLinks = Array.from(document.querySelectorAll(".nav-item"))
const navItems = Array.from(document.querySelectorAll(".nav-item h4"))

const topText = document.querySelector(".top-text")
const rows = document.querySelectorAll(".text-row")

const carousel = document.querySelector(".carousel-container")
const container = document.querySelector(".slides")
const slides = document.querySelectorAll(".slide")
const prevButton = document.querySelector(".left")
const nextButton = document.querySelector(".right")
const dots =  document.querySelectorAll(".dots")

let currentIndex = 0

function nextSlide(){
    if(currentIndex < slides.length - 1){
        currentIndex++
    } else{
        currentIndex = 0
    }

    updateCarousel()
}

function prevSlide() {
    if (currentIndex > 0) {
        currentIndex--
    } else {
        currentIndex = slides.length - 1
    }
    updateCarousel()
}

function updateCarousel() {
    slides.forEach((slide, index) => {
      if (index < currentIndex) {
        slide.style.transform = 'translateY(100%)'
        slide.style.opacity = '0'
      } else if (index === currentIndex) {
        slide.style.transform = 'translateY(0)'
        slide.style.opacity = '1'
      } else {
        slide.style.transform = 'translateY(100%)'
        slide.style.opacity = '0'
      }
    })

    dots.forEach((dot,index) =>{
        if(index === currentIndex){
            dot.classList.add("active")
        } else{
            dot.classList.remove("active")
        }
    })

  }

nextButton.addEventListener('click', nextSlide);
prevButton.addEventListener('click', prevSlide);

navItems.forEach(h4 =>{
const letters = h4.textContent.split("").map(char => `<span>${char}</span>`).join("")
h4.innerHTML = letters
})

navLinks.forEach((link,index) =>{
    // nav item me hover karen toh saare span -100% ho jaayen
    link.addEventListener("mouseenter",(e)=>{
    const h4 = Array.from(e.target.querySelectorAll("h4"))
    h4.forEach(h4 =>{
        const spans = Array.from(h4.querySelectorAll("span"))
        spans.forEach(span => {
            gsap.to(span,{
                yPercent:-100,
                duration:.3,
                ease:"ease"
            })
        })
    })
    })
})

function startAnimation(){
    const tl = gsap.timeline()

    tl.from(".header-logo",{
        opacity:0,
        duration:.3,
        delay:.4,
        ease:"ease"
    })
    
    tl.from(navItems,{
        opacity:0,
        stagger:.1,
          ease:"ease"
    })

    const tl1 = gsap.timeline({
        scrollTrigger:{
            trigger:".main-container",
            start:"top top",
            end:"bottom 30%",
            scrub:2,
            pin:true,
        }
    })

    tl1.from(".scrolling-text-container", { scale: 20 })
    tl1.from("#banner-video", { clipPath: "circle(150% at 50% 50%)" }, "<")

   
    rows.forEach((line,index) =>{
        const xOffset = index % 2 === 0 ? 3 : -3
        tl1.to(line,{
        xPercent:xOffset,
        },"a")
    })
   
    gsap.from(".top-text",{
        opacity:0,
        scrollTrigger:{
            trigger:".top-text",
            start:"top -20%",
            end:"bottom -70%",
            markers:true,
            scrub:1,   
        }
    })

}


window.addEventListener("DOMContentLoaded", startAnimation)