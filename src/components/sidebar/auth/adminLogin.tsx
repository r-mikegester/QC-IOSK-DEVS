// Settings.tsx
import React, { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import { themeChange } from "theme-change";
import { useTranslation } from "react-i18next";
import { NavLink, useHistory } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AdminLogin: React.FC = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onClear = () => {
    setEmail("");
    setPassword("");
  };

  const onLogin = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // Display toast for successful login
        toast.success("Sign in successfully!", {
          position: toast.POSITION.BOTTOM_RIGHT,
          className: " bg-base-100 font-bold rounded-2xl text-base-content ",
          theme: "dark",
          icon: <Icon icon="line-md:clipboard-check" className="w-10 h-10 text-xl" />,
          progressClassName: "bg-accent rounded-full mx-3 mb-1 w-72",
          autoClose: 1000, // 3000 milliseconds = 3 seconds
        });
        console.log(user);
        // Redirect after 3 seconds
        setTimeout(() => {
          history.push("/Dashboard");
        }, 2500); // 3000 milliseconds = 3 seconds
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // Display toast for unsuccessful login
        toast.error(errorMessage, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        console.error(errorCode, errorMessage);
      });
  };
  const { t } = useTranslation();
  useEffect(() => {
    themeChange(false);
  });


  return (
    <div className="h-full py-10 bg-base-100 text-base-content">
      <div className="sticky top-0 z-50 px-3 py-1 pb-5 transition-all duration-150 ease-in-out bg-base-100 ">
        <div className="flex flex-col items-baseline justify-center">
          <h1 className="text-4xl font-bold text-left ">{t("Sign In")}</h1>
          <div className="text-sm">{t("Sign in to had Admin Privileges")}</div>
        </div>
        
      </div>
      <div className="w-full px-4 space-y-2 h-max rounded-2xl">
        <section className="bg-base-100">
          <div className="w-full p-3">
            <div className="">
              <form>
                <div className="grid gap-y-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-md"
                    >
                      Email address
                    </label>
                    <div className="relative">
                      <input
                        autoComplete="off"
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        id="email"
                        name="email"
                        className="w-full h-10 px-4 py-3 text-sm border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none bg-base-300 dark:focus:ring-gray-600"
                        required
                        aria-describedby="email-error"
                      />
                      <div className="absolute inset-y-0 items-center hidden pointer-events-none end-0 pe-3">
                        <svg
                          className="w-5 h-5 text-red-500"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                          aria-hidden="true"
                        >
                          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                        </svg>
                      </div>
                    </div>
                    <p
                      className="hidden mt-2 text-xs text-red-600"
                      id="email-error"
                    >
                      Please include a valid email address so we can get back
                      to you
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="block mb-2 text-md"
                      >
                        Password
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        autoComplete="off"
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        id="password"
                        name="password"
                        className="block w-full h-10 px-4 py-3 text-sm rounded-lg focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none bg-base-300 "
                        required
                        aria-describedby="password-error"
                      />
                      <div className="absolute inset-y-0 items-center hidden pointer-events-none end-0 pe-3">
                        <svg
                          className="w-5 h-5 text-red-500"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                          aria-hidden="true"
                        >
                          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                        </svg>
                      </div>
                    </div>
                    <p
                      className="hidden mt-2 text-xs text-red-600"
                      id="password-error"
                    >
                      8+ characters required
                    </p>
                  </div>



                  <div className="flex space-x-3">
                    <button
                      onClick={onLogin}
                      className="inline-flex items-center justify-center w-full px-4 py-3 text-sm font-semibold border-2 text-base-content bg-base-300 gap-x-2 rounded-xl hover:bg-base-200 disabled:opacity-50 disabled:pointer-events-none"
                    >
                      Sign in
                    </button>
                    <button
                      onClick={onClear}
                      className="inline-flex items-center justify-center w-20 px-4 py-3 text-sm font-semibold border-2 text-base-content bg-base-300 gap-x-2 rounded-xl hover:bg-base-200 disabled:opacity-50 disabled:pointer-events-none"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminLogin;
