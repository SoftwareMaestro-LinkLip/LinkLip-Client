import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { requestAccessToken } from '../utils/auth';
import { getCategories, addCategory } from '../utils/category';
import useInput from '../hooks/useInput';

function SignUp() {
  const navigate = useNavigate();
  const [name, onChangeName] = useInput('');

  useEffect(() => {
    requestAccessToken().then((res) => {
      if (!res) {
        navigate(`/`);
      }

      getCategories(true).then((res) => {
        if (res.length) {
          navigate(`/dashboard`);
        }
      });
    });
  }, []);

  const joinHandler = (e: any) => {
    if (name.trim().length) {
      addCategory(`__linklip:${name}`).then(() => {
        navigate(`/dashboard`);
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/*  Page content */}
      <main className="flex-grow">
        <section className="bg-gradient-to-b from-gray-100 to-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1">환영합니다!</h1>
              </div>

              {/* Form */}
              <div className="max-w-sm mx-auto">
                <form>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label
                        className="block text-gray-800 text-sm font-medium mb-1"
                        htmlFor="name"
                      >
                        Name <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        className="form-input w-full text-gray-800"
                        placeholder="사용하실 이름을 입력해주세요"
                        onChange={onChangeName}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <button
                        onClick={joinHandler}
                        className="btn text-white bg-green-400 hover:bg-signiture w-full"
                      >
                        링클립 시작하기
                      </button>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 text-center mt-3">
                    By creating an account, you agree to the{' '}
                    <a className="underline" href="#0">
                      terms & conditions
                    </a>
                    , and our{' '}
                    <a className="underline" href="#0">
                      privacy policy
                    </a>
                    .
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default SignUp;
