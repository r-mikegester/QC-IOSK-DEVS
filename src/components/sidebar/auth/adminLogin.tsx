import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { themeChange } from "theme-change";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const AdminLogin: React.FC = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };

  const onLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Log email and password
    console.log("Email:", email);
    console.log("Password:", password);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user.emailVerified) {
          // Store user's email in local storage
          localStorage.setItem("userEmail", email);
          
          toast.success("Sign in successfully!", {
            position: toast.POSITION.BOTTOM_RIGHT,
            className: " bg-base-100 font-bold rounded-2xl text-base-content ",
            theme: "dark",
            icon: <Icon icon="line-md:clipboard-check" className="w-10 h-10 text-xl" />,
            progressClassName: "bg-accent rounded-full mx-3 mb-1 w-72",
            autoClose: 1000,
          });
          
          console.log(user); // Log user details
          setTimeout(() => {
            history.push("/Dashboard");
          }, 2500);
        } else {
          toast.error("Please verify your email before signing in.", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        }
      })
      .catch((error) => {
        toast.error("Incorrect email or password", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        console.error(error.code, error.message);
      });
  };

  const sendVerificationEmail = () => {
    const user = auth.currentUser;
    if (user) {
      sendEmailVerification(user)
        .then(() => {
          toast.success("Verification email sent!", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        })
        .catch((error) => {
          console.error("Error sending verification email:", error);
        });
    } else {
      console.error("No user is currently logged in.");
    }
  };

  const { t } = useTranslation();

  useEffect(() => {
    themeChange(false);
  }, []);

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
                    <label htmlFor="email" className="block mb-2 text-md">Email address</label>
                    <div className="relative">
                      <input
                        autoComplete="off"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        type="email"
                        id="email"
                        name="email"
                        className="w-full h-10 px-4 py-3 text-sm border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none bg-base-300 dark:focus:ring-gray-600"
                        required
                        aria-describedby="email-error"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <label htmlFor="password" className="block mb-2 text-md">Password</label>
                    </div>
                    <div className="relative">
                      <input
                        autoComplete="off"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        type="password"
                        id="password"
                        name="password"
                        className="block w-full h-10 px-4 py-3 text-sm rounded-lg focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none bg-base-300 "
                        required
                        aria-describedby="password-error"
                      />
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={onLogin}
                      className="inline-flex items-center justify-center w-full px-4 py-3 text-sm font-semibold border-2 text-base-content bg-base-300 gap-x-2 rounded-xl hover:bg-base-200 disabled:opacity-50 disabled:pointer-events-none"
                    >
                      Sign in
                    </button>
                    <button
                      onClick={clearInputs}
                      className="inline-flex items-center justify-center w-20 px-4 py-3 text-sm font-semibold border-2 text-base-content bg-base-300 gap-x-2 rounded-xl hover:bg-base-200 disabled:opacity-50 disabled:pointer-events-none"
                    >
                      Clear
                    </button>
                  </div>
                  <div className="flex justify-center">
                    <button
                      onClick={sendVerificationEmail}
                      className="text-blue-500 underline focus:outline-none"
                    >
                      Resend verification email
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
