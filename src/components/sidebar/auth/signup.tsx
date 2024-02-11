import { IonContent, IonPage } from "@ionic/react";
import { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../utils/firebase.js";

interface ContainerProps {
  name: string;
}

const Signup: React.FC<ContainerProps> = ({ name }) => {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        history.push("/Login");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <main className="w-full h-auto max-w-md mx-auto text-base-content rounded-3xl">
          <div className="bg-white border border-gray-200 shadow-sm my-28 rounded-3xl dark:bg-gray-800 dark:border-gray-700">
            <div className="p-4 sm:p-7">
              <div className="text-center">
                <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                  Sign up
                </h1>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Temporarily Sign up as an admin to access admin controls 
                 
                </p>
              </div>

              <div className="mt-5">
               
                <form>
                  <div className="grid gap-y-4">
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm dark:text-white"
                      >
                        Email address
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          onChange={(e) => setEmail(e.target.value)}
                          id="email"
                          name="email"
                          className="block w-full px-4 py-3 text-sm border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                          required
                          aria-describedby="email-error"
                        />
                        <div className="absolute inset-y-0 items-center hidden pointer-events-none end-0 pe-3">
                          <svg
                            className="w-5 h-5 text-blue-500"
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
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm dark:text-white"
                      >
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type="password"
                          id="password"
                          onChange={(e) => setPassword(e.target.value)}
                          name="password"
                          className="block w-full px-4 py-3 text-sm border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
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

                    {/* <div>
                      <label
                        for="confirm-password"
                        className="block mb-2 text-sm dark:text-white"
                      >
                        Confirm Password
                      </label>
                      <div className="relative">
                        <input
                          type="password"
                          id="confirm-password"
                          name="confirm-password"
                          className="block w-full px-4 py-3 text-sm border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                          required
                          aria-describedby="confirm-password-error"
                        />
                        <div className="absolute inset-y-0 flex items-center pointer-events-none end-0 pe-3">
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
                        id="confirm-password-error"
                      >
                        Password does not match the password
                      </p>
                    </div> */}

                    <div className="flex items-center">
                      <div className="flex">
                        <input
                          id="remember-me"
                          name="remember-me"
                          type="checkbox"
                          className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 pointer-events-none focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                        />
                      </div>
                      <div className="ms-3">
                        <label
                          htmlFor="remember-me"
                          className="text-sm dark:text-white"
                        >
                          I accept the{" "}
                          <a
                            className="font-medium text-blue-600 decoration-2 hover:underline dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                            href="#"
                          >
                            Terms and Conditions
                          </a>
                        </label>
                      </div>
                    </div>

                    <button
                      onClick={onSubmit}
                      className="inline-flex items-center justify-center w-full px-4 py-3 text-sm font-semibold text-white bg-blue-600 border border-transparent gap-x-2 rounded-2xl hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    >
                      Sign up
                    </button>
                    <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:border-gray-200 before:me-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ms-6 dark:text-gray-500 dark:before:border-gray-600 dark:after:border-gray-600">
                      Or
                    </div>
                    <div className="text-center">
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                 Already have an account? &nbsp;
                  <NavLink
                    to="/Login"
                    className="font-medium text-blue-600 decoration-2 hover:underline dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  >
                    Sign in here
                  </NavLink>
                </p>
              </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </IonContent>
    </IonPage>
  );
};

export default Signup;
