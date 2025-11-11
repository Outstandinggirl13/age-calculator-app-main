# Frontend Mentor - Age calculator app solution

This is a solution to the [Age calculator app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/age-calculator-app-dF9DFFpj-Q). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View an age in years, months, and days after submitting a valid date through the form
- Receive validation errors if:
  - Any field is empty when the form is submitted
  - The day number is not between 1-31
  - The month number is not between 1-12
  - The year is in the future
  - The date is invalid e.g. 31/04/1991 (there are 30 days in April)
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page
- **Bonus**: See the age numbers animate to their final number when the form is submitted

### Screenshot

![](/assets/images/screenshot.png)
![](/assets/images/screenshot2.png)

### Links

- Solution URL: [Age Calculator App – Vanilla JS & Responsive Design](https://www.frontendmentor.io/solutions/age-calculator-app-vanilla-js-and-responsive-design-b3_xYz7NCl)
- Live Site URL: [GitHub Pages](https://outstandinggirl13.github.io/age-calculator-app-main/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow

### What I learned

1. Using CSS Grid for Layout

I applied a grid to the body to position the main section and footer. This made it easy to create a layout where the main content stretches to fill the page while the footer stays at the bottom:

```CSS
body {
    display: grid;
    grid-template-rows: 1fr auto;
}
```

2. Positioning a Divider Behind the Button

To create a line behind the submit button, I used `position: absolute` on the line and `position: relative` on the parent. I also calculated its position dynamically using a CSS variable `(var(--btn))` with `clamp()` to make it responsive:

```CSS
.form {
    position: relative;
}

.form__divider {
    background-color: var(--grey-100);
    height: 1px;
    width: 100%;
    position: absolute;
    bottom: calc( (var(--btn) / 2));
    z-index: 0;
}
```

3. Styling Focused Inputs

I styled input fields so that when focused, the border turns purple and the outline is removed:

```CSS
.form__input:focus {
    border: 1px solid var(--purple-500);
    background-color: none;
    outline: none;
}
```

4. Preventing Autofill Background Color

Browsers often change the background to blue when autofilling inputs. I overrode this using `-webkit-box-shadow` and `-webkit-text-fill-color` to maintain consistent styling:

```CSS
.form__input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px white inset !important;
    -webkit-text-fill-color: black !important;
}
```

5. Styling SVG Inside Buttons

When styling an SVG inside a button, I had to account for default browser styles. By wrapping the SVG with padding, background color, border-radius, and relative positioning, I could preserve the intended design:

```CSS
.form__btn-icon {
    background-color: var(--purple-500);
    border-radius: 50%;
    padding: clamp(1.125rem, 0.8361rem + 1.2327vw, 1.625rem);
    width: var(--btn);
    height: var(--btn);
    position: relative;
    z-index: 1;
}
```

## Author

- Website - [Outstandinggirl13](https://github.com/Outstandinggirl13)
- Frontend Mentor - [@Outstandinggirl13](https://www.frontendmentor.io/profile/Outstandinggirl13)