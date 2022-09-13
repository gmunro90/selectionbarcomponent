/* global SelectionBar */ 
class SelectionBar {
  constructor (elementId, options) {
    this.elementId = elementId
    const DEFAULTS = {
    }
    this.options = Object.assign({}, DEFAULTS, options)
    const el = document.getElementById(this.elementId)
    if (el) {
      el.addEventListener('click', this.handleClick.bind(this))
      let html = `
       
        `
      el.innerHTML = html
      // this.render()
    }    
  }
  // render () {
  //   console.log('testing')
  // }
  handleClick (event) {  
    if (event.target.classList.contains('bookmarkBtn')) {
      this.openForm() 
    } 
  }
}
