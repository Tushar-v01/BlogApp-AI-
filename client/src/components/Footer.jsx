import React from 'react';
import { assets, footer_data } from '../assets/assets';

function Footer() {
  return (
    <footer className='px-6 md:px-16 lg:px-24 xl:px-32 bg-primary/3'>
      <div className='flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500'>
        {/* Left: Logo + Description */}
        <div className='max-w-[420px]'>
          <img src={assets.logo} alt='logo' className='w-32 sm:w-44' />
          <p className='mt-6 leading-relaxed text-sm'>
           This is your space to think out loud, to share what matters, and to write without filters. Whether it's one word or a thousand, your story starts right here.
          </p>
        </div>

        {/* Right: Footer Links */}
        <div className='flex flex-wrap justify-between w-full md:w-[45%] gap-8 sm:gap-10'>
          {footer_data.map((section, index) => (
            <div key={index}>
              <h3 className='font-semibold text-base text-gray-900 mb-3 md:mb-5'>{section.title}</h3>
              <ul className='text-sm space-y-1'>
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a href="#" className='hover:underline transition-all duration-200 ease-in-out'>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Text */}
      <p className='py-4 text-center text-sm md:text-base text-gray-500/80'>
        © 2025 Q — All Rights Reserved.
      </p>
    </footer>
  );
}

export default Footer;
