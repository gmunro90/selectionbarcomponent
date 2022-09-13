/*
global
SelectionBar
include
enigma
schema
app
*/
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


const session = enigma.create({
  schema, 
  url: 'wss://ec2-3-86-99-193.compute-1.amazonaws.com/app/cee97e28-59cf-411f-acb5-c3a7f40ee7ac'
})

session.open().then(global => {
  console.log(global)
  global.openDoc('cee97e28-59cf-411f-acb5-c3a7f40ee7ac').then(app => {
    console.log(app)
    const bookmark = new SelectionBar('websy-selection-bar', {app})
  })
})
