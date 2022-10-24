import React, { useEffect, useState } from 'react';
import google_logo from '../assets/images/google_logo.png';
import { useNavigate } from 'react-router-dom';
import { requestAccessToken } from '../utils/auth';
import logoBase from '../assets/images/logo_base.png';
import logoPoint from '../assets/images/logo_point.png';
import pwaInstall from '../assets/images/pwa_install.png';
import serviceImage from '../assets/images/service_image.png';

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
        <div className="relative w-2/3 sm:w-2/5">
          <img
            src={logoBase}
            className="grow-0"
            data-aos="zoom-y-out"
            alt="링클립 로고"
          ></img>
          <img
            src={logoPoint}
            className="absolute bottom-1 w-4/5 "
            data-aos="slide-right"
            data-aos-delay="700"
            alt="링클립 로고 밑줄"
          ></img>
        </div>
        <div className="bg-white grow"></div>
      </div>
      {/* Service description */}
      <div className="text-center">
        {detailOpen && (
          <div className="max-w-3xl mx-auto">
            <div data-aos="fade-left">
              <p className="text-xl text-gray-600">
                어떻게 하면 다양한 형태의 순간적인 정보를 간편하게 저장하고
                체계적으로 관리할 수 있을까?
              </p>
              <p className="text-xl text-gray-600 mb-16">
                효율적인 정보 관리를 위한 최고의 수단, {` `}
                <span className="text-xl bg-clip-text text-transparent bg-gradient-to-r from-signiture to-teal-400">
                  링클립
                </span>
              </p>
            </div>

            <div>
              <p
                className="text-3xl text-gray-800 mb-4"
                data-aos="fade-right"
                data-aos-delay="100"
              >
                순간적인 정보 저장과 관리
              </p>
              <img
                src={serviceImage}
                className="w-2/3 sm:w-2/5 ml-auto mr-auto"
                alt="서비스 이미지"
                data-aos="fade-right"
                data-aos-delay="200"
              ></img>
              <p
                className="text-lg text-gray-600"
                data-aos="fade-right"
                data-aos-delay="300"
              >
                이미지, 텍스트, 링크 정보들을 간편하게 저장할 수 있습니다.
              </p>
              <p
                className="text-lg text-gray-600 mb-16"
                data-aos="fade-right"
                data-aos-delay="300"
              >
                저장한 정보들을 그룹화하고, 빠르게 찾아보세요.
              </p>
            </div>

            <div>
              <p
                className="text-3xl text-gray-800 mb-4"
                data-aos="fade-left"
                data-aos-delay="100"
              >
                모바일 앱 지원
              </p>
              <img
                src={pwaInstall}
                className="w-2/3 sm:w-1/5 ml-auto mr-auto"
                alt="PWA 설치 방법"
                data-aos="fade-left"
                data-aos-delay="200"
              ></img>
              <p
                className="text-lg text-gray-600"
                data-aos="fade-left"
                data-aos-delay="300"
              >
                PWA 기술을 이용하여, 스마트폰에 바로가기를 추가하면 앱이
                설치됩니다.
              </p>
              <p
                className="text-lg text-gray-600 mb-16"
                data-aos="fade-left"
                data-aos-delay="300"
              >
                일상 생활 속에서 순간적인 정보들을 저장해봐요.
              </p>
            </div>
          </div>
        )}

        <div>
          {!detailOpen && (
            <div className="max-w-xs mx-auto">
              <button
                onClick={() => {
                  setDetailOpen(!detailOpen);
                }}
                className="btn text-white bg-gray-900 hover:bg-gray-800 w-auto sm:ml-4"
              >
                서비스 알아보기
              </button>
            </div>
          )}

          <div className="max-w-xs mx-auto  sm:flex sm:justify-center mt-8 mb-16">
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
