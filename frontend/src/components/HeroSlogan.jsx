export default function HeroSlogan() {
  return (
    <div
      id="hero-slogan"
      className="flex flex-col justify-center items-center mx-auto "
    >
      <img
        src="/Logo big.svg"
        alt=""
        className="w-72 sm:w-96 md:w-96 lg:w-96 mb-6"
      />
      <h1 className="font-[450] text-2xl md:text-3xl text-center mb-4">
        Karena setiap akhir bulan
        <br />
        kita selalu bertanya hal yang sama.
      </h1>
    </div>
  );
}
