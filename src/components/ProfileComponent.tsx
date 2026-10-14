export default function ProfileComponent() {
  return (
    <div className="hover:bg-yellow-50 flex p-1 gap-2 justify-center items-center cursor-pointer">
      <div className="bg-black rounded-full w-10 h-10"></div>
      <div className="flex flex-col gap-0">
        <p className="text-lg font-medium">Павел Тюхтинов</p>
        <div className="flex gap-1 items-end">
          <p className="text-sm">Баланс:</p>
          <p className="text-sm font-medium">1000</p>
          <p className="text-sm font-medium">₽</p>
        </div>
      </div>
    </div>
  );
}
