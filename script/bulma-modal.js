class BulmaModal {
  constructor(selector) {
    this.elem = document.querySelector(selector)
    this.elem.children[1].style.animationDuration = '400ms'
    this.close_data()
  }
  
  show() {
    animateCSS(this.elem.children[1], 'zoomIn')
    this.elem.classList.add('is-active')
    this.on_show()
  }
  
  close() {
    animateCSS(this.elem.children[1], 'zoomOut')
    this.elem.classList.remove('is-active')
    this.on_close()
  }
  
  close_data() {
    var modalClose = this.elem.querySelectorAll("[data-bulma-modal='close'], .modal-background")
    var that = this
    modalClose.forEach(function(e) {
      e.addEventListener("click", function() {
        animateCSS(that.elem.children[1], 'zoomOut', function () {
          that.elem.classList.remove('is-active')
        })
        that.on_close();
      })
    })
  }
  
  on_show() {
    var event = new Event('modal:show')
    this.elem.dispatchEvent(event);
  }
  
  on_close() {
    var event = new Event('modal:close')
    this.elem.dispatchEvent(event);
  }
  
  addEventListener(event, callback) {
    this.elem.addEventListener(event, callback)
  }
}
