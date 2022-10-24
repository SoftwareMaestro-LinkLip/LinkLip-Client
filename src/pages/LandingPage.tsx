import React, { useEffect, useState } from 'react';
import google_logo from '../assets/images/google_logo.png';
import { GoogleLogin } from 'react-google-login';
import axios, { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import { requestAccessToken } from '../utils/auth';
import logoBase from '../assets/images/logo_base.png';
import logoPoint from '../assets/images/logo_point.png';

const LandingPage = () => {
  const [detailOpen, setDetailOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    requestAccessToken().then((res) => {
      if (res) {
        navigate(`/dashboard`);
      }
    });
  }, []);

  return (
    <div className="mt-60">
      {/* Linklip logo */}
      <div className="flex justify-between mb-20">
        <div className="bg-white grow z-20"></div>
        <div className="relative w-3/5">
          <img src={logoBase} className="grow-0" data-aos="zoom-y-out"></img>
          <img
            src={logoPoint}
            className="absolute bottom-1 w-4/5"
            data-aos="slide-right"
            data-aos-delay="100"
          ></img>
        </div>
        <div className="bg-white grow"></div>
      </div>
      {/* Section header */}
      <div className="text-center">
        {detailOpen && (
          <div className="max-w-3xl mx-auto" data-aos="flip-down">
            <p className="text-xl text-gray-600">
              어떻게 하면 다양한 형태의 순간적인 정보를
            </p>
            <p className="text-xl text-gray-600 mb-2">
              간편하게 저장하고 체계적으로 관리할 수 있을까?
            </p>
            <p className="text-xl text-gray-600  mb-4">
              효율적인 정보 관리를 위한 최고의 수단, {` `}
              <span className="text-xl bg-clip-text text-transparent bg-gradient-to-r from-signiture to-teal-400">
                링클립
              </span>
            </p>
          </div>
        )}

        <div>
          {!detailOpen && (
            <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center">
              <button
                onClick={() => {
                  setDetailOpen(!detailOpen);
                }}
                className="btn text-white bg-gray-900 hover:bg-gray-800 w-full sm:w-auto sm:ml-4"
              >
                더 알아보기
              </button>
            </div>
          )}

          <div className="max-w-xs mx-auto  sm:flex sm:justify-center mt-8">
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
  );
};

export default LandingPage;
