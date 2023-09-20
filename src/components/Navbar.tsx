// import { Link, animateScroll } from "react-scroll";
import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useUser } from '@auth0/nextjs-auth0/client';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [color, setColor] = useState("transparent");
  const [textColor, setTextColor] = useState("white");

  const handleNav = () => {
    setNav(!nav);
  };

  const { user, error, isLoading } = useUser();

  return (
    <div
      style={{ backgroundColor: `${color}` }}
      className="fixed left-0 top-0 z-10 w-full duration-300 ease-in"
    >
      <div className="m-auto flex max-w-[1240px] items-center justify-between p-4 text-white">
        <Link
          href="/#"
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
              href="/search"
            >
              Course finder
            </Link>
          </li>
          <li className="p-4">
            <Link
              href="/doubts"
            >
              Doubts
            </Link>
          </li>
          <li className="p-4">
            <Link
              href={user ? `/api/auth/logout` : `/api/auth/login`}
            >
              {user ? 'Logout' : 'Login'}
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
