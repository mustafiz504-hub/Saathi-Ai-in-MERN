import { ArrowLeft, LogIn, SearchX } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[100dvh] overflow-hidden bg-[#d9e0ff] text-[#24336f]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(127,152,255,0.34),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(95,128,255,0.18),_transparent_28%)]" />

      <div className="relative mx-auto grid min-h-[100dvh] max-w-6xl items-center gap-12 px-6 py-10 lg:grid-cols-[1.1fr_0.9fr] lg:px-10">
        <div className="max-w-2xl">
          <p className="inline-flex rounded-full border border-white/70 bg-white/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-[#6071b5] backdrop-blur-sm">
            Error 404
          </p>

          <h1 className="mt-6 text-4xl font-black leading-tight text-[#2c3e86] sm:text-5xl lg:text-6xl">
            This page could not be found.
          </h1>

          <p className="mt-5 max-w-lg text-base leading-8 text-[#5668a7] sm:text-lg">
            The page may have moved or this route does not exist.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => navigate("/Login")}
              className="btn h-12 border-0 bg-[#5f80ff] px-6 text-white shadow-[0_14px_30px_rgba(95,128,255,0.32)] hover:bg-[#4f73ff]"
            >
              <LogIn className="h-4 w-4" />
              Go to Login
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="btn h-12 border-[#c9d5ff] bg-white/85 px-6 text-[#4d63b3] hover:border-[#b6c7ff] hover:bg-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </button>
          </div>
        </div>

        <div className="flex flex-col items-start justify-center lg:items-end">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/75 text-[#4f73ff] shadow-sm ring-1 ring-white/60">
            <SearchX className="h-7 w-7" />
          </div>

          <div className="mt-6 text-left lg:text-right">
            <p className="text-[5.5rem] font-black leading-none tracking-[-0.06em] text-[#4f73ff] sm:text-[7rem] lg:text-[9rem]">
              404
            </p>
            <div className="mt-4 h-px w-40 bg-[#9fb1ff] sm:w-52 lg:ml-auto" />
            <p className="mt-4 max-w-sm text-base leading-8 text-[#5c6ea9] lg:ml-auto">
              No page matches this URL.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageNotFound;
