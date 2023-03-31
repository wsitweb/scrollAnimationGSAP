gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
let preloader = document.querySelector('.preloader');

if(!ScrollTrigger.isTouch){
    window.addEventListener('load', ()=>{
        ScrollSmoother.create({
            wrapper: '.wrapper',
            content: '.content',
            smooth: 3,
            effects: true,
        })

        function preloaderOf(){
            if(preloader.classList.length == 1){
                preloader.classList.add('disable');
                setTimeout(preloaderOf, 1000)
            }else{
                preloader.style.display = 'none';
            }
        }
        preloaderOf();

        let animetionElementOne = '.preview';
        let animetionElementsLeft = document.querySelectorAll('.gallery__item:first-child > *');
        let animetionElementsRight = document.querySelectorAll('.gallery__item:last-child > *');
        
        gsap.fromTo(animetionElementOne, {opacity: 1, transform: 'scale(1)', },
            {
                opacity: 0,
                transform: 'scale(.9)',
                scrollTrigger: {
                    trigger: animetionElementOne,
                    start: 'top',
                    end: 'bottom',
                    scrub: true,
                },
            }
        )
        
        function animationGsap(element, xPosition, height){
            gsap.fromTo(element, {opacity: 0, x: xPosition, } , 
                {
                    opacity: 1, x: 0,
                    
                    scrollTrigger: {
                        trigger: element,
                        start: String(height * -2),
                        end: String(height * -0.2),
                        scrub: true,
                    },
                }
            )
        }
        function forEachElements(elements, xPosition){
            elements.forEach((element, index, array)=>{
                let heightElement = element.offsetHeight;
                if(heightElement < 300){
                    heightElement = 400;
                }else if(heightElement > 500){
                    heightElement = 500;
                }
                animationGsap(element, xPosition, heightElement);
            })
        }
        forEachElements(animetionElementsLeft, -800);
        forEachElements(animetionElementsRight, 300);
    })
}