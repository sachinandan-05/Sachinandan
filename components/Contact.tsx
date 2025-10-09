"use client";

import { motion } from "framer-motion";
import { FaLinkedin, FaTwitter, FaGithub, FaSkype, FaUsers } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function Contact() {
  const contactDetails = [
    { label: "Address", value: "New Delhi, Delhi, India" },
    { label: "Timezone", value: "GMT+5:30" },
    { 
      label: "E-mail Official", 
      value: "sachinandan.priv05@gmail.com",
      isEmail: true 
    },
  ];

  const socialMedia = [
    { 
      platform: "LinkedIn", 
      url: "https://www.linkedin.com/in/sachinandan-yadav-660115243/",
      icon: FaLinkedin 
    },
    { 
      platform: "Twitter", 
      url: "https://x.com/sachinandan_05",
      icon: FaTwitter 
    },
    { 
      platform: "Github", 
      url: "https://github.com/sachinandan-05",
      icon: FaGithub 
    },

  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScheduleCall = () => {
    // Replace with your actual Calendly link
    const calendlyUrl = 'https://calendly.com/sachinandan-priv05/30min';
    window.open(calendlyUrl, '_blank');
  };

  return (
    <section id="contact" className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white py-12 sm:py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid lg:grid-cols-[1fr_300px] gap-8 md:gap-12">
          {/* Main Content */}
          <div className="space-y-8 sm:space-y-12 md:space-y-16">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-blue-400 text-sm font-medium mb-4 uppercase tracking-wider">Work</p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6">Contact</h1>
              <p className="text-gray-400 text-base sm:text-lg max-w-2xl">
                Get in touch with me anytime, through social media, e-mail, or schedule 30min call with me.
              </p>
            </motion.div>

            {/* Notice Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/5 border-l-4 border-yellow-500/50 p-4 sm:p-6 rounded-r-lg"
            >
              <p className="text-gray-300 mb-3 text-sm sm:text-base">
                Just a friendly reminder that the information provided here is for{" "}
                <span className="font-bold text-white">business purposes only</span>. If you have any questions, 
                feel free to chat with me directly on my social media.
              </p>
              <p className="text-gray-400 text-xs sm:text-sm">
                I appreciate your understanding in using this responsibly.
              </p>
            </motion.div>

            {/* Contact Details Section */}
            <motion.div
              id="contact-details"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-6"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Contact</h2>
              
              {/* Desktop Table View */}
              <div className="hidden md:block overflow-hidden rounded-lg border border-white/10">
                <table className="w-full">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="text-left px-4 lg:px-6 py-4 font-semibold text-gray-300">Contact</th>
                      <th className="text-left px-4 lg:px-6 py-4 font-semibold text-gray-300">Detail</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contactDetails.map((detail, index) => (
                      <tr 
                        key={index}
                        className="border-t border-white/10 hover:bg-white/5 transition-colors"
                      >
                        <td className="px-4 lg:px-6 py-4 text-gray-400">{detail.label}</td>
                        <td className="px-4 lg:px-6 py-4">
                          {detail.isEmail ? (
                            <a 
                              href={`mailto:${detail.value}`}
                              className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2 break-all"
                            >
                              <MdEmail size={18} className="flex-shrink-0" />
                              <span className="break-all">{detail.value}</span>
                            </a>
                          ) : (
                            <span className="text-white">{detail.value}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden space-y-3">
                {contactDetails.map((detail, index) => (
                  <div 
                    key={index}
                    className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-colors"
                  >
                    <p className="text-gray-400 text-sm mb-2">{detail.label}</p>
                    {detail.isEmail ? (
                      <a 
                        href={`mailto:${detail.value}`}
                        className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2 break-all"
                      >
                        <MdEmail size={18} className="flex-shrink-0" />
                        <span className="break-all text-sm">{detail.value}</span>
                      </a>
                    ) : (
                      <span className="text-white text-sm">{detail.value}</span>
                    )}
                  </div>
                ))}
              </div>

              <p className="text-gray-400 mt-4 sm:mt-6 text-sm sm:text-base">
                If you need any further information, such as my phone number, please do not hesitate to 
                send me an email first.
              </p>

              <button 
                onClick={handleScheduleCall}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-all hover:shadow-lg hover:shadow-blue-500/50 text-sm sm:text-base flex items-center gap-2 justify-center sm:justify-start"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v14a2 2 0 002 2z" />
                </svg>
                Book a Meeting
              </button>
            </motion.div>

            {/* Social Media Section */}
            <motion.div
              id="social-media"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Social Media</h2>
              
              <p className="text-gray-400 text-sm sm:text-base">
                If you want to find me on social media, just search for{" "}
                <span className="font-bold text-white">@sachinandan_05</span>. That's my username on 
                almost all platforms, so it should be easy to find me.
              </p>

              <p className="text-gray-400 text-sm sm:text-base">
                But if you're short on time, I've included some links to the social media platforms I use most 
                frequently below.
              </p>

              {/* Desktop Table View */}
              <div className="hidden md:block overflow-hidden rounded-lg border border-white/10">
                <table className="w-full">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="text-left px-4 lg:px-6 py-4 font-semibold text-gray-300">Social Media</th>
                      <th className="text-left px-4 lg:px-6 py-4 font-semibold text-gray-300">Profile URL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {socialMedia.map((social, index) => (
                      <tr 
                        key={index}
                        className="border-t border-white/10 hover:bg-white/5 transition-colors"
                      >
                        <td className="px-4 lg:px-6 py-4 text-gray-400">
                          <div className="flex items-center gap-3">
                            <social.icon size={20} className="text-gray-500 flex-shrink-0" />
                            {social.platform}
                          </div>
                        </td>
                        <td className="px-4 lg:px-6 py-4">
                          <a 
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center gap-2 break-all"
                          >
                            <span className="break-all">{social.url}</span>
                            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden space-y-3">
                {socialMedia.map((social, index) => (
                  <div 
                    key={index}
                    className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <social.icon size={24} className="text-gray-500 flex-shrink-0" />
                      <span className="text-white font-medium">{social.platform}</span>
                    </div>
                    <a 
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 transition-colors text-sm break-all flex items-start gap-2"
                    >
                      <span className="break-all">{social.url}</span>
                      <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Table of Contents Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="hidden lg:block"
          >
            <div className="sticky top-24 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Table of Contents</h3>
              <nav className="space-y-3">
                <button
                  onClick={() => scrollToSection('contact-details')}
                  className="block w-full text-left text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Contact
                </button>
                <button
                  onClick={() => scrollToSection('social-media')}
                  className="block w-full text-left text-gray-400 hover:text-white transition-colors"
                >
                  Social Media
                </button>
              </nav>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
