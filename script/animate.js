function animateCSS(element, animationName, callback) {
  element.classList.add('animated', animationName)

  function handleAnimationEnd() {
      console.log('Animations ended!')
      element.classList.remove('animated', animationName)
      element.removeEventListener('animationend', handleAnimationEnd)

      if (typeof callback === 'function') callback()
  }

  element.addEventListener('animationend', handleAnimationEnd)
}