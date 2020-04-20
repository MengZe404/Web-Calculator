(function () {
  'use strict'
  var mode = 'standard'
  var input = document.querySelector('.calculator-input')
  var output = document.querySelector('.calculator-result')
  input.value = ''
  output.value = ''
  var parser = math.parser()
  var x = ''
  var result = ''
  var func = ''
  var modals = {
    about: new BulmaModal('#calculator-modal-about'),
    tutorial: new BulmaModal('#calculator-modal-tutorial'),
    warnClearOutput: new BulmaModal('#calculator-modal-warndeleteoutput'),
    warnRestoreHistory: new BulmaModal('#calculator-modal-warnrestorehistory'),
    wrongMode: new BulmaModal('#calculator-modal-wrongMode'),
    wrongFormat: new BulmaModal('#calculator-modal-wrongFormat')
  }

  $('#calculator-buttons-calculate').click(function () {
    console.log('clicked')
    $('.calculator-input').trigger($.Event( 'keydown', {
      which: 13,
      keyCode: 13
    }))
  })

  input.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      $('#calculator-buttons-calculate').addClass('is-loading')
      $('#calculator-buttons-restorehistory').prop('disabled', true)
      $('#calculator-buttons-clearoutput').prop('disabled', true)
      switch (mode) {
        case 'standard':
        case 'calculus':
          if(input.value.includes('f(x)') || func.includes('g(x)') || func.includes('h(x)') ){
            $('#calculator-buttons-calculate').removeClass('is-loading')
            input.value = ''
            // Nam, change this to modal window please
            modals.wrongMode.show()
          } else {
            calculate(input.value)
            history()
          }
          break
        case 'algebra':
          // No need to care about this shit. 
          // Just for preventing stupid errors made by our stupid users.
          if(func == '') {
            func = input.value
            if(func.includes('f(x)') || func.includes('g(x)') || func.includes('h(x)') ){
              output.value += ('Function:  ' + func + '\n')
              input.value = 'x = '
            } else {
              $('#calculator-buttons-calculate').removeClass('is-loading')
              // Replace this shit with a modal window please
                modals.wrongFormat.show()
                func = ''
                input.value = ''
            }
          } else{
              x = parser.evaluate(input.value)
              output.value += ('x =  ' + x + '\n')
              calculate(func)
              history()
              }
          break
      }
    }
  })

  function calculate(inputtedText) {
    let expression = inputtedText

    // Nature Typing Identifier

    let letters = /^[A-Za-z]+$/

    let userOperator = ''

    let operator = []

    let array = expression.split(' ')

    let position = 0

    let funcOp = ''

    for(let i = 0; i < array.length; i++) {
      if(array[i].match(letters)) {
          userOperator = array[i]
          switch(userOperator) {
            case 'plus':
            case 'add':
              operator.push('+')
              array.splice(i, 1, operator[position])
              position++
              break
            case 'minus':
            case 'subtract':
              operator.push('-')
              array.splice(i, 1, operator[position])
              position++
              break
            case 'times':
            case 'multiply':
              operator.push('*')
              array.splice(i, 1, operator[position])
              position++
              break
            case 'divide':
            case 'over':
              operator.push('/')
              array.splice(i, 1, operator[position])
              position++
              break
            case 'power':
            case 'caret':
            case 'to the power of':
              operator.push('^')
              array.splice(i, 1, operator[position])
              position++
              break
            case 'percent':
              operator.push('%')
              array.splice(i, 1, operator[position])
              position++
              break
            default:
              operator.push()
              array.splice(i, 1, operator[position])
              position++
              break
        }
      }
    }

    // Function identifier (e.g f(x), g(x)).
    let userFunc = array[0]

    switch(userFunc) {
      case 'f(x)':
          funcOp = 'f('
          break
      case 'g(x)':
          funcOp = 'g('
          break
      case 'h(x)':
          funcOp = 'h('
          break
    }

    expression = (array.join(' '))
    // Use different mathemtical methods for each mode
    try {
      switch (mode) {
        case 'standard':
          input.value = ''
          result = math.compile(expression).evaluate()
          output.value += ('Input:  ' + expression + '\n' + result + '\n' + '\n')
          break
        case 'algebra':
          // Hey! This is  what i have been working on for 2 hours!!!!! :( 
          input.value = 'x = '
          parser.evaluate(expression)
          result = parser.evaluate(funcOp + x + ')') // example: f(2) if x = 2.
          output.value += ( 'Result:  ' + result + '\n' + '\n')
          func = ''
          input.value = ''
          break
        case 'calculus':
          input.value = '' // Everytime the user click 'Enter', the value in <input> reset
          result = math.derivative(expression, 'x').toString()
          output.value += ('Input:  ' + expression + '\n' + result + '\n' + '\n') 
          break
      }
    } catch (err) {
      output.value += ('Input:  ' + expression + '\n' + '❌: '+err + '\n\n')
    }
    output.scrollTop = output.scrollHeight
    setTimeout(function () {
      $('#calculator-buttons-calculate').removeClass('is-loading')
      $('#calculator-buttons-restorehistory').prop('disabled', false)
      $('#calculator-buttons-clearoutput').prop('disabled', false)
    }, 100)

    if(result == undefined) result = "no answer"
  }


  $('#calculator-type-select').change(function () {
    switch (this.value) {
      case 'standard':
        $('#calculator-type-select-icons').removeClass('fa-percentage fa-square-root-alt')
        $('#calculator-type-select-icons').addClass('fa-plus')
        mode = 'standard'
        break
      case 'algebra':
        $('#calculator-type-select-icons').removeClass('fa-plus fa-square-root-alt')
        $('#calculator-type-select-icons').addClass('fa-percentage')
        mode = 'algebra'
        break
      case 'calculus':
        $('#calculator-type-select-icons').removeClass('fa-plus fa-percentage')
        $('#calculator-type-select-icons').addClass('fa-square-root-alt')
        mode = 'calculus'
        break
    }
    $('.calculator-input').val('')
  })
  // History of output
  if(localStorage.getItem("calHistory") != null) {
    let historyLength = localStorage.getItem("calHistory").length;
    if(historyLength > 100) localStorage.clear("calHistory");
  }

  function history() {
      localStorage.setItem("calHistory", output.value);
  }


  $('#calculator-type-tabs-standard').click(function () {
    $('#calculator-type-tabs-standard').addClass('is-active')
    $('#calculator-type-tabs-algebra').removeClass('is-active')
    $('#calculator-type-tabs-calculus').removeClass('is-active')
    mode = 'standard'
    $('.calculator-input').val('')
  })

  $('#calculator-type-tabs-algebra').click(function () {
    $('#calculator-type-tabs-standard').removeClass('is-active')
    $('#calculator-type-tabs-algebra').addClass('is-active')
    $('#calculator-type-tabs-calculus').removeClass('is-active')
    mode = 'algebra'
    $('.calculator-input').val('')
  })

  $('#calculator-type-tabs-calculus').click(function () {
    $('#calculator-type-tabs-standard').removeClass('is-active')
    $('#calculator-type-tabs-algebra').removeClass('is-active')
    $('#calculator-type-tabs-calculus').addClass('is-active')
    mode = 'calculus'
    $('.calculator-input').val('')
  })

  $('calculator-buttons-restorehistory').click(function () {
    modals.warnRestoreHistory.show()
  })

  $('#calculator-buttons-clearoutput').click(function () {
    modals.warnClearOutput.show()
  })

  $('#calculator-buttons-restorehistory').click(function () {
    modals.warnRestoreHistory.show()
  })

  $('#calculator-modal-warnrestorehistory-button-yes').click(function () {
    if(localStorage.getItem("calHistory") != '') {
       output.value = "History:  \n" + localStorage.getItem("calHistory") + '--------------- \n';
    } else {
      output.value = ''
      output.setAttribute('placeholder', 'No history')
    }
    localStorage.setItem('calHistory', '')
    modals.warnRestoreHistory.close()
  })

  $('#calculator-modal-warnrestorehistory-button-cancel').click(function () {
    modals.warnRestoreHistory.close()
  })

  $('#calculator-modal-warndeleteoutput-button-delete').click(function () {
    $('.calculator-result').val('')
    modals.warnClearOutput.close()
  })

  $('#calculator-modal-warndeleteoutput-button-cancel').click(function () {
    modals.warnClearOutput.close()
  })

  $('#calculator-buttons-about').click(function () {
    modals.about.show()
  })

  $('#calculator-buttons-tutorial').click(function () {
    modals.tutorial.show()
  })

  $('#calculator-modal-aboutClose').click(function() {
    modals.about.close()
  })

  $('#calculator-modal-tutorialClose').click(function() {
    modals.tutorial.close()
  })
  $('#calculator-modal-wrongMode-ok').click(function () {
    modals.wrongMode.close()
  })
  $('#calculator-modal-wrongFormat-ok').click(function () {
    modals.wrongFormat.close()
  })
})()