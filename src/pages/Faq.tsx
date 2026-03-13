import { useEffect, useState } from 'react';
import { client } from '../library/sanity'; // Adjust path to your sanity client

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    client.fetch(`*[_type == "faq"] | order(order asc)`)
      .then((data) => setFaqs(data))
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-brand-cream pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-6xl font-black text-brand-charcoal uppercase tracking-tighter mb-12">
          Common <span className="text-brand-pink">Questions</span>
        </h1>

        <div className="space-y-8">
          {faqs.map((faq: any) => (
            <div key={faq._id} className="border-b border-brand-charcoal/10 pb-8">
              <h3 className="text-xl font-black text-brand-charcoal uppercase mb-3 tracking-tight">
                {faq.question}
              </h3>
              <p className="text-brand-charcoal/70 font-medium leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;