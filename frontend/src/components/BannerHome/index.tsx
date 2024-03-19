export function BannerHome() {
  return (
    <div className="relative min-h-[120px] bg-custom-gradient mx-7 mt-[44px] mb-[38px] rounded-md flex items-center justify-center lg:mt-[160px] lg:h-[260px] xl:mx-32">
      <div>
        {/* Mobile Image */}
        <img
          src="/macarons-mobile.png"
          alt="macarons"
          className="absolute bottom-0 -left-7 lg:-left-20 lg:hidden"
        />
        {/* Desktop Image */}
        <img
          src="/macarons-desktop.png"
          alt="macarons"
          className="absolute bottom-0 -left-7 lg:-left-20 hidden lg:block"
        />
      </div>
      <div className="ml-[160px] lg:ml-auto pr-2 lg:pr-8 xl:pr-20 2xl:pr-[300px]">
        <h1 className="font-semibold text-light-300 text-xl md:text-2xl lg:text-5xl">
          Sabores inigualáveis
        </h1>
        <p className="text-light-300 mt-2">
          Sinta o cuidado do preparo com ingredientes selecionados.
        </p>
      </div>
    </div>
  );
}
