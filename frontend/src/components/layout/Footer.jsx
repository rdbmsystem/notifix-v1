const Footer = () => {
  return (
    <div className="max-w-7xl mx-auto p-10 flex justify-between ">
      <div>
        <img className="h-4" src="/small-logo-v1.png" alt="notifix" />
        <p className="text-slate-600 pt-1 text-sm">
          Copyright &copy; 2024 by Rain Kun, Inc. All rights reserved.{" "}
        </p>
      </div>
      <div>
        <p>Contact us</p>
        <div className="text-gray-400 text-sm pt-2">
          <p className="pb-4">Calle Luna, Ayala, Zamboanga City, PH 7000</p>
          <a href="tel:143-222-5462">143-222-5462</a>
          <br />
          <a href="mailto:rdbmsystem@gmail.com">rdbmsystem@gmail.com</a>
        </div>
      </div>
      <div>
        <p className="">Account</p>
        <div className="text-gray-400 text-sm pt-2">Register</div>
        <div className="text-gray-400 text-sm pt-2">Login</div>
        <div className="text-gray-400 text-sm pt-2">Facebook</div>
        <div className="text-gray-400 text-sm pt-2">Instagram</div>
      </div>
      <div>
        <p className="">Company</p>
        <div className="text-gray-400 text-sm pt-2">About</div>
        <div className="text-gray-400 text-sm pt-2">For Business</div>
        <div className="text-gray-400 text-sm pt-2">Careers</div>
      </div>
      <div>
        <p className="">Resources</p>
        <div className="text-gray-400 text-sm pt-2">Documentations</div>
        <div className="text-gray-400 text-sm pt-2">Help center</div>
        <div className="text-gray-400 text-sm pt-2">Privacy & terms</div>
      </div>
    </div>
  );
};

export default Footer;
