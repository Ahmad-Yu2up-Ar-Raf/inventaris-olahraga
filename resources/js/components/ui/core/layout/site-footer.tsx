

export default function SiteFooter() {
  return (
    <footer className="rounded-4xl sticky bottom-0 font-jakarta-sans w-full bg-[#1F3A4B] pb-10 text-[#FAFDEE]">
    <h1 className="mt-10 text-center text-[15.5vw] font-bold leading-[0.9] tracking-tighter lg:text-[16.6vw]">
     Pinjam.com
    </h1>
    <div className="mt-80 flex w-full flex-col items-start gap-5 px-4 font-medium lg:mt-0 lg:flex-row lg:justify-between">
      <div className="flex w-full items-center justify-between gap-12 uppercase lg:w-fit lg:justify-center">
        <p className="w-fit text-sm">
          punjab, india <br />
          and online
        </p>
        <p className="w-fit text-right text-sm lg:text-left">
          sep 1, 2025 <br /> the Moosa pind
        </p>
      </div>
      <div className="flex w-full flex-wrap items-center justify-between gap-12 uppercase lg:w-fit lg:justify-center">
        <p className="w-fit text-sm">
          onilne <br /> free
        </p>
        <p className="w-fit text-right text-sm lg:text-left">
          in person tickets <br /> $600
        </p>
      </div>
    </div>
  </footer>
  );
}
