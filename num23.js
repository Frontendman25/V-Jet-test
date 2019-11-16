document.addEventListener('DOMContentLoaded', function() {
  const input = document.querySelector('.input')
  const setBtn = document.querySelector('.set')
  const clearBtn = document.querySelector('.clear')
  let isDisabled = true

  setBtn.disabled = isDisabled

  const changeDisabledSetBtn = e => {
    if (e.target.value.length < 1) {
      isDisabled = true
      setBtn.disabled = isDisabled
    } else {
      isDisabled = false
      setBtn.disabled = isDisabled
    }
  }

  const setNum23 = () => {
    const value = input.value
    const isValidValue = value.length > 0 && !isNaN(value)

    if (isValidValue) {
      localStorage.setItem('num23', value)
      isValid = true
    }
  }

  const deleteNum23 = () => {
    input.value = ''
    localStorage.removeItem('num23')
  }

  input.addEventListener('input', changeDisabledSetBtn)
  setBtn.addEventListener('click', setNum23)
  clearBtn.addEventListener('click', deleteNum23)

  const mountParagraphWithValue = () => {
    const num23 = localStorage.getItem('num23')
    if (num23) {
      const p = document.createElement('p')
      p.style.fontWeight = 'bold'

      if (num23 % 2 === 0) {
        p.style.color = 'green'
      } else {
        p.style.color = 'red'
      }

      p.innerText = num23
      input.before(p)
    }
  }

  mountParagraphWithValue()
})
