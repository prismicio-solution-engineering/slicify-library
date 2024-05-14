"use client";
import { Fragment, MouseEventHandler, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { KeyTextField } from "@prismicio/client";

interface SearchProps {
  title: KeyTextField;
  languages: {
    url: string;
    lang_name: string;
  }[];
}

export const Search: React.FC<SearchProps> = ({
  languages,
  title,
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const cancelButtonRef = useRef(null);

  const [query, setQuery] = useState(searchParams.get("query") || "");
  
  const handleSearch = () => {
    const params = new URLSearchParams(searchParams);
    // If on the search results page, call the onSearch callback in Header
    if (pathname.includes("search")) {
      params.set("query", query);
      console.log("PARAMS HEADER", params.toString());
      return router.push(
        `/${languages[0].lang_name}/search?${params.toString()}`
      );
    } else {
      // If not on the search results page, navigate to it with the query as a parameter
      params.set("query", query);
      router.push(`/${languages[0].lang_name}/search?${params.toString()}`);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearch();
    setOpen(false);
  };

  const handleClick = () => {
    handleSearch();
    setOpen(false);
  };

  return (
    <div>
      <div>
        <button
          type="button"
          className="ml-auto flex h-8 w-8 items-center justify-center rounded-lg lg:ml-8"
          onClick={() => setOpen(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
        <Transition.Root show={open} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            initialFocus={cancelButtonRef}
            onClose={setOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                    <div>
                      <h3 className="text-base font-semibold leading-6 text-gray-900">
                        {title}
                      </h3>
                      <div className="mx-auto flex items-center justify-center">
                        <div className="relative mt-2 flex items-center w-full">
                          <form
                            onSubmit={handleSubmit}
                            className="w-full max-w-md lg:col-span-5 lg:pt-2"
                          >
                            <div className="flex gap-x-4">
                              <input
                                type="text"
                                placeholder="Search..."
                                name="search"
                                id="search"
                                className="block w-full rounded-md border-0 py-2 pr-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-vibrant-blue sm:text-sm sm:leading-6"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                              />
                              <button
                                type="button"
                                className="inline-flex w-20 justify-center rounded-full bg-vibrant-blue px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                                onClick={handleClick}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="w-6 h-6"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                                  />
                                </svg>
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </div>
    </div>
  );
};
