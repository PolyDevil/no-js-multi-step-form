import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import "./styles.module.css";

export default component$(() => {
  return (
    <>
      <h1>Multistep form</h1>

      <main>
        <form>
          <ul>
            <li>
              <article>
                <h2 id="step1">What kind on Services do you need?</h2>

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
                  <label>
                    <span>Option 3</span>
                    <input type="radio" name="service" value="3" />
                  </label>
                </fieldset>

                <a href="#step2">
                  {"next"}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    role="presentation"
                  >
                    <path
                      fill="currentColor"
                      d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                    ></path>
                  </svg>
                </a>
              </article>
            </li>

            <li>
              <article>
                <h2 id="step2">Your preferences</h2>

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
                  <label>
                    <span>Pref 3</span>
                    <input type="checkbox" name="pref3" />
                  </label>
                </fieldset>

                <a href="#step1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    role="presentation"
                  >
                    <path
                      fill="currentColor"
                      d="M7.82843 10.9999H20V12.9999H7.82843L13.1924 18.3638L11.7782 19.778L4 11.9999L11.7782 4.22168L13.1924 5.63589L7.82843 10.9999Z"
                    ></path>
                  </svg>
                  {"prev"}
                </a>
                <a href="#step3">
                  {"next"}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    role="presentation"
                  >
                    <path
                      fill="currentColor"
                      d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                    ></path>
                  </svg>
                </a>
              </article>
            </li>

            <li>
              <article>
                <h2 id="step3">Contact information</h2>

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

                <a href="#step2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    role="presentation"
                  >
                    <path
                      fill="currentColor"
                      d="M7.82843 10.9999H20V12.9999H7.82843L13.1924 18.3638L11.7782 19.778L4 11.9999L11.7782 4.22168L13.1924 5.63589L7.82843 10.9999Z"
                    ></path>
                  </svg>
                  {"prev"}
                </a>
              </article>
            </li>
          </ul>
        </form>
      </main>
    </>
  );
});

export const head: DocumentHead = {
  title: "Multi-step form without js",
  meta: [
    {
      name: "description",
      content: "madness",
    },
  ],
};
