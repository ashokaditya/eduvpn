var appModule = (function () {
  return {
    drop: function () { return $(".ui.dropdown").dropdown()},
    sticky: function () { return $(".ui.sticky")
      .sticky({
        offset       : 50,
        bottomOffset : 50,
        context      : '#doc',
        pushing      : true
      })
    ;},
    showPanel: function (param, ...rest) {
      let panels = ['.config','.new','.doc','.acc']
      panels.splice(panels.indexOf('.' + param), 1)
      let clss = panels.map((e)=>{ return e.replace('.','.pan-') }).join()
      $(clss).addClass('hide')
      $(".pan-" + param).removeClass('hide')
      $(panels.join()).removeClass('active')
      $('.item.' + param).addClass('active')
    },
    progress: function(param, val, tlabel) {
      let bar = new ProgressBar.Circle(param, {
        color: '#aaa',
        strokeWidth: 6,
        trailWidth: 1,
        easing: 'easeInOut',
        duration: 1400,
        text: {
          autoStyleContainer: false
        },
        from: { color: '#42A5F5', width: 6 },
        to: { color: '#ef5350', width: 1 },
        // Set default step function for all animate calls
        step: function(state, circle) {
          circle.path.setAttribute('stroke', state.color)
          circle.path.setAttribute('stroke-width', state.width)
          let value = Math.round(circle.value() * 100)
          circle.setText('time lapsed')
          if (value === 0) {
            circle.setText('')
          } else {
            circle.setText('<div class="proglabel" data-tooltip="time left" data-position="top center" data-variation="mini">'+ (100 - value) + ' ' + tlabel + '</div>')
          }
          circle.text.style.color = state.color;
        }
      })
      bar.text.style.fontSize = '1em'
      bar.animate(val)
    }
  };
})();


$(document).ready(function(){
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

$(window).resize(function(){
  let panels = ['.config','.new','.doc','.acc']
  let clss = panels.map((e)=>{ return e.replace('.','.pan-') }).join()
  $(clss).removeClass('hide')

  $(panels.join()).removeClass('active')
  $('.item.config').addClass('active')
})
