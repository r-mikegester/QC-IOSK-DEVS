import { Icon } from '@iconify/react';
const Loading = () => {
    return (
        <section className="bg-base-200">
            <div className="container px-6 py-10 mx-auto animate-pulse">
                <div className="drawer lg:drawer-open fixed top-0 left-0 bottom-0 mt-5">
                    <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

                    <div className="drawer-side border-r-2 border-base-100">
                        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                        <ul className=" p-4 w-80 min-h-full bg-base-200 text-base-content">
                            {/* Sidebar content here */}
                            {/* Nav */}
                            <nav id="sidebar-nav" className="relative space-y-8 mt-20">
                                <div className="relative mt-6">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                        <Icon className="w-5 h-5 bg-base-300 rounded-full" icon="" />
                                    </span>

                                    <input type="text" className="w-full py-2 pl-10 pr-4 bg-base-100 my-3 border rounded-xl border-base-200 focus:border-neutral-400  focus:ring-neutral-300 focus:ring-opacity-40 focus:outline-none focus:ring" placeholder="" />
                                </div>
                                {/* Documentation */}
                                <div>
                                    <h1 className="mb-3 text-xl font-semibold bg-base-100 my-3 w-40 h-5 rounded-full ">&nbsp;</h1>
                                    <ul className="ml-0.5 space-y-2 border-l-2 border-neutral-700" data-hs-scrollspy="#scrollspy">
                                        <li>
                                            <a
                                                className="block py-1 pl-4 ml-5 border-l-2 border-transparent text-sm  hover:border-neutral-400 hover:text-neutral-600 hs-scrollspy-active:font-medium hs-scrollspy-active:text-blue-600 dark:hs-scrollspy-active:text-blue-400 bg-base-100 my-3 w-24 h-5 rounded-full active"
                                                href="./documentation"
                                            >
                                                &nbsp;
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className="block py-1 pl-4 ml-5 border-l-2 border-transparent text-sm  hover:border-neutral-400 hover:text-neutral-600 hs-scrollspy-active:font-medium hs-scrollspy-active:text-blue-600 dark:hs-scrollspy-active:text-blue-400 bg-base-100 my-3 w-20 h-5 rounded-full active"
                                                href="services"
                                            >
                                                &nbsp;
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className="block py-1 pl-4 ml-5 border-l-2 border-transparent text-sm  hover:border-neutral-400 hover:text-neutral-600 hs-scrollspy-active:font-medium hs-scrollspy-active:text-blue-600 dark:hs-scrollspy-active:text-blue-400 bg-base-100 my-3 w-20 h-5 rounded-full active"
                                                href="/projects"
                                            >
                                                &nbsp;
                                            </a>
                                        </li>

                                        <li>
                                            <a
                                                className="block py-1 pl-4 ml-5 border-l-2 border-transparent text-sm  hover:border-neutral-400 hover:text-neutral-600 hs-scrollspy-active:font-medium hs-scrollspy-active:text-blue-600 dark:hs-scrollspy-active:text-blue-400 bg-base-100 my-3 w-24 h-5 rounded-full active"
                                                href="/changelog"
                                            >
                                                &nbsp;
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className="block py-1 pl-4 ml-5 border-l-2 border-transparent text-sm  hover:border-neutral-400 hover:text-neutral-600 hs-scrollspy-active:font-medium hs-scrollspy-active:text-blue-600 dark:hs-scrollspy-active:text-blue-400 bg-base-100 my-3 w-28 h-5 rounded-full active"
                                                href="/technologies"
                                            >
                                                &nbsp;
                                            </a>
                                        </li>

                                        {/* More list items */}
                                    </ul>
                                </div>
                                {/* Lifestyle */}
                                <div>
                                    <h1 className="mb-3 text-xl font-semibold bg-base-100 my-3 w-20 h-5 rounded-full">&nbsp;</h1>
                                    <ul className="ml-0.5 space-y-2 border-l-2 border-neutral-700" data-hs-scrollspy="#scrollspy">

                                        <li>
                                            <a
                                                className="block py-1 pl-4 ml-5 border-l-2 border-transparent text-sm  hover:border-neutral-400 hover:text-neutral-600 hs-scrollspy-active:font-medium hs-scrollspy-active:text-blue-600 dark:hs-scrollspy-active:text-blue-400 bg-base-100 my-3 w-20 h-5 rounded-full active"
                                                href="/cycling"
                                            >
                                                &nbsp;
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className="block py-1 pl-4 ml-5 border-l-2 border-transparent text-sm  hover:border-neutral-400 hover:text-neutral-600 hs-scrollspy-active:font-medium hs-scrollspy-active:text-blue-600 dark:hs-scrollspy-active:text-blue-400 bg-base-100 my-3 w-28 h-5 rounded-full active"
                                                href="/aquascaping"
                                            >
                                                &nbsp;
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className="block py-1 pl-4 ml-5 border-l-2 border-transparent text-sm  hover:border-neutral-400 hover:text-neutral-600 hs-scrollspy-active:font-medium hs-scrollspy-active:text-blue-600 dark:hs-scrollspy-active:text-blue-400 bg-base-100 my-3 w-20 h-5 rounded-full active"
                                                href="/vlogs"
                                            >
                                                &nbsp;
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className="block py-1 pl-4 ml-5 border-l-2 border-transparent text-sm  hover:border-neutral-400 hover:text-neutral-600 hs-scrollspy-active:font-medium hs-scrollspy-active:text-blue-600 dark:hs-scrollspy-active:text-blue-400 bg-base-100 my-3 w-24 h-5 rounded-full active"
                                                href="/support"
                                            >
                                                &nbsp;
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className="block py-1 pl-4 ml-5 border-l-2 border-transparent text-sm  hover:border-neutral-400 hover:text-neutral-600 hs-scrollspy-active:font-medium hs-scrollspy-active:text-blue-600 dark:hs-scrollspy-active:text-blue-400 bg-base-100 my-3 w-28 h-5 rounded-full active"
                                                href="/achievements"
                                            >
                                                &nbsp;
                                            </a>
                                        </li>
                                        {/* More list items */}
                                    </ul>
                                </div>
                                {/* Admin */}
                                <div>
                                    <h1 className="mb-3 text-xl font-semibold bg-base-100 my-3 w-20 h-5 rounded-full ">&nbsp;</h1>
                                    <ul className="ml-0.5 space-y-2 border-l-2 border-neutral-700" data-hs-scrollspy="#scrollspy">

                                        <li>
                                            <a
                                                className="block py-1 pl-4 ml-5 border-l-2 border-transparent text-sm  hover:border-neutral-400 hover:text-neutral-600 hs-scrollspy-active:font-medium hs-scrollspy-active:text-blue-600 cursor-not-allowed dark:hs-scrollspy-active:text-blue-400 bg-base-100 my-3 w-20 h-5 rounded-full active"
                                                href="#"
                                            >
                                                &nbsp;
                                            </a>
                                        </li>

                                        {/* More list items */}
                                    </ul>
                                </div>
                            </nav>
                            {/* Nav */}
                        </ul>

                    </div>
                </div>

                <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 sm:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3">
                    <div className="w-full ">
                        <div className="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600"></div>

                        <h1 className="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>
                        <p className="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                    </div>

                    <div className="w-full ">
                        <div className="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600"></div>

                        <h1 className="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>
                        <p className="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                    </div>

                    <div className="w-full ">
                        <div className="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600"></div>

                        <h1 className="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>
                        <p className="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                    </div>

                    <div className="w-full ">
                        <div className="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600"></div>

                        <h1 className="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>
                        <p className="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                    </div>

                    <div className="w-full ">
                        <div className="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600"></div>

                        <h1 className="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>
                        <p className="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                    </div>

                    <div className="w-full ">
                        <div className="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600"></div>

                        <h1 className="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>
                        <p className="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                    </div>

                    <div className="w-full ">
                        <div className="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600"></div>

                        <h1 className="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>
                        <p className="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                    </div>

                    <div className="w-full ">
                        <div className="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600"></div>

                        <h1 className="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>
                        <p className="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default Loading;