let menuContainer = document.querySelector('.menuContainer')
let hambContainer = document.querySelector('.hambContainer')
let topSpan = document.querySelector('.hambContainer .topSpan')
let middleSpan = document.querySelector('.hambContainer .middleSpan')
let bottomSpan = document.querySelector('.hambContainer .bottomSpan')

// Hamburger animation

// Set default style parameters
topSpan.style.transformOrigin = 'center'
bottomSpan.style.transformOrigin = 'center'
middleSpan.style.opacity = '1'
topSpan.style.transform = 'rotate(0deg) translateX(0px) translateY(0px)'
topSpan.style.top = '0'
bottomSpan.style.transform = 'rotate(0deg) translateX(0px) translateY(0px)'
bottomSpan.style.top = '12px'
hambContainer.style.transform = 'rotate(0deg)'

hambContainer.addEventListener('click', () => {
    
    // Hamburger animation
    if (middleSpan.style.opacity === '1') {
        middleSpan.style.opacity = '0'
    } else {
        middleSpan.style.opacity = '1'
    }

    if (topSpan.style.transform === 'rotate(0deg) translateX(0px) translateY(0px)') {
        topSpan.style.transform = 'rotate(45deg) translateX(6px) translateY(6px)'
    } else {
        topSpan.style.transform ='rotate(0deg) translateX(0px) translateY(0px)'
    }

    if (bottomSpan.style.transform === 'rotate(0deg) translateX(0px) translateY(0px)') {
        bottomSpan.style.transform = 'rotate(-45deg) translateX(1px) translateY(-1px)'
    } else {
        bottomSpan.style.transform = 'rotate(0deg) translateX(0px) translateY(0px)'
    }

    if (topSpan.style.top === '0') {
        topSpan.style.top = '9px'
    } else {
        topSpan.style.top = '0'
    }
    
    if (bottomSpan.style.top === '12px') {
        bottomSpan.style.top = '4px'
    } else {
        bottomSpan.style.top = '12px'
    }

    if (hambContainer.style.transform === 'rotate(0deg)') {
        hambContainer.style.transform = 'rotate(180deg)'
    } else {
        hambContainer.style.transform = 'rotate(0deg)'
    }

    // Menu animation
    menuContainer.classList.toggle('closed')
})