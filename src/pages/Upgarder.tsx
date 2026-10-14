export default function UpgradePage() {
  return (
    <section>
      <h1 className="text-3xl font-bold">Апгрейд</h1>
      <div className="bg-white p-2 flex flex-col gap-4">
        <div className="bg-green-300 p-2 flex justify-between w-full gap-4">
          <div className="bg-black w-full flex flex-col gap-4">
            <div className="border-blue-300 border-2  flex flex-col items-center justify-center">
              <p>Выберите предмет на апгрейд</p>
              <img
                src="src/assets/large-67371dfa7df02.avif"
                alt=""
                className="w-64"
              />
              <div className="bg-black w-full p-2 flex justify-between items-center">
                <div className="flex flex-col gap-0">
                  <p className="text-md font-bold">AWP</p>
                  <p className="text-base">Древесная гадюка</p>
                </div>
                <p>3006 ₽</p>
              </div>
            </div>
            <div className="flex justify-between p-2">
              <p>Выберите баланс</p>
              <p>0 ₽</p>
            </div>
          </div>
          <div className="border-green-900 border-2 w-full"></div>
          <div className="bg-black w-full flex flex-col gap-4">
            <div className="border-blue-300 border-2 w-full flex flex-col items-center justify-center">
              <p>Оружие которое хотите получить</p>
              <img
                src="src/assets/large-67371dfa7df02.avif"
                alt=""
                className="w-64"
              />
              <div className="bg-black w-full p-2 flex justify-between items-center">
                <div className="flex flex-col gap-0">
                  <p className="text-md font-bold">AWP</p>
                  <p className="text-base">Древесная гадюка</p>
                </div>
                <p>3006 ₽</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-2">
              <div className="bg-red-300 py-2 px-4 w-full flex items-center justify-center rounded-lg">
                <p>2x</p>
              </div>
              <div className="bg-red-300 py-2 px-4 w-full flex items-center justify-center rounded-lg">
                <p>5x</p>
              </div>
              <div className="bg-red-300 py-2 px-4 w-full flex items-center justify-center rounded-lg">
                <p>10%</p>
              </div>
              <div className="bg-red-300 py-2 px-4 w-full flex items-center justify-center rounded-lg">
                <p>25%</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-amber-200 p-2"></div>
      </div>
    </section>
  );
}
