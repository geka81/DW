import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import "../../styles/contact.css";

export const ContactUs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_tvyo6pm', 'template_8l3jnbh', form.current, 'UYgOCN_AlLIKAoyTE')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
      e.target.reset()
  };

  return (
    <div class="contact-form">
    <form ref={form} onSubmit={sendEmail}>
      <br/>
      <label>Name</label><br/>
      <input class="input-box" type="text" name="user_name" /><br/>
      <label>Email</label><br/>
      <input class="input-box" type="email" name="user_email" /><br/>
      <label>Message</label><br/>
      <textarea class="input-box" name="message" /><br/>
      <input class="button" type="submit" value="Send" /><br/>
      <br/>
    </form>
    </div>
  );
};

export default ContactUs;