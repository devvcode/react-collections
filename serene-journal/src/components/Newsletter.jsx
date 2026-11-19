import { useState } from "react";
import { Check, Send } from "lucide-react";

export default function Newsletter() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setSubscribed(true);
  }

  return (
    <section className="newsletter" aria-labelledby="newsletter-title">
      <div className="newsletter-decoration" aria-hidden="true">
        <img
          src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=650&q=80"
          alt=""
          loading="lazy"
        />
      </div>
      <div className="newsletter-content">
        <h2 id="newsletter-title">Let’s stay in touch!</h2>
        <p>Get weekly inspiration straight to your inbox.</p>
        {subscribed ? (
          <div className="subscribe-success" role="status">
            <Check size={16} /> Thank you, {name.trim()} — you’re on the list.
          </div>
        ) : (
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <label className="sr-only" htmlFor="subscriber-name">Your name</label>
            <input
              id="subscriber-name"
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
            <label className="sr-only" htmlFor="subscriber-email">Your email</label>
            <input
              id="subscriber-email"
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
            <button type="submit">
              Subscribe <Send size={13} />
            </button>
          </form>
        )}
        <span className="newsletter-note">A thoughtful note, never clutter.</span>
      </div>
    </section>
  );
}
