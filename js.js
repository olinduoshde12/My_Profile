let menu=document.querySelector('#menu-icon');
let navbar=document.querySelector('.nav-bar');

menu.onclick = () =>{
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('open');
}

window.onscroll=()=>{
    menu.classList.remove('bx-x');
    navbar.classList.remove('open')
}
/*acive link*/

let section=document.querySelectorAll('section');
let navLinks=document.querySelectorAll('header ul li a');

window.onscroll = () =>{
    section.forEach(sec =>{
        let top=window.scrollY;
        let offset=sec.offsetTop - 150;
        let height=sec.offsetHeight;
        let id=sec.getAttribute('id');

        if(top >= offset && top < offset + height){
            navLinks.forEach(links =>{
                links.classList.remove('active');
                document.querySelector('header ul li a[href*=' +id+ ']').classList.add('active');
            });
        }
    });

    let header=document.querySelector('.nav-bar');
    header.classList.toggle('sticky',window.scrollY > 100);
};
/*

typed js*/
const  typed=new Typed('.multiple-context',{
    strings:['Frontend Developer','FullStack Developer','blogger','Designer'],
    typeSpeed:150,
    backSpeed:100,
    backDelay:1000,
    loop:true
});
/*
scroll revel*/
ScrollReveal({
    reset: true,
    distance:'80px',
    duration:2000,
    delay:200
});
ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .service-container,.assignment,.skills, .contact-us, .time-line, .text, .container2, .project-container', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about img, .time-line, .text', { origin: 'left' });

/*
sticky navbar*/




/*
swiper

*/
const wrapper=document.querySelector(".wrapper")
const  carousel=document.querySelector(".carsoul1");
const  arrowBtns=document.querySelectorAll(".wrapper i")
const firstCardWidth=document.querySelector(".card").offsetWidth;

const carouselChildrens=[...carousel.children];

let isDragging=false,startX,startScrollLeft,timeoutId;
let cardPerView=Math.round(carousel.offsetWidth / firstCardWidth)

carouselChildrens.slice(-cardPerView).reverse().forEach(card =>{
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});
carouselChildrens.slice(0,cardPerView).forEach(card =>{
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});
const  dragStart = (e) =>{
    isDragging = true;
    carousel.classList.add("dragging")
    startX = e.pageX;
    startScrollLeft =carousel.scrollLeft;
}
arrowBtns.forEach(btn =>{
    btn.addEventListener("click", () =>{
        carousel.scrollLeft +=btn.id === "left" ? -firstCardWidth : firstCardWidth;
    })
})
const dragging = (e) =>{
    if(!isDragging) return;
    carousel.scrollLeft= startScrollLeft - (e.pageX - startX);
}
const  dragStop = () =>{
    isDragging=false;
    carousel.classList.remove("dragging")
}

const infiniteScroll = () =>{
    if(carousel.scrollLeft === 0){
        carousel.classList.add("no-transition");
       carousel.scrollLeft=carousel.scrollWidth -(2*carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth){
        carousel.classList.add("no-transition");
        carousel.scrollLeft=carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }
    clearTimeout(timeoutId);
    if(!wrapper.matches(":hover")) autoPlay();
};

const  autoPlay = () =>{
    if (window.innerWidth <800) return;
    timeoutId=setTimeout(() =>carousel.scrollLeft += firstCardWidth,2500);
}
autoPlay();
carousel.addEventListener("mousedown",dragStart)
carousel.addEventListener("mousemove",dragging);
document.addEventListener("mouseup",dragStop);
carousel.addEventListener("scroll",infiniteScroll);
wrapper.addEventListener("mouseenter",() => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave",autoPlay);