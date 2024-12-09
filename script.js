const navLinks = Array.from(document.querySelectorAll(".nav-item"))
const navItems = Array.from(document.querySelectorAll(".nav-item h4"))
const textWrap = Array.from(document.querySelectorAll(".text-wrap"))

const topText = document.querySelector(".top-text")
const rows = document.querySelectorAll(".text-row")

const carousel = document.querySelector(".carousel-container")
const container = document.querySelector(".slides")
const slides = document.querySelectorAll(".slide")
const prevButton = document.querySelector(".left")
const nextButton = document.querySelector(".right")
const dots =  document.querySelectorAll(".dots")

let currentIndex = 0



function startAnimation(){
    const tl = gsap.timeline()

    tl.from(".header-logo",{
        opacity:0,
        duration:.3,
        delay:.4,
        ease:"ease"
    })
    
    tl.from(navLinks,{
        opacity:0,
        stagger:.1,
        ease:"ease"
    })

    tl.from(".bottom-text",{
        opacity:0,
        xPercent:-6,
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
            end:"bottom -60%",
            scrub:1,   
        }
    })

    gsap.to(".header",{
        backgroundColor:"#000",
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
        slide.classList.remove("active-slide")
      } else if (index === currentIndex) {
        slide.classList.add("active-slide")
      } else {
        slide.classList.remove("active-slide")
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

//   Splitting The Text
  textWrap.forEach(textWrap =>{
    const outgoing = textWrap.querySelector(".outgoing")
    const incoming = textWrap.querySelector(".incoming")

    outgoing.innerHTML = outgoing.textContent.split("").map(letter => `<p>${letter}</p>`).join("")
    incoming.innerHTML = incoming.textContent.split("").map(letter => `<p>${letter}</p>`).join("")
  })
  
//   Animating the splitted Text
   navLinks.forEach(link =>{
    const outgoingLetters = Array.from(link.querySelectorAll(".outgoing p"))
        const incomingLetters = Array.from(link.querySelectorAll(".incoming p"))

    link.addEventListener("mouseenter", () =>{
        
        gsap.to(outgoingLetters,{    
            
            yPercent:-100,
            duration:0.2,
            stagger:0.05,
            ease:"power2.out",
        })

        gsap.to(incomingLetters,{
            yPercent:-100,
            duration:0.2,
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

window.addEventListener("DOMContentLoaded", startAnimation)