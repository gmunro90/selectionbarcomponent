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
      def: {
        qInfo: {qType: 'currentSelections'},
        qSelectionObjectDef: {}
      }
    }
    this.options = Object.assign({}, DEFAULTS, options)
    const el = document.getElementById(this.elementId)
    if (el) {
      el.addEventListener('click', this.handleClick.bind(this))
      let html = `
      <div class="left-group">
      <div class="back">
        <button class="back-btn">
          <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512">
            <title>Return Down Back</title>
            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"
              d="M112 352l-64-64 64-64" />
            <path d="M64 288h294c58.76 0 106-49.33 106-108v-20" fill="none" stroke="currentColor" stroke-linecap="round"
              stroke-linejoin="round" stroke-width="32" />
          </svg>
        </button>
      </div>
      <div class="forward">
        <button class="forward-btn">
          <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512">
            <title>Return Down Forward</title>
            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"
              d="M400 352l64-64-64-64" />
            <path d="M448 288H154c-58.76 0-106-49.33-106-108v-20" fill="none" stroke="currentColor" stroke-linecap="round"
              stroke-linejoin="round" stroke-width="32" />
          </svg>
        </button>
      </div>
      <div class="clear">
        <button class="clear-btn">
          <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512">
            <title>Close Circle</title>
            <path d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z" fill="none"
              stroke="currentColor" stroke-miterlimit="10" stroke-width="32" />
            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"
              d="M320 320L192 192M192 320l128-128" />
          </svg>
        </button>
      </div>
    </div>
      <div class="selections-group">
      <div class="selection-tabs">
        <span>no selections applied</span>
      </div>
    </div>     
        `
      el.innerHTML = html
    }    
    this.options.app.createSessionObject(this.options.def)
      .then(model => {
        model.on('changed', this.render.bind(this))
        this.options.model = model
        this.render()
      })
  }
  render () {
    const el = document.getElementById(this.elementId)
    this.options.model.getLayout()
      .then(layout => {
        console.log(layout)
        let html = layout.qSelectionObject.qSelections.map(res => 
          `<h5>${res.qField}</h5>
          <h6>${res.qSelected}</h6>
          `)
        el.innerHTML += html
      })
  }
  handleClick (event) {  
    if (event.target.classList.contains('explore-btn')) {
      this.render()
    } 
  }
}


const session = enigma.create({
  schema, 
  url: 'wss://ec2-3-86-99-193.compute-1.amazonaws.com/app/d077bbca-1fa2-4564-83d5-88f801899a5c'
})

session.open().then(global => {
  console.log(global)
  global.openDoc('d077bbca-1fa2-4564-83d5-88f801899a5c').then(app => {
    console.log(app)
    const selectionBar = new SelectionBar('websySelectionBar', {app})
  })
})
