const ComingSoon = () => {
  return (
    <div
      className="relative flex h-screen w-full items-center justify-center bg-cover bg-center px-5 text-center"
      style={{
        backgroundImage: "url(./consule.jpg)",
      }}
    >
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-gray-900 opacity-75" />
      <div className="z-50 flex h-screen w-full flex-col justify-center text-white">
        <span className="text-bold mb-2">
          Consulate General of Lao PDR in HCMC
        </span>
        <h1 className="text-5xl">
          This page is under <b>Building</b>!
        </h1>

        <div className="mx-auto mt-6 flex text-white">
          <a
            href="https://www.facebook.com/profile.php?id=61554098430197"
            target="_blank"
            rel="noreferrer"
          >
            <svg
              fill="currentColor"
              className="mr-2 h-10 cursor-pointer"
              viewBox="0 0 24 24"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              xmlSpace="preserve"
              style={{
                fillRule: "evenodd",
                clipRule: "evenodd",
                strokeLinejoin: "round",
                strokeMiterlimit: 2,
              }}
            >
              <path
                id="Facebook"
                d="M24,12c0,6.627 -5.373,12 -12,12c-6.627,0 -12,-5.373 -12,-12c0,-6.627
              5.373,-12 12,-12c6.627,0 12,5.373
              12,12Zm-11.278,0l1.294,0l0.172,-1.617l-1.466,0l0.002,-0.808c0,-0.422
              0.04,-0.648 0.646,-0.648l0.809,0l0,-1.616l-1.295,0c-1.555,0 -2.103,0.784
              -2.103,2.102l0,0.97l-0.969,0l0,1.617l0.969,0l0,4.689l1.941,0l0,-4.689Z"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
