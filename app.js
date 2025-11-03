const form = document.querySelector('.form');
const inputs = form.querySelectorAll('.form__input');
const labels = form.querySelectorAll('.form__label');
const errorsRequired = document.querySelectorAll('.form__required-err');
const errorsValid = document.querySelectorAll('.form__required-err');


form.addEventListener('submit', e => {
  let hasError = false;

  inputs.forEach((input, index) => {
    if (input.value.trim() === '') {
      hasError = true;
      errorsRequired[index].style.display = 'block';
      input.style.borderColor = 'var(--red-400)';
      labels[index].style.color = 'var(--red-400)';
    } else {
      errorsRequired[index].style.display = 'none';
      input.style.borderColor = 'var(--grey-500)';
      labels[index].style.color = 'var(--grey-500)';
    }
  });

  if (hasError) e.preventDefault();
});

inputs.forEach(input => {
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        e.preventDefault(); // prevent form from submitting
  
        // find the next empty input
        const nextEmpty = Array.from(inputs).find(inp => inp.value.trim() === '');
  
        if (nextEmpty) {
          nextEmpty.focus(); // jump to first empty input
        } else {
          form.requestSubmit(); // all filled -> submit the form
        }
      }
    });
  });