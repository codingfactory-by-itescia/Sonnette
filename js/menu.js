let container = document.querySelector('.hambContainer')
let topSpan = document.querySelector('.hambContainer .topSpan')
let middleSpan = document.querySelector('.hambContainer .middleSpan')
let bottomSpan = document.querySelector('.hambContainer .bottomSpan')

// Set default style parameters
topSpan.style.transformOrigin = 'center'
bottomSpan.style.transformOrigin = 'center'
middleSpan.style.opacity = '1'
topSpan.style.transform = 'rotate(0deg) translateX(0px) translateY(0px)'
topSpan.style.top = '0'
bottomSpan.style.transform = 'rotate(0deg) translateX(0px) translateY(0px)'
bottomSpan.style.top = '12px'

container.addEventListener('click', () => {
    
    middleSpan.style.opacity === '1' ? middleSpan.style.opacity = '0' : middleSpan.style.opacity = '1'
    topSpan.style.transform === 'rotate(0deg) translateX(0px) translateY(0px)' ? topSpan.style.transform = 'rotate(45deg) translateX(6px) translateY(5px)' : topSpan.style.transform ='rotate(0deg) translateX(0px) translateY(0px)'
    bottomSpan.style.transform === 'rotate(0deg) translateX(0px) translateY(0px)' ? bottomSpan.style.transform = 'rotate(-45deg) translateX(1px) translateY(-2px)' : bottomSpan.style.transform = 'rotate(0deg) translateX(0px) translateY(0px)'
    topSpan.style.top === '0' ? topSpan.style.top = '9px' : topSpan.style.top = '0'
    bottomSpan.style.top === '12px' ? bottomSpan.style.top = '4px' : bottomSpan.style.top = '12px'
})