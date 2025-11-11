const form = document.querySelector('.form');
const inputs = form.querySelectorAll('.form__input');
const labels = form.querySelectorAll('.form__label');

const errorsRequired = document.querySelectorAll('.form__required-err');
const errorsValid = document.querySelectorAll('.form__valid-err');
const errorsTime = document.querySelectorAll('.form__time-err');

const yearsNum = document.querySelector('.date__years-num');
const monthsNum = document.querySelector('.date__months-num');
const daysNum = document.querySelector('.date__days-num');

const errValidDays = document.querySelector('.form__valid-day-err');
const errValidMonths = document.querySelector('.form__valid-month-err');
const errValidYears = document.querySelector('.form__valid-year-err');
const errFutureDay = document.querySelector('.form__future-day-err');
const errFutureMonth = document.querySelector('.form__future-month-err');
const errFutureYear = document.querySelector('.form__future-year-err');

const dateGroupElement = document.querySelectorAll('.date__group');
const dateYearsElement = document.querySelector('.date__years');
const dateMonthsElement = document.querySelector('.date__months');
const dateDaysElement = document.querySelector('.date__days');

/* ===========================
       HELPER FUNCTIONS
   =========================== */

function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function toDefaultValues() {
  yearsNum.textContent = "- -";
  monthsNum.textContent = "- -";
  daysNum.textContent = "- -";
}

function showError(errElement, input, label, color = 'var(--red-400)') {
  errElement.style.display = 'block';
  input.style.borderColor = color;
  label.style.color = color;
}

function hideError(errElement, input, label, color = 'var(--grey-500)') {
  errElement.style.display = 'none';
  input.style.borderColor = color;
  label.style.color = color;
}

function hideBlock(errElement) {
  errElement.style.display = 'none';
}

function clearErrors(errors) { 
  errors.forEach(err => err.style.display = 'none'); 
}

/* ===========================
       EVENT LISTENERS
   =========================== */

inputs.forEach(input => { // switch to empty field
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


form.addEventListener('submit', e => {

    e.preventDefault();
    clearErrors(errorsValid);
    clearErrors(errorsTime);

    let hasRequiredError = false;

    inputs.forEach((input, index) => { // validate input fields
      if (input.value.trim() === '') {

        hasRequiredError = true;
        showError(errorsRequired[index], input, labels[index]);
      } else {
        hideError(errorsRequired[index], input, labels[index]);
      }
    });

    if (hasRequiredError) {
      toDefaultValues();
      return; // <-- exit the submit handler early
    }
  
    // extract user inputs
    const day = document.querySelector('#day-input').value.trim();
    const month = document.querySelector('#month-input').value.trim();
    const year = document.querySelector('#year-input').value.trim();
  
    const birthDate = new Date(year, month - 1, day);
    const currentDate = new Date();
    const birthThisYear = new Date(currentDate.getFullYear(), month - 1, day);

    let ageYears, ageMonths, ageDays;
    const daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    let hasValidError = false;

    inputs.forEach((input, index) => { // validate input fields 
      if (!/^\d+$/.test(input.value.trim())) {
        hasValidError = true;
        showError(errorsValid[index], input, labels[index]);
      } else {
        hideError(errorsValid[index], input, labels[index]);
      }
    }); 
    
    if (hasValidError) {
      toDefaultValues();
      return; // <-- exit the submit handler early
    }

    if (currentDate.getFullYear() < year) { // prevent invalid year input
      hasValidError = true;
      showError(errFutureYear, inputs[2], labels[2]);
    } else {
      hideBlock(errFutureYear);
    }

    if (currentDate.getMonth() < month-1 && currentDate.getFullYear() == year) { // prevent invalid month input
      hasValidError = true;
      showError(errFutureMonth, inputs[1], labels[1]);
    } else {
      hideBlock(errFutureMonth);
    }

    if (currentDate.getDate() < day && currentDate.getMonth() == month-1 && currentDate.getFullYear() == year) { // prevent invalid day input
      hasValidError = true;
      showError(errFutureDay, inputs[0], labels[0]);
    } else {
      hideBlock(errFutureDay);
    }

    if (year < 100) { // prevent two digit year input
      hasValidError = true;
      showError(errValidYears, inputs[2], labels[2]);
    } else {
      hideBlock(errValidYears);
    }

    if (month > 12 || month < 1) { // prevent invalid month input
      hasValidError = true;
      showError(errValidMonths, inputs[1], labels[1]);
      hideBlock(errFutureMonth);
    } else {
      hideBlock(errValidMonths);
    }

    if (day > (daysInMonths[month - 1] || 31) && !isLeapYear(year) || day < 1) { // prevent invalid day input
      hasValidError = true;
      showError(errValidDays, inputs[0], labels[0]);
      hideBlock(errFutureDay);
    } else if (month === 2 && day > 29 && isLeapYear(year)) { // prevent invalid day input for leap year
      hasValidError = true;
      showError(errValidDays, inputs[0], labels[0]);
      hideBlock(errFutureDay);
    } else {
      hideBlock(errValidDays);
    }

    if (hasValidError) {
      toDefaultValues();
      return; // <-- exit the submit handler early
    }

    if (currentDate < birthThisYear) {  // birthday not yet occurred this year
        ageYears = currentDate.getFullYear() - birthDate.getFullYear() - 1;
        ageMonths = 12 + (currentDate.getMonth() - birthDate.getMonth()) - 1;
    } else { // birthday occurred this year
        ageYears = currentDate.getFullYear() - birthDate.getFullYear();
        if (currentDate.getDate() < birthDate.getDate()) {
            ageMonths = currentDate.getMonth() - birthDate.getMonth() - 1;
        } else {
            ageMonths = currentDate.getMonth() - birthDate.getMonth();
        }
    }
    
    if (currentDate.getDate() < birthDate.getDate()) { // day not yet occurred this month
        let previousMonthDays;
        if (isLeapYear(currentDate.getFullYear()) && currentDate.getMonth() === 2) { // current February in leap year
            previousMonthDays = 29;
        } else {
            previousMonthDays = daysInMonths[currentDate.getMonth()-1] || 31;
        }
        ageDays = previousMonthDays + currentDate.getDate() - birthDate.getDate();
    } else { // day occurred this month
        ageDays = currentDate.getDate() - birthDate.getDate();
    }

    yearsNum.textContent = ageYears;
    monthsNum.textContent = ageMonths;
    daysNum.textContent = ageDays;

    dateYearsElement.textContent = `year${ageYears !== 1 ? 's' : ''}`;
    dateMonthsElement.textContent = `month${ageMonths !== 1 ? 's' : ''}`;
    dateDaysElement.textContent = `day${ageDays !== 1 ? 's' : ''}`;

    if(hasValidError) {
      toDefaultValues();
    } else {
      dateGroupElement.forEach(group => {
        group.style.gap = '0.875rem';
      });
    }
    
});