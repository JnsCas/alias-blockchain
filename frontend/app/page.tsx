import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-8xl font-bold py-8 text-center">human alias for crypto wallets</h1>
      <p className="text-lg text-gray-500 max-w-2xl text-center">
        human alias for crypto wallets is a platform that allows you to create a human alias for your crypto wallet.
      </p>
      <div className="flex gap-4 w-full max-w-md py-8">
        <input type="text" placeholder="Find by address or alias" className="w-full max-w-md p-2 rounded-md border border-gray-300 flex-1" />
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md bg-transparent hover:bg-white hover:text-black border border-gray-300 font-bold">Find</button>
      </div>
    </div>
  );
}
