// Navigation
const navLinks = Array.from(document.querySelectorAll(".nav-item"))
const navItems = Array.from(document.querySelectorAll(".nav-item h4"))

// TextWrap
const textWrap = Array.from(document.querySelectorAll(".text-wrap"))
const topText = document.querySelector(".top-text")
const bottomText = document.querySelector(".bottom-text")

// Reveal
const rows = document.querySelectorAll(".text-row")

// Carousel
const carousel = document.querySelector(".carousel-container")
const container = document.querySelector(".slides")
const slides = document.querySelectorAll(".slide")
const prevButton = document.querySelector(".left")
const nextButton = document.querySelector(".right")
const dots =  document.querySelectorAll(".dots")

let currentIndex = 0

function startAnimations(){
    animateLandingPage()
    animateOnScroll()
}

function animateLandingPage(){
    splitText(bottomText)
    const indiLetters = Array.from(bottomText.querySelectorAll("p"))
    
    const tl = gsap.timeline()

    tl.from(".header-logo",{
        opacity:0,
        duration:.3,
        delay:.4,
        ease:"ease"
    })
    .from(navLinks,{
        opacity:0,
        stagger:.1,
        ease:"ease"
    })
    .from(".bottom-text",{
        opacity:0,
        xPercent:-6,
        ease:"ease"
    })
    .from(indiLetters,{
        opacity:0,
        stagger:0.01,
        ease:"ease"
    })
}

function animateOnScroll(){
    splitText(topText)
    const indiLetters = Array.from(topText.querySelectorAll("p"))
    const tl1 = gsap.timeline({
        scrollTrigger:{
            trigger:".main-container",
            start:"top top",
            end:"bottom 30%",
            scrub:2,
            pin:true,
        }
    })

    tl1.from(".scrolling-text-container",{
        scale: 20
    })
    .from("#banner-video", {
        clipPath: "circle(150% at 50% 50%)"
    },"<")

    rows.forEach((line,index) =>{
        const xOffset = index % 2 === 0 ? 5 : -5
        tl1.to(line,{
        xPercent:xOffset,
        delay:"-0.1",
        ease:"ease"
        },"a")
    })

    tl1.from(indiLetters,{
        opacity:0,
        stagger:0.02,
        duration:1,
        scrollTrigger:{
            trigger:".top-text",
            start:"top -20%",
            end:"bottom -60%",
            scrub:1
        }
    })


    gsap.to(".header",{
        backgroundColor:"#000",
        duration:0.3,
        scrollTrigger:{
            trigger:document.body,
            start:"100px top",
            toggleActions:"play none none reverse"
        }
    })

}

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
        gsap.to(slide,{
            opacity:0,
            duration:.3,
            ease:"ease"
        })
      } else if (index === currentIndex) {
        // curtain animation
        const curtain = slide.querySelector(".curtain")
        const image = slide.querySelector("img")
        if(curtain){
            // killing previous ongoing animations
            gsap.killTweensOf(curtain)

            gsap.to(slide,{
                opacity:1,
                duration:.2
            })

            gsap.set(curtain,{xPercent:100})

            gsap.to(curtain,{
                xPercent:-100,
                duration:3.5,
                ease:"power2.out"

            })

            gsap.from(image,{
                opacity:0,
                duration:1,
            })
        }
      } else {
        gsap.to(slide,{
            opacity:0,
            duration:.3,
            ease:"ease"
        })
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

function splitText(element){
element.innerHTML = element.textContent
.split("")
.map(letter => letter === " "
     ? `<p>&nbsp;</p>`
     : `<p>${letter}</p>`)
.join("")
}

//   Splitting The Text
  textWrap.forEach(textWrap =>{
    const outgoing = textWrap.querySelector(".outgoing")
    const incoming = textWrap.querySelector(".incoming")

    splitText(outgoing)
    splitText(incoming)
  })
  
//   Animating the splitted Text
   navLinks.forEach(link =>{
        const outgoingLetters = Array.from(link.querySelectorAll(".outgoing p"))
        const incomingLetters = Array.from(link.querySelectorAll(".incoming p"))

    link.addEventListener("mouseenter", () =>{
        
        gsap.to(outgoingLetters,{    
            
            yPercent:-120,
            duration:0.4,
            stagger:0.05,
            ease:"power2.out",
        })

        gsap.to(incomingLetters,{
            yPercent:-150,
            duration:0.4,
            stagger:0.05,
            ease:"power2.out",
            onComplete:()=>{
                gsap.set(outgoingLetters,{yPercent:0})
                gsap.set(incomingLetters,{yPercent:0})
            }
        })
    })
   })

nextButton.addEventListener('click', nextSlide)
prevButton.addEventListener('click', prevSlide)

window.addEventListener("DOMContentLoaded", startAnimations)