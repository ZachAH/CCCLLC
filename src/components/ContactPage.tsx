import { useState } from 'react';

const ContactPage = () => {
  const [status, setStatus] = useState("");

  // This is a standard handler for Formspree (a free, easy mailer for React)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    
    // You can replace 'YOUR_FORMSPREE_ID' with her actual ID later
    const response = await fetch("https://formspree.io/f/savedandsent26@yahoo.com", {
      method: "POST",
      body: data,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      setStatus("SUCCESS");
      form.reset();
    } else {
      setStatus("ERROR");
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream py-16 px-6">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-brand-charcoal font-serif text-4xl md:text-5xl italic mb-4">
            Get in Touch
          </h1>
          <p className="text-brand-charcoal/70 text-lg">
            Have a question about an order or a custom request? <br />
            We'd love to hear from you.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border-2 border-brand-light-yellow/20">
          {status === "SUCCESS" ? (
            <div className="text-center py-10">
              <div className="text-5xl mb-4">🙏</div>
              <h2 className="text-2xl font-bold text-brand-charcoal">Message Sent!</h2>
              <p className="text-brand-charcoal/70 mt-2">Thank you for reaching out. We'll get back to you soon.</p>
              <button 
                onClick={() => setStatus("")}
                className="mt-6 text-brand-pink font-bold underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-bold text-brand-charcoal uppercase tracking-wider">Name</label>
                  <input 
                    type="text" 
                    name="name" 
                    id="name"
                    required
                    className="bg-brand-cream/50 border-2 border-transparent focus:border-brand-light-yellow focus:bg-white rounded-xl px-4 py-3 outline-none transition-all"
                    placeholder="Your name"
                  />
                </div>
                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-bold text-brand-charcoal uppercase tracking-wider">Email</label>
                  <input 
                    type="email" 
                    name="email" 
                    id="email"
                    required
                    className="bg-brand-cream/50 border-2 border-transparent focus:border-brand-light-yellow focus:bg-white rounded-xl px-4 py-3 outline-none transition-all"
                    placeholder="hello@example.com"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="flex flex-col gap-2">
                <label htmlFor="subject" className="text-sm font-bold text-brand-charcoal uppercase tracking-wider">Subject</label>
                <select 
                  name="subject" 
                  id="subject"
                  className="bg-brand-cream/50 border-2 border-transparent focus:border-brand-light-yellow focus:bg-white rounded-xl px-4 py-3 outline-none transition-all"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Order Issue">Order Issue</option>
                  <option value="Custom Request">Custom Request</option>
                  <option value="Wholesale">Wholesale</option>
                </select>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-bold text-brand-charcoal uppercase tracking-wider">Message</label>
                <textarea 
                  name="message" 
                  id="message"
                  rows={5}
                  required
                  className="bg-brand-cream/50 border-2 border-transparent focus:border-brand-light-yellow focus:bg-white rounded-xl px-4 py-3 outline-none transition-all resize-none"
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full bg-brand-pink hover:bg-brand-charcoal text-white font-bold py-4 rounded-xl shadow-lg transition-all transform hover:-translate-y-1 active:scale-95"
              >
                Send Message
              </button>

              {status === "ERROR" && (
                <p className="text-red-500 text-center font-medium">Oops! Something went wrong. Please try again.</p>
              )}
            </form>
          )}
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center text-brand-charcoal/60">
          <p>Direct Email: <a href="mailto:savedandsent26@yahoo.com" className="text-brand-pink font-bold">savedandsent26@yahoo.com</a></p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;