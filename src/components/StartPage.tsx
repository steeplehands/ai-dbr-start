import { useState } from 'react';
import { Zap, MessageSquare, Send } from 'lucide-react';
import { Input } from './ui/input';
import { Select } from './ui/select';
import { Footer } from './Footer';

const WEBHOOK_URL = 'https://services.leadconnectorhq.com/hooks/saiPIHsElD7qIIVgrvxR/webhook-trigger/0176acaf-f747-4185-8ede-657b53d1cb4b';
const SUCCESS_REDIRECT = 'https://success-reactivation.rizo.pro';

const databaseSizeOptions = [
  { value: '500-1K', label: '500-1K' },
  { value: '1K-5K', label: '1K-5K' },
  { value: '5K-10K', label: '5K-10K' },
  { value: '10K+', label: '10K+' },
];

export function StartPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessType: '',
    databaseSize: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Redirect to success page
      window.location.href = SUCCESS_REDIRECT;
    } catch (error) {
      console.error('Submission error:', error);
      // Still redirect on error - webhook might be CORS restricted
      window.location.href = SUCCESS_REDIRECT;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <main className="relative z-10 flex flex-col items-center justify-center px-4 py-16 min-h-screen">
        <div className="w-full max-w-lg">
          {/* Top badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-purple-600 text-white px-4 py-2 rounded-full animate-bounce">
              <Zap className="w-4 h-4" />
              <span className="text-sm font-semibold">AI-Powered Lead Revival</span>
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-4 leading-tight">
            Turn Dead Leads Into Revenue
            <br />
            <span className="bg-gradient-to-r from-orange-400 to-purple-500 bg-clip-text text-transparent">
              Starting With 100 Free Messages
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg text-gray-300 text-center mb-10">
            Upload your lead list and book a quick call. We'll handle the rest.
          </p>

          {/* Form Card */}
          <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                id="name"
                name="name"
                type="text"
                label="Name"
                placeholder="Your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <Input
                id="email"
                name="email"
                type="email"
                label="Email"
                placeholder="you@company.com"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <Input
                id="phone"
                name="phone"
                type="tel"
                label="Phone"
                placeholder="(555) 123-4567"
                value={formData.phone}
                onChange={handleChange}
                required
              />

              <Input
                id="businessType"
                name="businessType"
                type="text"
                label="Business Type"
                placeholder="e.g., Real Estate, Insurance, Coaching"
                value={formData.businessType}
                onChange={handleChange}
                required
              />

              <Select
                id="databaseSize"
                name="databaseSize"
                label="Approximate Database Size"
                options={databaseSizeOptions}
                value={formData.databaseSize}
                onChange={handleChange}
                required
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-lg font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-orange-500/30 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Schedule My Strategy Call
                  </>
                )}
              </button>
            </form>

            {/* Fine print */}
            <p className="text-sm text-gray-500 text-center mt-6 leading-relaxed">
              After your first 100 messages (free), you'll only cover API/SMS costs (~$0.01-0.02 per message).
              You pay our fee only when leads convert.
            </p>
          </div>

          {/* Trust indicators */}
          <div className="mt-10 flex flex-wrap justify-center gap-6 text-gray-400 text-sm">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-orange-500" />
              <span>100 Free Messages</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-orange-500" />
              <span>Results in 48 Hours</span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
