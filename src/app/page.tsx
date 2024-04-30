"use client";
import { useState } from "react";
import "./machine.scss";

const slotList = [
  {
    icon: "/graphics/si-dino.png",
    onWin: () => {},
  },
  {
    icon: "/graphics/si-card.png",
    onWin: () => {},
  },
  {
    icon: "/graphics/si-duck.png",
    onWin: () => {},
  },
  {
    icon: "/graphics/si-crown.png",
    onWin: () => {},
  },
];

export default function Home() {
  const [canPull, setCanPull] = useState(true);
  const pull = () => {};

  return (
    <main id="page_home">
      <h1 hidden={true}>PixelLink Jackpot</h1>
      <section className="slot-machine-desktop">
        <div className="slot-machine">
          <div className="results-display">
            <div className="results">
              <p>
                <span>◇ JACKPOT ◇</span>
              </p>
            </div>
          </div>
          <div className="slots">
            <Slot prize="/graphics/si-dino.png" show={false}></Slot>
            <Slot prize="/graphics/si-duck.png" show={false}></Slot>
            <Slot prize="/graphics/si-dino.png" show={true}></Slot>
          </div>
          <div className="bottom-part">
            <p>
              {" "}
              website by{" "}
              <a target="_blank" href="https://twitter.com/@shubamium2">
                @shubamium
              </a>
            </p>
          </div>
        </div>
      </section>

      <section className="slot-action">
        <button className="btn-pull"> PULL </button>
      </section>
    </main>
  );
}

function Slot({ prize, show }: { prize: string; show: boolean }) {
  return (
    <div className="slot">
      <div className={`strip ${show ? "show" : ""}`}>
        <div className="slot-tick result">
          <hr />
          <img src={prize} alt="" className="slot-icon" />
          <hr />
        </div>
        <div className="slot-tick">
          <hr />
          <img src="/graphics/si-jp.png" alt="" className="slot-icon" />
          <hr />
        </div>
        <div className="slot-tick">
          <hr />
          <img src="/graphics/si-card.png" alt="" className="slot-icon" />
          <hr />
        </div>
        <div className="slot-tick">
          <hr />
          <img src="/graphics/si-crown.png" alt="" className="slot-icon" />
          <hr />
        </div>
        <div className="slot-tick">
          <hr />
          <img src="/graphics/si-dino.png" alt="" className="slot-icon" />
          <hr />
        </div>
        <div className="slot-tick">
          <hr />
          <img src="/graphics/si-duck.png" alt="" className="slot-icon" />
          <hr />
        </div>
        <div className="slot-tick">
          <hr />
          <img src="/graphics/si-jp.png" alt="" className="slot-icon" />
          <hr />
        </div>
        <div className="slot-tick">
          <hr />
          <img src="/graphics/si-card.png" alt="" className="slot-icon" />
          <hr />
        </div>
        <div className="slot-tick">
          <hr />
          <img src="/graphics/si-crown.png" alt="" className="slot-icon" />
          <hr />
        </div>
        <div className="slot-tick">
          <hr />
          <img src="/graphics/si-dino.png" alt="" className="slot-icon" />
          <hr />
        </div>
        <div className="slot-tick">
          <hr />
          <img src="/graphics/si-duck.png" alt="" className="slot-icon" />
          <hr />
        </div>
        <div className="slot-tick">
          <hr />
          <img src="/graphics/si-jp.png" alt="" className="slot-icon" />
          <hr />
        </div>
        <div className="slot-tick">
          <hr />
          <img src="/graphics/si-card.png" alt="" className="slot-icon" />
          <hr />
        </div>
        <div className="slot-tick">
          <hr />
          <img src="/graphics/si-crown.png" alt="" className="slot-icon" />
          <hr />
        </div>
        <div className="slot-tick">
          <hr />
          <img src="/graphics/si-dino.png" alt="" className="slot-icon" />
          <hr />
        </div>
        <div className="slot-tick">
          <hr />
          <img src="/graphics/si-duck.png" alt="" className="slot-icon" />
          <hr />
        </div>
        <div className="slot-tick">
          <hr />
          <img src="/graphics/si-jp.png" alt="" className="slot-icon" />
          <hr />
        </div>
        <div className="slot-tick">
          <hr />
          <img src="/graphics/si-card.png" alt="" className="slot-icon" />
          <hr />
        </div>
        <div className="slot-tick">
          <hr />
          <img src="/graphics/si-crown.png" alt="" className="slot-icon" />
          <hr />
        </div>
        <div className="slot-tick">
          <hr />
          <img src="/graphics/si-dino.png" alt="" className="slot-icon" />
          <hr />
        </div>
        <div className="slot-tick">
          <hr />
          <img src="/graphics/si-duck.png" alt="" className="slot-icon" />
          <hr />
        </div>
        <div className="slot-tick end">
          <hr />
          <img src="" alt="" className="slot-icon none" />
          <hr />
        </div>
      </div>
    </div>
  );
}
