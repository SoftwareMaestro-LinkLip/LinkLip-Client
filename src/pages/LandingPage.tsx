import React, { useEffect } from 'react';
import google_logo from '../assets/images/google_logo.png';
import { GoogleLogin } from 'react-google-login';
import axios, { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import { requestAccessToken } from '../utils/auth';

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    requestAccessToken().then((res) => {
      if (res) {
        navigate(`/dashboard`);
      }
    });
  }, []);

  return (
    <div>
      <section className="relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Hero content */}
          <div className="pt-10 pb-12 md:pt-40 md:pb-20">
            {/* Section header */}
            <div className="text-center">
              <h1
                className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4"
                data-aos="zoom-y-out"
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-signiture to-teal-400">
                  링클립
                </span>
                과 함께하는 정보 관리
              </h1>
              <div
                className="max-w-3xl mx-auto"
                data-aos="zoom-y-out"
                data-aos-delay="300"
              >
                <p
                  className="text-xl text-gray-600"
                  data-aos="zoom-y-out"
                  data-aos-delay="150"
                >
                  어떻게 하면 다양한 형태의 순간적인 정보를 간편하게 저장하고
                  체계적으로 관리할 수 있을까?
                </p>
                <p
                  className="text-xl text-gray-600 mb-4"
                  data-aos="zoom-y-out"
                  data-aos-delay="300"
                >
                  여러분들의 효율적인 정보 관리를 위한 최고의 수단,{' '}
                  <span className="text-signiture">링클립</span>입니다.
                </p>

                <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center mb-8">
                  <a
                    className="btn text-white bg-gray-900 hover:bg-gray-800 w-full sm:w-auto sm:ml-4"
                    href="#"
                  >
                    더 알아보기
                  </a>
                </div>

                <div className="max-w-xs mx-auto  sm:flex sm:justify-center pb-8">
                  <a
                    className="btn px-0 text-slate-800 bg-gray-100 hover:bg-gray-200 w-full relative flex items-center"
                    href={import.meta.env.VITE_API_AUTH}
                  >
                    <img className="w-8" src={google_logo} alt="google logo" />
                    <span className="flex-auto pl-16 pr-8 -ml-16">
                      Continue with Google
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
