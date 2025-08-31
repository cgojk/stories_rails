


import { useState } from "react";

export default function FormsContact() {
  const [submitted, setSubmitted] = useState(false);

  function signUp(formData) {
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const message = formData.get("message");

    console.log("Form submitted:", { firstName, lastName, email, message });

    // Set state so thank-you button shows
    setSubmitted(true);
  }

  return (
    <section className="wrapper_container_form">
      <div className="sm-container_form">
        <h2 className="form_title_story_singin">Signup Form</h2>
        <p className="small_subtitle">We’ll get back to you as soon as possible.</p>

        {submitted ? (
          <button className="button_submit thankyou-btn" disabled>
            Thank you for your enquiry!
          </button>
        ) : (
          <form action={signUp} method="post" noValidate>
            <label htmlFor="name">First Name:</label>
            <input
              id="name"
              type="text"
              name="firstName"
              placeholder="Carolina"
              defaultValue="Carolina"
              required
            />

            <label htmlFor="lastname">Last Name:</label>
            <input
              id="lastname"
              type="text"
              name="lastName"
              placeholder="Gonzalves"
              defaultValue="Gonzalves"
              required
            />

            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="joe@schmoe.com"
              defaultValue="joe@schmoe.com"
              required
            />

            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              placeholder="Write your message..."
              defaultValue="This is a description"
              required
            />

            <button className="button_submit" type="submit">
              Submit
            </button>
          </form>
        )}
      </div>
    </section>
  );
}