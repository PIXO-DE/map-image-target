/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck

const playVideoComponent = {
    schema: {
      video: {type: 'string'},  // Path atau selector untuk video (opsional)
      audio: {type: 'string'},  // Path atau selector untuk audio (opsional)
      thumb: {type: 'string'},  // Path atau selector untuk thumbnail (opsional)
      canstop: {type: 'bool'},  // Apakah media bisa dihentikan
    },
    init() {
      const v = this.data.video && document.querySelector(this.data.video)  // Elemen video (jika ada)
      const a = this.data.audio && document.querySelector(this.data.audio)  // Elemen audio (jika ada)
      const p = this.data.thumb && document.querySelector(this.data.thumb)  // Elemen thumbnail (jika ada)
  
      const {el} = this
      el.setAttribute('material', 'src', p || v)  // Menetapkan thumbnail atau video sebagai material
      el.setAttribute('class', 'cantap')
  
      let playing = false
  
      // Fungsi untuk memutar audio (jika ada)
      const playAudio = () => {
        if (a && !a.paused) return  // Jika audio sudah diputar, tidak perlu memutar lagi
        if (a) {
          a.play().catch((error) => {
            console.error('Error playing audio:', error)
          })
        }
      }
  
      // Fungsi untuk memutar video (jika ada)
      const playVideo = () => {
        if (v && !v.paused) return  // Jika video sudah diputar, tidak perlu memutar lagi
        if (v) {
          v.muted = false  // Unmute video (opsional, sesuaikan dengan kebutuhan)
          v.play().catch((error) => {
            console.error('Error playing video:', error)
          })
        }
      }
  
      // Fungsi untuk menghentikan media (jika ada)
      const pauseMedia = () => {
        if (this.data.canstop) {
          if (a) a.pause()
          if (v) v.pause()
          playing = false
        }
      }
  
      // Event listener untuk xrimagefound
      const showImage = () => {
        // Hentikan semua media yang sedang diputar sebelum memutar media baru
        pauseMedia()
  
        // Jangan memutar media secara otomatis saat gambar ditemukan
        // if (v) playVideo()
        // if (a) playAudio()
        playing = false
      }
  
      // Event listener untuk xrimagelost
      const hideImage = () => {
        pauseMedia()  // Menghentikan media saat gambar hilang
      }
  
      // Menambahkan event listener untuk xrimagefound dan xrimagelost
      this.el.sceneEl.addEventListener('xrimagefound', showImage)
      this.el.sceneEl.addEventListener('xrimagelost', hideImage)
  
      // Tetap mempertahankan fungsi klik untuk kontrol manual pada elemen
      el.addEventListener('click', () => {
        if (!playing) {
          if (v) {
            el.setAttribute('material', {
              src: v,
              shader: 'chromakey',
              color: '0.008 0.882 0',  // Warna untuk chroma key
            })
            playVideo()
          }
          playAudio()
          playing = true
        } else if (this.data.canstop) {
          pauseMedia()
          playing = false
        }
      })
    },
  }
  
  export {playVideoComponent}
  