<>
  <link
    href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,300;0,400;1,600&display=swap"
    rel="stylesheet"
  />
  <style
    dangerouslySetInnerHTML={{
      __html: "\n  * {\n  font-family: 'Source Sans Pro';\n  }\n"
    }}
  />
  <div className="mx-auto max-w-screen-xl bg-white">
    <h1 className="mt-20 mb-10 ml-5 text-2xl font-bold text-gray-900">
      Order Management
    </h1>
    <div className="bg-white py-2 px-3">
      <nav className="flex flex-wrap gap-4">
        <a
          href="#"
          className="inline-flex whitespace-nowrap border-b-2 border-transparent py-2 px-3 text-sm font-medium text-gray-600 transition-all duration-200 ease-in-out hover:border-b-purple-600 hover:text-purple-600"
        >
          {" "}
          Account{" "}
        </a>
        <a
          href="#"
          className="inline-flex whitespace-nowrap border-b-2 border-transparent py-2 px-3 text-sm font-medium text-gray-600 transition-all duration-200 ease-in-out hover:border-b-purple-600 hover:text-purple-600"
        >
          {" "}
          Settings{" "}
        </a>
        <a
          href="#"
          className="inline-flex whitespace-nowrap border-b-2 border-transparent border-b-purple-600 py-2 px-3 text-sm font-semibold text-purple-600 transition-all duration-200 ease-in-out"
        >
          {" "}
          Orders{" "}
        </a>
        <a
          href="#"
          className="inline-flex whitespace-nowrap border-b-2 border-transparent py-2 px-3 text-sm font-medium text-gray-600 transition-all duration-200 ease-in-out hover:border-b-purple-600 hover:text-purple-600"
        >
          {" "}
          Sales{" "}
        </a>
        <a
          href="#"
          className="inline-flex whitespace-nowrap border-b-2 border-transparent py-2 px-3 text-sm font-medium text-gray-600 transition-all duration-200 ease-in-out hover:border-b-purple-600 hover:text-purple-600"
        >
          {" "}
          Suppliers{" "}
        </a>
      </nav>
    </div>
  </div>
  <div className="w-screen bg-gray-50">
    <div className="mx-auto max-w-screen-xl px-2 py-10">
      <div className="mt-4 w-full">
        <div className="flex w-full flex-col items-center justify-between space-y-2 sm:flex-row sm:space-y-0">
          <form className="relative flex w-full max-w-2xl items-center">
            <svg
              className="absolute left-2 block h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx={11} cy={11} r={8} className="" />
              <line x1={21} y1={21} x2="16.65" y2="16.65" className="" />
            </svg>
            <input
              type="name"
              name="search"
              className="h-12 w-full border-b-gray-400 bg-transparent py-4 pl-12 text-sm outline-none focus:border-b-2"
              placeholder="Search by Order ID, Date, Customer"
            />
          </form>
          <button
            type="button"
            className="relative mr-auto inline-flex cursor-pointer items-center rounded-full border border-gray-200 bg-white px-5 py-2 text-center text-sm font-medium text-gray-800 hover:bg-gray-100 focus:shadow sm:mr-0"
          >
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500" />
            <svg
              className="mr-2 h-3 w-3"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            Filter
          </button>
        </div>
      </div>
      <div className="mt-6 overflow-hidden rounded-xl bg-white px-6 shadow lg:px-4">
        <table className="min-w-full border-collapse border-spacing-y-2 border-spacing-x-2">
          <thead className="hidden border-b lg:table-header-group">
            <tr className="">
              <td className="whitespace-normal py-4 text-sm font-semibold text-gray-800 sm:px-3">
                Order Date
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="float-right mt-1 h-3 w-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </td>
              <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                Order ID
              </td>
              <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                Description
              </td>
              <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                Shop
              </td>
              <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                Customer
              </td>
              <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                Dimensions
              </td>
              <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                Weight
              </td>
              <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                Price
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="float-right mt-1 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                  />
                </svg>
              </td>
              <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                Status
              </td>
            </tr>
          </thead>
          <tbody className="bg-white lg:border-gray-300">
            <tr className="">
              <td className="whitespace-no-wrap py-4 text-left text-sm text-gray-600 sm:px-3 lg:text-left">
                07 February, 2022
                <div className="mt-1 flex flex-col text-xs font-medium lg:hidden">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-1 h-3 w-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    Jane Doeson
                  </div>
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-1 h-3 w-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 10h16M4 14h16M4 18h16"
                      />
                    </svg>
                    Desktop Computer
                  </div>
                  <div className="">24 x 10 x 5 cm</div>
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-1 h-3 w-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                      />
                    </svg>
                    1 Kg
                  </div>
                </div>
              </td>
              <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">
                62345231143
              </td>
              <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">
                Desktop Computer
              </td>
              <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">
                <img
                  className="h-8 w-8 overflow-hidden rounded-full border p-1"
                  src="data:image/png;base64,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"
                  alt=""
                />
              </td>
              <td className="whitespace-no-wrap hidden py-4 text-left text-sm text-gray-600 sm:px-3 lg:table-cell lg:text-left">
                Jane Doeson
              </td>
              <td className="whitespace-no-wrap hidden py-4 text-left text-sm text-gray-600 sm:px-3 lg:table-cell lg:text-left">
                24 x 10 x 5 cm
              </td>
              <td className="whitespace-no-wrap hidden py-4 text-left text-sm text-gray-600 sm:px-3 lg:table-cell lg:text-left">
                1.0 Kg
              </td>
              <td className="whitespace-no-wrap py-4 text-right text-sm text-gray-600 sm:px-3 lg:text-left">
                $59.00
                <span className="mt-1 ml-auto block w-fit whitespace-nowrap rounded-full bg-purple-100 px-2 py-0.5 text-center text-xs text-purple-800 lg:hidden">
                  Action Required
                </span>
              </td>
              <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-3 lg:table-cell">
                <span className="ml-2 mr-3 whitespace-nowrap rounded-full bg-purple-100 px-2 py-0.5 text-purple-800">
                  Action Required
                </span>
              </td>
            </tr>
            <tr className="">
              <td className="whitespace-no-wrap py-4 text-left text-sm text-gray-600 sm:px-3 lg:text-left">
                07 February, 2022
                <div className="mt-1 flex flex-col text-xs font-medium lg:hidden">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-1 h-3 w-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    Jane Doeson
                  </div>
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-1 h-3 w-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 10h16M4 14h16M4 18h16"
                      />
                    </svg>
                    Desktop Computer
                  </div>
                  <div className="">24 x 10 x 5 cm</div>
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-1 h-3 w-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                      />
                    </svg>
                    1 Kg
                  </div>
                </div>
              </td>
              <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">
                62345231143
              </td>
              <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">
                Desktop Computer
              </td>
              <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">
                <img
                  className="h-8 w-8 overflow-hidden rounded-full border p-1"
                  src="data:image/png;base64,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"
                  alt=""
                />
              </td>
              <td className="whitespace-no-wrap hidden py-4 text-left text-sm text-gray-600 sm:px-3 lg:table-cell lg:text-left">
                Jane Doeson
              </td>
              <td className="whitespace-no-wrap hidden py-4 text-left text-sm text-gray-600 sm:px-3 lg:table-cell lg:text-left">
                24 x 10 x 5 cm
              </td>
              <td className="whitespace-no-wrap hidden py-4 text-left text-sm text-gray-600 sm:px-3 lg:table-cell lg:text-left">
                1.0 Kg
              </td>
              <td className="whitespace-no-wrap py-4 text-right text-sm text-gray-600 sm:px-3 lg:text-left">
                $59.00
                <span className="mt-1 ml-auto block w-fit whitespace-nowrap rounded-full bg-blue-100 px-2 py-0.5 text-center text-xs text-blue-800 lg:hidden">
                  Pending
                </span>
              </td>
              <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-3 lg:table-cell">
                <span className="ml-2 mr-3 whitespace-nowrap rounded-full bg-blue-100 px-2 py-0.5 text-blue-800">
                  Pending
                </span>
              </td>
            </tr>
            <tr className="">
              <td className="whitespace-no-wrap py-4 text-left text-sm text-gray-600 sm:px-3 lg:text-left">
                07 February, 2022
                <div className="mt-1 flex flex-col text-xs font-medium lg:hidden">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-1 h-3 w-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    Jane Doeson
                  </div>
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-1 h-3 w-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 10h16M4 14h16M4 18h16"
                      />
                    </svg>
                    Desktop Computer
                  </div>
                  <div className="">24 x 10 x 5 cm</div>
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-1 h-3 w-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                      />
                    </svg>
                    1 Kg
                  </div>
                </div>
              </td>
              <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">
                62345231143
              </td>
              <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">
                Desktop Computer
              </td>
              <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">
                <img
                  className="h-8 w-8 overflow-hidden rounded-full border p-1"
                  src="data:image/png;base64,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"
                  alt=""
                />
              </td>
              <td className="whitespace-no-wrap hidden py-4 text-left text-sm text-gray-600 sm:px-3 lg:table-cell lg:text-left">
                Jane Doeson
              </td>
              <td className="whitespace-no-wrap hidden py-4 text-left text-sm text-gray-600 sm:px-3 lg:table-cell lg:text-left">
                24 x 10 x 5 cm
              </td>
              <td className="whitespace-no-wrap hidden py-4 text-left text-sm text-gray-600 sm:px-3 lg:table-cell lg:text-left">
                1.0 Kg
              </td>
              <td className="whitespace-no-wrap py-4 text-right text-sm text-gray-600 sm:px-3 lg:text-left">
                $59.00
                <span className="mt-1 ml-auto block w-fit whitespace-nowrap rounded-full bg-purple-100 px-2 py-0.5 text-center text-xs text-purple-800 lg:hidden">
                  Action Required
                </span>
              </td>
              <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-3 lg:table-cell">
                <span className="ml-2 mr-3 whitespace-nowrap rounded-full bg-purple-100 px-2 py-0.5 text-purple-800">
                  Action Required
                </span>
              </td>
            </tr>
            <tr className="">
              <td className="whitespace-no-wrap py-4 text-left text-sm text-gray-600 sm:px-3 lg:text-left">
                07 February, 2022
                <div className="mt-1 flex flex-col text-xs font-medium lg:hidden">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-1 h-3 w-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    Jane Doeson
                  </div>
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-1 h-3 w-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 10h16M4 14h16M4 18h16"
                      />
                    </svg>
                    Desktop Computer
                  </div>
                  <div className="">24 x 10 x 5 cm</div>
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-1 h-3 w-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                      />
                    </svg>
                    1 Kg
                  </div>
                </div>
              </td>
              <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">
                62345231143
              </td>
              <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">
                Desktop Computer
              </td>
              <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">
                <img
                  className="h-8 w-8 overflow-hidden rounded-full border p-1"
                  src="data:image/png;base64,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"
                  alt=""
                />
              </td>
              <td className="whitespace-no-wrap hidden py-4 text-left text-sm text-gray-600 sm:px-3 lg:table-cell lg:text-left">
                Jane Doeson
              </td>
              <td className="whitespace-no-wrap hidden py-4 text-left text-sm text-gray-600 sm:px-3 lg:table-cell lg:text-left">
                24 x 10 x 5 cm
              </td>
              <td className="whitespace-no-wrap hidden py-4 text-left text-sm text-gray-600 sm:px-3 lg:table-cell lg:text-left">
                1.0 Kg
              </td>
              <td className="whitespace-no-wrap py-4 text-right text-sm text-gray-600 sm:px-3 lg:text-left">
                $59.00
                <span className="mt-1 ml-auto block w-fit whitespace-nowrap rounded-full bg-blue-100 px-2 py-0.5 text-center text-xs text-blue-800 lg:hidden">
                  Pending
                </span>
              </td>
              <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-3 lg:table-cell">
                <span className="ml-2 mr-3 whitespace-nowrap rounded-full bg-blue-100 px-2 py-0.5 text-blue-800">
                  Pending
                </span>
              </td>
            </tr>
            <tr className="">
              <td className="whitespace-no-wrap py-4 text-left text-sm text-gray-600 sm:px-3 lg:text-left">
                07 February, 2022
                <div className="mt-1 flex flex-col text-xs font-medium lg:hidden">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-1 h-3 w-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    Jane Doeson
                  </div>
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-1 h-3 w-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 10h16M4 14h16M4 18h16"
                      />
                    </svg>
                    Desktop Computer
                  </div>
                  <div className="">24 x 10 x 5 cm</div>
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-1 h-3 w-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                      />
                    </svg>
                    1 Kg
                  </div>
                </div>
              </td>
              <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">
                62345231143
              </td>
              <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">
                Desktop Computer
              </td>
              <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">
                <img
                  className="h-8 w-8 overflow-hidden rounded-full border p-1"
                  src="data:image/png;base64,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"
                  alt=""
                />
              </td>
              <td className="whitespace-no-wrap hidden py-4 text-left text-sm text-gray-600 sm:px-3 lg:table-cell lg:text-left">
                Jane Doeson
              </td>
              <td className="whitespace-no-wrap hidden py-4 text-left text-sm text-gray-600 sm:px-3 lg:table-cell lg:text-left">
                24 x 10 x 5 cm
              </td>
              <td className="whitespace-no-wrap hidden py-4 text-left text-sm text-gray-600 sm:px-3 lg:table-cell lg:text-left">
                1.0 Kg
              </td>
              <td className="whitespace-no-wrap py-4 text-right text-sm text-gray-600 sm:px-3 lg:text-left">
                $59.00
                <span className="mt-1 ml-auto block w-fit whitespace-nowrap rounded-full bg-green-100 px-2 py-0.5 text-center text-xs text-green-800 lg:hidden">
                  Delivered
                </span>
              </td>
              <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-3 lg:table-cell">
                <span className="ml-2 mr-3 whitespace-nowrap rounded-full bg-green-100 px-2 py-0.5 text-green-800">
                  Delivered
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</>
