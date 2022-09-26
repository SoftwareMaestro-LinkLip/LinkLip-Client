import React from 'react';

const LandingPage = () => {
  return (
    <div>
      <section className="relative">
        {/* Illustration behind hero content */}
        <div
          className="absolute left-1/2 transform -translate-x-1/2 bottom-0 pointer-events-none"
          aria-hidden="true"
        >
          <svg
            width="1360"
            height="578"
            viewBox="0 0 1360 578"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient
                x1="50%"
                y1="0%"
                x2="50%"
                y2="100%"
                id="illustration-01"
              >
                <stop stopColor="#FFF" offset="0%" />
                <stop stopColor="#EAEAEA" offset="77.402%" />
                <stop stopColor="#DFDFDF" offset="100%" />
              </linearGradient>
            </defs>
            <g fill="url(#illustration-01)" fillRule="evenodd">
              <circle cx="1232" cy="128" r="128" />
              <circle cx="155" cy="443" r="64" />
            </g>
          </svg>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Hero content */}
          <div className="pt-32 pb-12 md:pt-40 md:pb-20">
            {/* Section header */}
            <div className="text-center pb-12 md:pb-16">
              <h1
                className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4"
                data-aos="zoom-y-out"
              >
                Link + Clip ={' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-signiture to-teal-400">
                  Linklip
                </span>
              </h1>
              <div className="max-w-3xl mx-auto">
                <p
                  className="text-xl text-gray-600 mb-8"
                  data-aos="zoom-y-out"
                  data-aos-delay="150"
                >
                  어떻게 하면 다양한 형태의 순간적인 정보를 간편하게 저장하고
                  체계적으로 관리할 수 있을까? 여러분들의 효율적인 정보 관리를
                  위한 최고의 수단, 링클립입니다.
                </p>
                <div
                  className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center"
                  data-aos="zoom-y-out"
                  data-aos-delay="300"
                >
                  <div>
                    <a
                      className="btn text-white bg-signiture hover:bg-blue-700 w-full mb-4 sm:w-auto sm:mb-0"
                      href="#0"
                    >
                      서비스 소개
                    </a>
                  </div>
                  <div>
                    <a
                      className="btn text-white bg-gray-900 hover:bg-gray-800 w-full sm:w-auto sm:ml-4"
                      href="#0"
                    >
                      Learn more
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-sm mx-auto">
        <form>
          <div className="flex flex-wrap -mx-3">
            <div className="w-full px-3">
              <button
                className="btn px-0 text-white bg-red-600 hover:bg-red-700 w-full relative flex items-center"
                data-aos="zoom-y-out"
                data-aos-delay="300"
              >
                <svg
                  className="w-4 h-4 fill-current text-white opacity-75 flex-shrink-0 mx-4"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7.9 7v2.4H12c-.2 1-1.2 3-4 3-2.4 0-4.3-2-4.3-4.4 0-2.4 2-4.4 4.3-4.4 1.4 0 2.3.6 2.8 1.1l1.9-1.8C11.5 1.7 9.9 1 8 1 4.1 1 1 4.1 1 8s3.1 7 7 7c4 0 6.7-2.8 6.7-6.8 0-.5 0-.8-.1-1.2H7.9z" />
                </svg>
                <span className="flex-auto pl-16 pr-8 -ml-16">
                  Continue with Google
                </span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LandingPage;
