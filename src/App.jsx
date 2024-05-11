import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import logo from "./assets/logo.svg";
import glasses from "./assets/glasses.svg";
import SplitType from "split-type";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function App() {
  const [count, setCount] = useState(0);

  useGSAP(() => {
    let words = new SplitType(".words", { types: "chars" });
    let glasses = document.querySelector(".glasses");
    let glassesRect = glasses.getBoundingClientRect();
    let glassesTop = glassesRect.top;
    let glassesLeft = glassesRect.left;
    let glassesRight = glassesRect.right;
    let glassesBottom = glassesRect.bottom;

    const wordArray = gsap.utils.toArray(
      words.elements[0].querySelectorAll("div")
    );

    let tl = gsap.timeline().to(".words", {
      translateX: "-60%",
      duration: 28,
      repeat: -1,
    });

    wordArray.forEach((word) => {
      function isInRange(number, min, max) {
        return number >= min && number <= max;
      }

      let newGlassesRight = window.innerWidth - glassesRect.right;
      let middleGlasses = glassesRect.width / 2 + glassesLeft;
      let minRange = middleGlasses - (0.06944 * window.innerWidth);
      let maxRange = middleGlasses + (0.06944 * window.innerWidth);
      setInterval(() => {
        let wordRect = word.getBoundingClientRect();
        if (
          glassesRect.left + (0.06944 * window.innerWidth) < wordRect.left &&
          newGlassesRight + (0.06944 * window.innerWidth) < window.innerWidth - Math.abs(wordRect.x) &&
          !isInRange(wordRect.left, minRange, maxRange)
        ) {
          gsap.to(word, {
            fontSize: "80px",
            filter: "blur(0px)",
          });
        } else {
          gsap.to(word, {
            fontSize: "30px",
            filter: "blur(2px)",
          });
        }
      }, 10);
    });
  });

  return (
    <>
      <main className="bg-[#ECE6D8]">
        <nav className="flex flex-wrap justify-between items-center w-full p-3 px-6 font-sofia text-lg font-bold z-[100] relative">
          <ul className="flex justify-center items-center gap-4">
            <li className="cursor-pointer">Sunglasses</li>
            <li className="cursor-pointer">Eyeglasses</li>
          </ul>

          <img src={logo} alt="" />

          <ul className="flex justify-center items-center gap-4">
            <li>About</li>
            <li>Contact</li>
          </ul>
        </nav>

        {/* div containing the glasses and text */}
        <div className="relative flex justify-center items-center w-full overflow-hidden translate-y-[-10%]">
          <img
            className="glasses h-full w-[80%] relative z-[30] translate-y-[20%]"
            src={glasses}
            alt=""
          />
          <p className="words absolute w-[200%] text-nowrap text-center text-3xl left-[10%] top-[50%] translate-y-[-50%] z-[10] font-roboto">
            The human eye, a vital organ of vision, has evolved to provide not
            only the ability to see but also the capacity to distinguish between
            millions of colors. The human eye, a vital organ of vision, has
            evolved to provide not only the ability to see but also the capacity
            to distinguish between millions of colors
          </p>
        </div>

        {/* div containing the buttons */}
        <div className="flex gap-5 items-center justify-center translate-y-[-100px]">
          <div className="bg-[black] text-white rounded-[100px] p-3 px-6 cursor-pointer btns">
            Shop now
          </div>
          <div className="border-black border-2 text-black p-3  px-6  cursor-pointer rounded-[100px] btns">
            Learn more
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
