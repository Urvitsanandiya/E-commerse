import { Instagram, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="shadow-[0px_-4px_6px_rgba(0,0,0,0.1)] bg-gray-50 text-gray-900 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-black font-semibold uppercase tracking-wider">
              Customer Service
            </h3>
            <ul className="space-y-2">
              {[
                "Help Center",
                "Payment Methods",
                "Contact",
                "Shipping Status",
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-black font-semibold uppercase tracking-wider">
              Legal
            </h3>
            <ul className="space-y-2">
              {[
                "Privacy Policy",
                "Cookie Settings",
                "Terms & Conditions",
                "Cancellation",
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Others Section */}
          <div className="space-y-4">
            <h3 className="text-black font-semibold uppercase tracking-wider">
              Others
            </h3>
            <ul className="space-y-2">
              {["Our Teams", "Sustainability", "Press", "Jobs"].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="mt-8 flex justify-center md:justify-start space-x-6">
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-500"
          >
            <Instagram size={24} />
          </a>
          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600"
          >
            <Linkedin size={24} />
          </a>
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400"
          >
            <Twitter size={24} />
          </a>
        </div>

        {/* Copyright Section */}
        <div className="mt-6 border-t border-gray-300 pt-6 text-center text-sm text-gray-600">
          &copy; {new Date().getFullYear()} E-Commerce. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
