# Multi step form

Let's build a multi-step form that works without js.
Something that looks like this:
![image](https://github.com/PolyDevil/no-js-multi-step-form/assets/25101758/3cec116e-da9a-49ab-82fb-af98d25f994c)

There are 3 steps, each step can contain one or more fields (not important).
First step points towards the second step, the second step allows to go to the first step or to the next (also last) step.
The third step will allow to go to previous step or to submit the form.

Something to keep in mind:
Whole component consist of 2 parts - **scrollable part** (let's call it a `view`) and a **static part** (let's call it `nav`).
The blue area represents the `view` and the white area represents the `nav`:
![image](https://github.com/PolyDevil/no-js-multi-step-form/assets/25101758/463eb433-c2a8-4752-ac83-6aa77dedc58d)

## Anatomy of step component
And each step consists of:
 - title
 - fields
 - actions (links or buttons in the `nav`)
 
![image](https://github.com/PolyDevil/no-js-multi-step-form/assets/25101758/58ec592e-dbf3-4401-8733-ae4c2426d732)

 `Title` and `fields` should be rendered in the scrollable part, while `actions` should be rendered in `nav`.
Seems easy enough.

The markup I came up with is simple:
```
<article>
    <h2>Title</h2>

    <fieldset>
        <legend>Field 1</legend>
        <label>
            <span>Option 1</span>
            <input type="radio" name="service" value="1" />
        </label>
        <label>
            <span>Option 2</span>
            <input type="radio" name="service" value="2" />
        </label>
    </fieldset>

    <a>prev</a>
    <a>next</a>
</article>
```

## Anatomy of multi-step form component
And the whole form would be:
```
<form>
    <ol>
        <li>
            <article>...</article>
        </li>

        <li>
            <article>...</article>
        </li>

        <li>
            <article>...</article>
        </li>
    </ol>
</form>
```

## Implementation
We have one `form`, which is an ordered list with 3 elements.
Each element is a step.
If you look at the markup you may ask - but how we will be able to make `actions` (aka links or buttons) to be rendered staticly, so they won't be scrolled with the main content.
Lets try to solve that problem.

We dont need to start with article components, lets start with basic markup:
```
<form>
    <ol></ol>
</form>
```

We will make `form` a grid element - it contains 2 rows, the first one would take all the available space, while the second one will have height of 3em.
```
form {
    block-size: 100%;
    overflow: hidden;
    display: grid;
    grid-template-rows: minmax(0, 1fr) 2rem;
}
```

Since `ol` is the only child of `form`, it will take the first row slot. But we can still hard-code its boundaries:
```
ol {
    grid-column: 1/-1;
    grid-row: 1/2;
    list-style: none;
    padding: 0;
    margin: 0;
    background-color: rgba(0, 0, 255, 0.5);
}
```


Lets highlight our second slot:
```
form::before {
    content: "";
    grid-column: 1/-1;
    grid-row: 2/3;
    background-color: rgba(0, 0, 0, 0.2);
}
```

So we got ourselves a pretty masic layout:
![localhost_5173_step1_ (1)](https://github.com/PolyDevil/no-js-multi-step-form/assets/25101758/50d2bd60-348e-4c75-a00f-e921796115e9)

## Make it slide
Lets move to the next stage - we need to render all 3 steps.

We update our markup to:
```
<ol>
    <li>
        <article>
            <h2>Step 1</h2>

            <fieldset>
                <legend>Select a service</legend>
                <label>
                    <span>Option 1</span>
                    <input type="radio" name="service" value="1" />
                </label>
                <label>
                    <span>Option 2</span>
                    <input type="radio" name="service" value="2" />
                </label>
            </fieldset>

            <a>next</a>
        </article>
    </li>

    <li>
        <article>
            <h2>Step 2</h2>

            <fieldset>
                <legend>Select preferences</legend>
                <label>
                    <span>Pref 1</span>
                    <input type="checkbox" name="pref1" />
                </label>
                <label>
                    <span>Pref 2</span>
                    <input type="checkbox" name="pref2" />
                </label>
            </fieldset>

            <a>prev</a>
            <a>next</a>
        </article>
    </li>

    <li>
        <article>
            <h2>Step 3</h2>

            <fieldset>
                <legend>Contact information</legend>
                <label>
                    <span>Name</span>
                    <input type="text" name="name" />
                </label>
                <label>
                    <span>Email</span>
                    <input type="email" name="email" />
                </label>
            </fieldset>

            <a>prev</a>
        </article>
    </li>
</ol>
```

So now it looks like this:
![localhost_5173_step2_](https://github.com/PolyDevil/no-js-multi-step-form/assets/25101758/ff753e65-ab95-42b4-9502-7f62a65c9e3d)

The problem is - since `ol` is a grid element, it renders one child under another, but we want them to align with `x-axis`, not `y`.
We also want to remove scrollbar (so users wont be able to scroll between steps), and we want each step to take 100% width of a parent (`ol`).
We can do this by adding those styles to `ol`:
```
ol {
    /* ... */
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 100%;
    max-inline-size: 100%;
    block-size: 100%;
    overflow: hidden;
}
```

![localhost_5173_step3_](https://github.com/PolyDevil/no-js-multi-step-form/assets/25101758/8961cb5b-d5d2-4f4a-b0ed-0bc2ecb753c4)

## Navigation between steps
So our steps are rendered one after another, just like we wanted. But we need some way to navigate between them
And since we aim to do this without js, our options are limited.
Likely, `a` tag can help us to achieve that. It is called an [`anchor`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a), and `href` means `http reference`. We can use what is called `anchor link`, sounds kinds confusing, since `a` is already an anchor.
Anyway, `anchor link` is a link that points to the element on the same page via its `id`. So if there is an element with `id`, for example `<h1 id="payment">Payment</h2>`, than `<a href="#payment">` will actually point to that element and after click the page will be scrolled so our `<h1>` will be visible.

Lets create some id's and pass them:
```
<form>
    <ol>
        <li>
            <article>
                <h2 id="step1">Step 1</h2>

                <fieldset>...</fieldset>

                <a href="#step2">next</a>
            </article>
        </li>

        <li>
            <article>
                <h2 id="step2">Step 2</h2>

                <fieldset>...</fieldset>

                <a href="#step1">prev</a>
                <a href="#step3">next</a>
            </article>
        </li>

        <li>
            <article>
                <h2 id="step3">Step 3</h2>

                <fieldset>...</fieldset>

                <a href="#step2">prev</a>
            </article>
        </li>
    </ol>
</form>
```

## Scroll animation
It works, but there is no scroll animation.
[`scrollIntoView`](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView) actually is much better.
Luckyly, we can achieve the same results via css:
```
ol {
    ...
    scroll-behavior: smooth;
}
```

Okay, cool. Now we are getting somewhere.

## Render context
Now we need to render our `actions` inside that gray area, but how do we do that?

What if we add update the `form` with:
```
form {
    ...
    position: relative;
}
```

and change our links to:
```
a {
    position: absolute;
    inset: 0;
    background: #8100ff;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1ch;
    text-decoration: none;
    font-size: 1em;
}
```

Oh no, now our link took whole page:
![localhost_5173_step5_](https://github.com/PolyDevil/no-js-multi-step-form/assets/25101758/e35585d4-0bcf-4e35-aebc-531d050ffcb7)

But we can assign it to a grid cell. Since `form` is a grid, we can add:
```
a {
    ...
    grid-row: 2/3;
    grid-column: 1/-1;
}
```

A little bit better, scroll animation works, links are rendered outside `view`, links are static, but they overlap with each other:
![localhost_5173_step6_](https://github.com/PolyDevil/no-js-multi-step-form/assets/25101758/895574c5-423c-4f8c-9441-4c4534b318a6)

Lets make a room for 2 button, so since they are grid-elements of `form`, we need to add columns to form:
```
form {
    grid-template: minmax(0, 1fr) 3em / repeat(2, minmax(0, 1fr));
}
```

We use the short syntax that combines rows and columns declarations, but it is the same as:
```
form {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-template-rows: minmax(0, 1fr) 3em;
}
```

Now we need to assign links to the right cells.
So on the first step - there is only one `next action`, and it should be `grid-column: 2/3;`, last step also has only one link and it is a `prev action`, so it should be `grid-column: 1/2;`, and in any other case - first link should take the first cell, while the last link takes the second cell.
It is kinda tricky, but i guess we can go with something like this:
```
/* if there is only one link or if there are more than one - take the first column */
ol li a:only-of-type,
ol li a:not(:only-of-type):nth-of-type(1) {
    grid-column: 1/2;
    grid-row: 2/3;
}

/* second link will take the second column */
ol li a:nth-of-type(2) {
    grid-column: 2/3;
    grid-row: 2/3;
}
```

But still, it renders all links in the `nav`, and we want actions only from the current step.
Well, turns out there is a [`:target`](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_selectors/Using_the_:target_pseudo-class_in_selectors) pseudoselector that allows us to add some conditional rendering.

Lets try to render actions only from current step. We will use [`:has()`](https://developer.mozilla.org/en-US/docs/Web/CSS/:has) selector, which doesnt work in mozilla firefox yet, but overall browser support is good:
```
/* if some step is active and it is not the first step - hide first step */
ol:has(li:not(:first-of-type) h2::target) li:first-of-type a {
    display: none;
}

/* render first step links if the first step is active or if there are no active steps, aka initial state */
ol:not(:has(h2:target)) li:first-of-type a,
ol:has(li:first-of-type h2:target) li:first-of-type a {
    display: flex;
    grid-row: 2/3;
    grid-column: 2/3;
}

/* hide links from non-active step */
h2:not(:target) ~ a {
    display: none;
}

/* show links from active step */
h2:target ~ a {
    display: flex;
}

/* if there is only one link or if there are more than one - take the first column */
ol li a:only-of-type,
ol li a:not(:only-of-type):nth-of-type(1) {
    grid-row: 2/3;
    grid-column: 1/2;
}

/* second link will take the second column */
ol li a:nth-of-type(2) {
    grid-row: 2/3;
    grid-column: 2/3;
}
```
![localhost_5173_step7_](https://github.com/PolyDevil/no-js-multi-step-form/assets/25101758/2b3bf0e1-d608-4059-85cf-a10da0ef359d)

No it works, we have smooth animations, links are static and conditionally rendered.
But there is no animation for links, since we hide them via `display: none`;

Lets change `display: none` to `opacity: 0; pointer-events: none;` and `display: flex` to `opacity: 1; pointer-events: auto;`
Probably there is some better way to do that and make the link more accessible, but it will do for now:

```
a {
    /* ... */
    transition: opacity 0.314s ease-in;
}

ol:has(li:not(:first-of-type) h2::target) li:first-of-type a {
    opacity: 0;
    pointer-events: none;
}

ol:not(:has(h2:target)) li:first-of-type a,
ol:has(li:first-of-type h2:target) li:first-of-type a {
    opacity: 1;
    pointer-events: auto;
    grid-row: 2/3;
    grid-column: 2/3;
}

h2:not(:target) ~ a {
    opacity: 0;
    pointer-events: none;
}

h2:target ~ a {
    opacity: 1;
    pointer-events: auto;
}
```

You can animate it however you want, it is entirely up to you.

## Nav size

There is one more trick.
We defined grid with 2 rows - `minmax(0, 1fr)` and `3em`.
So what if we want to change the `nav's` font-size?
Well, the trick is to create 2 custom css properties - `nav-font-size` and `nav-block-gap`, and use it for our grid:
```
form {
    --_nav-font-size: 2em;
    --_block-gap: 2em;
    grid-template: minmax(0, 1fr) calc(var(--_nav-font-size) + 2 * var(--_block-gap)) / repeat(2, minmax(0, 1fr));
}

a {
    font-size: var(--_nav-font-size);
}
```

This will effectively allow us to calculate the height of `nav` by font-size, padding-top and padding-bottom.

## Results
So what we have learned:
 - anchor links allow us to scroll to element without js
 - css has [smooth scrolling](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-behavior)
 - elements can be rendered outside of parent via nont-static position and behave like a grid-items
 - [`:target`](https://developer.mozilla.org/en-US/docs/Web/CSS/:target) allows us to conditionally apply styles
 - [`:has()`](https://developer.mozilla.org/en-US/docs/Web/CSS/:has) allows us to conditionall apply styles

The combination of those features allowed us to build multi-step form that works without js.

## Demo
[Full demo - polydevil.github.io/no-js-multi-step-form](https://polydevil.github.io/no-js-multi-step-form/)
[Code - github.com/PolyDevil/no-js-multi-step-form](https://github.com/PolyDevil/no-js-multi-step-form/blob/main/src/routes/index.tsx)
