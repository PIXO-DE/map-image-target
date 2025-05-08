/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck

const configTargetsComponent = {
    schema: {
      targets: {type: 'array', default: ['']},
    },
    ensureImageTargetsConfigured() {
      if (this.configured || !this.configOk) {
        return
      }
      // console.log(`Scanning for targets: ${JSON.stringify(this.data.targets)}`)
      XR8.XrController.configure({imageTargets: this.data.targets})
      this.configured = true
    },
    init() {
      this.configured = false
      this.configOk = false
      this.el.sceneEl.addEventListener('realityready', () => {
        this.configOk = true
        this.ensureImageTargetsConfigured()
      })
    },
    update() {
      this.configured = false
      this.ensureImageTargetsConfigured()
    },
  }
  
  const panicComponent = {
    init() {
      const targets = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '01', '02', '03', '04', '05', '06', '07' ]
      const found = []
      let active
  
      const remainder = targets.length % 33
  
      let i = 0
      const updateImageTargets = () => {
        const notFound = targets.filter(target => !found.includes(target))
  
        if (i + 10 + remainder === targets.length) {
          notFound.splice(i, remainder)
        } else {
          notFound.splice(i, 10)
        }
  
        notFound.splice(10 - found.length)
  
        active = [...found, ...notFound]
  
        this.el.sceneEl.setAttribute('config-targets', `targets: ${active}`)
  
        if (i + remainder === targets.length) {
          i = 0
        } else {
          i += 10
        }
      }
  
      this.el.addEventListener('xrimagefound', ({detail}) => {
        found.push(detail.name)
      })
  
      this.el.addEventListener('xrimagelost', ({detail}) => {
        found.splice(found.indexOf(detail.name), 1)
      })
  
      // update active image targets every second
      setInterval(updateImageTargets, 1000)
    },
  }
  
  export {configTargetsComponent, panicComponent}