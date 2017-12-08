import * as appModule from 'utils'

$(document).ready(() => {
  appModule.sticky()
  appModule.drop()
  let i = 1
  let tlabel = 'months'
  while (i <= 7) {
    if (i > 4) {
      tlabel = 'days'
    }
    appModule.progress('.p-' + i ,.12 * i, tlabel)
    i ++
  }
})

$(window).resize( () => {
  let panels = ['.config','.new','.doc','.acc']
  let clss = panels.map((e)=>{ return e.replace('.','.pan-') }).join()
  $(clss).removeClass('hide')

  $(panels.join()).removeClass('active')
  $('.item.config').addClass('active')
})
