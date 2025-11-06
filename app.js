const form = document.querySelector('.form');
const inputs = form.querySelectorAll('.form__input');
const labels = form.querySelectorAll('.form__label');

const errorsRequired = document.querySelectorAll('.form__required-err');

const yearsNum = document.querySelector('.date__years-num');
const monthsNum = document.querySelector('.date__months-num');
const daysNum = document.querySelector('.date__days-num');

const errors = document.querySelectorAll('.form__valid-err');
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

function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function toDefaultValues() {
  yearsNum.textContent = "--";
  monthsNum.textContent = "--";
  daysNum.textContent = "--";
}

function clearErrors() {
  errors.forEach(err => err.style.display = 'none');
}

form.addEventListener('submit', e => {

    e.preventDefault();
    let hasRequiredError = false;

    inputs.forEach((input, index) => { // validate input fields
      if (input.value.trim() === '') {
        hasRequiredError = true;
        clearErrors();
        errorsRequired[index].style.display = 'block';
        input.style.borderColor = 'var(--red-400)';
        labels[index].style.color = 'var(--red-400)';
      } else {
        errorsRequired[index].style.display = 'none';
        input.style.borderColor = 'var(--grey-500)';
        labels[index].style.color = 'var(--grey-500)';
      }
    });

    if (hasRequiredError) {
      return;
    }
  
    // extract user inputs
    const day = document.querySelector('#day-input').value.trim();
    const month = document.querySelector('#month-input').value.trim();
    const year = document.querySelector('#year-input').value.trim();
  
    const birthDate = new Date(year, month - 1, day);
    console.log(birthDate);
    const currentDate = new Date();
    const birthThisYear = new Date(currentDate.getFullYear(), month - 1, day);

    let ageYears, ageMonths, ageDays;
    const daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    let hasValidError = false;

    if (currentDate.getFullYear() < year) { // prevent invalid year input
      console.log('Your birth year has not yet occurred this year');
      errFutureYear.style.display = 'block';
      inputs[2].style.borderColor = 'var(--red-400)';
      labels[2].style.color = 'var(--red-400)';
      hasValidError = true;
    } else {
      errFutureYear.style.display = 'none';
    }

    if (currentDate.getMonth() < month-1 && currentDate.getFullYear() == year) { // prevent invalid month input
      console.log('Your birth month has not yet occurred this year');
      errFutureMonth.style.display = 'block';
      inputs[1].style.borderColor = 'var(--red-400)';
      labels[1].style.color = 'var(--red-400)';
      hasValidError = true;
    } else {
      errFutureMonth.style.display = 'none';
    }

    if (currentDate.getDate() < day && currentDate.getMonth() == month-1 && currentDate.getFullYear() == year) { // prevent invalid day input
      console.log('Your birth day has not yet occurred this year');
      errFutureDay.style.display = 'block';
      inputs[0].style.borderColor = 'var(--red-400)';
      labels[0].style.color = 'var(--red-400)';
      hasValidError = true;
    } else {
      errFutureDay.style.display = 'none';
    }

    if (year < 100) { // prevent two digit year input
      console.log("Invalid birth year!");
      errValidYears.style.display = 'block';
      inputs[2].style.borderColor = 'var(--red-400)';
      labels[2].style.color = 'var(--red-400)';
      errFutureYear.style.display = 'none';
      hasValidError = true;
    } else {
      errValidYears.style.display = 'none';
    }

    if (month > 12 || month < 1) { // prevent invalid month input
      console.log("Invalid birth month!");
      errValidMonths.style.display = 'block';
      inputs[1].style.borderColor = 'var(--red-400)';
      labels[1].style.color = 'var(--red-400)';
      errFutureMonth.style.display = 'none';
      hasValidError = true;
    } else {
      errValidMonths.style.display = 'none';
    }

    if (day > (daysInMonths[month - 1] || 31) && !isLeapYear(year) || day < 1) { // prevent invalid day input
      console.log(`Invalid birth day! Month ${month} has only ${daysInMonths[month - 1]} days.`);
      errValidDays.style.display = 'block';
      inputs[0].style.borderColor = 'var(--red-400)';
      labels[0].style.color = 'var(--red-400)';
      errFutureDay.style.display = 'none';
      hasValidError = true;
    } else if (month === 2 && day > 29 && isLeapYear(year)) { // prevent invalid day input for leap year
      console.log(`Invalid birth day! ${year} is a leap year, so February has only 29 days.`);
      errValidDays.style.display = 'block';
      inputs[0].style.borderColor = 'var(--red-400)';
      labels[0].style.color = 'var(--red-400)';
      errFutureDay.style.display = 'none';
      hasValidError = true;
    } else {
      errValidDays.style.display = 'none';
    }

    
    if (currentDate < birthThisYear) {  // birthday not yet occurred this year
        ageYears = currentDate.getFullYear() - birthDate.getFullYear() - 1;
        ageMonths = 12 + (currentDate.getMonth() - birthDate.getMonth()) - 1;
        console.log('Birthday not yet occurred this year');
    } else { // birthday occurred this year
        ageYears = currentDate.getFullYear() - birthDate.getFullYear();
        if (currentDate.getDate() < birthDate.getDate()) {
            ageMonths = currentDate.getMonth() - birthDate.getMonth() - 1;
        } else {
            ageMonths = currentDate.getMonth() - birthDate.getMonth();
        }
        console.log('Birthday occurred this year');
    }
    
    if (currentDate.getDate() < birthDate.getDate()) { // day not yet occurred this month
        let previousMonthDays;
        console.log('Day not yet occurred this month');
        if (isLeapYear(currentDate.getFullYear()) && currentDate.getMonth() === 2) { // current February in leap year
            previousMonthDays = 29;
            console.log('February in leap year');
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

    if (ageYears == 1) {
      dateYearsElement.textContent = "year";
    } else {
      dateYearsElement.textContent = "years";
    }

    if (ageMonths == 1) {
      dateMonthsElement.textContent = "month";
    } else {
      dateMonthsElement.textContent = "months";
    }

    if (ageDays == 1) {
      dateDaysElement.textContent = "day";
    } else {
      dateDaysElement.textContent = "days";
    }

    if(hasValidError) {
      toDefaultValues();
    } else {
      dateGroupElement.forEach(group => {
        group.style.gap = '0.875rem';
      });
    }

    console.log(`Day: ${day}, Month: ${month}, Year: ${year}`);
});

