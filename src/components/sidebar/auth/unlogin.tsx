import { IonContent, IonPage } from "@ionic/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../../utils/firebase";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";
// import sheesh from '../../../assets/imgs/sc-bg.png';

interface ContainerProps {
  name: string;
}

const Login: React.FC<ContainerProps> = ({ name }) => {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        history.push("/Dashboard");
        console.log(user);
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
        <main className="w-full h-screen text-base-content">
          <div>
            <div className="">
              <div className="">
                {/* <img src={sheesh} alt="" className="w-full h-screen" /> */}
              </div>
              <div className="w-screen h-screen">
                <section className="border border-gray-200 shadow-inner bg-base-100">
                  <div className="w-full h-screen p-4 sm:p-7">
                    <div className="text-center">
                      <h1 className="block text-5xl font-bold">
                        Sign in
                      </h1>
                      <p className="mt-2 text-sm">
                        Sign in to had Admin Privileges
                      </p>
                    </div>
                    <div className="px-20 mt-32">
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
                                className="w-full px-4 py-3 text-sm border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none bg-base-300 dark:focus:ring-gray-600"
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
                                className="block w-full px-4 py-3 text-sm border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none bg-base-300 dark:focus:ring-gray-600"
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
                              className="inline-flex items-center justify-center w-full px-4 py-3 text-sm font-semibold border-2 text-base-content bg-base-300 gap-x-2 rounded-2xl hover:bg-base-200 disabled:opacity-50 disabled:pointer-events-none"
                            >
                              Sign in
                            </button>
                            <NavLink
                              to="/SanBartolome"
                              className="w-full py-3 font-semibold text-center bg-base-100 hover:bg-base-300 rounded-2xl text-base-content decoration-2 "
                            >
                              Back to map
                            </NavLink>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>

        </main>
      </IonContent>
    </IonPage>
  );
};

export default Login;
