import { Link, animateScroll } from "react-scroll";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [color, setColor] = useState("transparent");
  const [textColor, setTextColor] = useState("white");

  const handleNav = () => {
    setNav(!nav);
  };

  useEffect(() => {
    const changeColor = () => {
      if (window.scrollY >= 90) {
        setColor("#700e2b");
        setTextColor("#ffffff");
      } else {
        setColor("transparent");
        setTextColor("#ffffff");
      }
    };
    window.addEventListener("scroll", changeColor);
  }, []);

  return (
    <div
      style={{ backgroundColor: `${color}` }}
      className="fixed left-0 top-0 z-10 w-full duration-300 ease-in"
    >
      <div className="m-auto flex max-w-[1240px] items-center justify-between p-4 text-white">
        <Link
          to="#"
          href="/#"
          smooth={true}
          duration={500}
          onClick={() => {
            animateScroll.scrollToTop({
              duration: 500,
              smooth: "easeInOutQuart",
            });
          }}
        >
          <div className="flex items-center">
            <Image
              src="/favicon.ico"
              alt="Logo"
              width={50}
              height={45}
              className=" m-3"
            />
            <h1
              style={{
                color: `${textColor}`,
                display: "inline-block",
                verticalAlign: "middle",
              }}
              className="font-custom text-4xl"
            >
              TeachSync
            </h1>
          </div>
        </Link>
        <ul style={{ color: `${textColor}` }} className="hidden sm:flex">
          <li className="p-4">
            <Link
              to="#"
              href="localhost:3000/search"
              smooth={true}
              duration={500}
              onClick={() => {
                animateScroll.scrollToTop({
                  duration: 500,
                  smooth: "easeInOutQuart",
                });
              }}
            >
              Course finder
            </Link>
          </li>
          <li className="p-4">
            <Link
              to="about"
              href="/#about"
              smooth={true}
              duration={500}
              offset={-50}
            >
              Doubts
            </Link>
          </li>
          <li className="p-4">
            <Link
              to="products"
              href="/#products"
              smooth={true}
              duration={500}
              offset={-130}
            >
              PYQs
            </Link>
          </li>
          <li className="p-4">
            <Link
              to="contact"
              href="/#contact"
              smooth={true}
              duration={500}
              offset={-100}
            >
              Sign Out
            </Link>
          </li>
        </ul>

        
        {/* Mobile Menu */}
        <div
          className={
            nav
              ? "absolute bottom-0 left-0 right-0 top-0 flex h-screen w-full items-center justify-center bg-black text-center duration-300 ease-in sm:hidden"
              : "absolute bottom-0 left-[-100%] right-0 top-0 flex h-screen w-full items-center justify-center bg-black text-center duration-300 ease-in sm:hidden"
          }
        >
          <Link
            to="#"
            href="/#"
            smooth={true}
            duration={500}
            onClick={() => {
              animateScroll.scrollToTop({
                duration: 500,
                smooth: "easeInOutQuart",
              });
            }}
          >
          </Link>
          <ul>
            <li className="p-4 text-4xl hover:text-gray-500">
              <Link
                to="#"
                href="/#"
                smooth={true}
                duration={500}
                onClick={() => {
                  handleNav()
                  animateScroll.scrollToTop({
                    duration: 500,
                    smooth: "easeInOutQuart",
                  });
                }}
              >
                Home
              </Link>
            </li>
            <li className="p-4 text-4xl hover:text-gray-500">
              <Link
                to="about"
                href="/#about"
                smooth={true}
                duration={500}
                offset={-100}
                onClick={handleNav}
              >
                About Us
              </Link>
            </li>
            <li className="p-4 text-4xl hover:text-gray-500">
              <Link
                to="products"
                href="/#products"
                smooth={true}
                duration={500}
                offset={-120}
                onClick={handleNav}
              >
                Products
              </Link>
            </li>
            <li className="p-4 text-4xl hover:text-gray-500">
              <Link
                to="contact"
                href="/#contact"
                smooth={true}
                duration={500}
                offset={-100}
                onClick={handleNav}
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
