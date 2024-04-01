export function OrderItem() {
  return (
    <div className="py-5 flex flex-col gap-2 lg:flex-row">
      <div>
        <div className="flex gap-2">
          <img
            src="/macarons-mobile.png"
            alt=""
            className="h-[88px] w-[88px] rounded-full lg:w-[176px] lg:h-[176px]"
          />

          <div className="flex flex-col gap-1">
            <h3 className="text-2xl font-bold">Macarons</h3>
            <p className="text-light-300">
              Macarons é muito bom vale muito a pena comer
            </p>
            <div className="flex items-center gap-2">
              <p className="text-sm text-zinc-400 mt-auto">Quantidade: 2</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 items-start lg:ml-auto">
        <p className="text-2xl font-bold">R$10</p>

        <button className="mt-auto text-tomato-200 hover:underline lg:ml-auto">
          Remover
        </button>
      </div>
    </div>
  );
}
