"use client";
import { useEffect, useState } from "react";
import "./machine.scss";
import "./modal.scss";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import duration from "dayjs/plugin/duration";
import playAudio from "./library/audioplayer";
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(duration);

const slotList = [
  {
    icon: "/graphics/si-dino.png",
    onWin: () => {},
    winText: "You Win!",
    card: "/graphics/c_dino.png",
  },
  {
    icon: "/graphics/si-card.png",
    winText: "You Win!",
    card: "",
    onWin: () => {},
  },
  {
    icon: "/graphics/si-duck.png",
    card: "/graphics/c_duck.png",
    winText: "You Win!",
    onWin: () => {},
  },
  {
    icon: "/graphics/si-crown.png",
    card: "/graphics/c_crown.jpg",
    winText: "You Win!",
    onWin: () => {},
  },
  {
    icon: "/graphics/si-jp.png",
    winText: "JACKPOT",
    onWin: () => {
      console.log("jackpot");
    },
  },
];

export default function Home() {
  const [canPull, setCanPull] = useState(true);
  const [whileAnim, setWhileAnim] = useState(false);
  const [winText, setWinText] = useState("#PIXELCHRONICLE");
  const [showCardModal, setShowCardModal] = useState(false);
  const [showTimerModal, setShowTimerModal] = useState(false);
  const [activeMessageCard, setActiveMessageCard] = useState("");
  const [slotDisplay, setSlotDisplay] = useState<[boolean, boolean, boolean]>([
    false,
    false,
    false,
  ]);
  const [activeSlotIcons, setActiveSlotIcons] = useState<
    [string, string, string]
  >(["", "", ""]);

  const generateRandomSlots: () => [string, string, string] = () => {
    const slot1 = slotList[Math.floor(Math.random() * slotList.length)].icon;
    const slot2 = slotList[Math.floor(Math.random() * slotList.length)].icon;
    let slot3 = slotList[Math.floor(Math.random() * slotList.length)].icon;
    while (slot2 === slot3) {
      slot3 = slotList[Math.floor(Math.random() * slotList.length)].icon;
    }
    return [slot1, slot2, slot3];
    // setActiveSlotIcons([slot1.icon, slot2.icon, slot3.icon]);
  };

  const audioPull = (hit?: boolean) => {
    playAudio({
      src: "/audio/pull.wav",
    }).play();
    playAudio({
      src: "/audio/spin.mp3",
      volume: 0.2,
      destroy: 10,
    }).play(0.2);
    playAudio({
      src: "/audio/spin.mp3",
      volume: 0.5,
      destroy: 10,
    }).play(1.2);

    if (!hit) return;

    playAudio({
      src: "/audio/hitone.wav",
      destroy: 15,
      volume: 0.8,
    }).play(4);
    playAudio({
      src: "/audio/hittwo.wav",
      destroy: 15,
      volume: 0.8,
    }).play(4.8);
    playAudio({
      src: "/audio/hitthree.wav",
      destroy: 15,
      volume: 0.8,
    }).play(5.8);
  };
  const pull = () => {
    // setSlotDisplay([!slotDisplay[0], !slotDisplay[0], !slotDisplay[0]]);
    if (!canPull) return;

    audioPull(true);
    setWhileAnim(true);
    setCanPull(false);
    setSlotDisplay([true, true, true]);
    const roll = Math.random() * 3;
    const animDuration = 5500;
    setWinText(" - - - - - - - ");
    if (roll < 1) {
      // Win A random prize
      const prize = Math.floor(Math.random() * slotList.length);

      setActiveSlotIcons([
        slotList[prize].icon,
        slotList[prize].icon,
        slotList[prize].icon,
      ]);

      setTimeout(() => {
        const reward = slotList[prize];
        reward.onWin();
        setWinText(reward.winText);
        playAudio({
          src: "/audio/win.wav",
          destroy: 5,
          volume: 0.8,
        }).play(0.4);
        // Message Card
        if (prize !== slotList.length - 1) {
          setTimeout(() => {
            setShowCardModal(true);
            playAudio({
              src: "/audio/card.wav",
              destroy: 5,
              volume: 0.8,
            }).play(0.4);
            setActiveMessageCard(reward.card ?? "");
          }, 1000);
        } else {
          // Jackpot
          setTimeout(() => {
            setShowTimerModal(true);
          }, 1000);
        }

        setCanPull(false);
        setWhileAnim(false);
      }, animDuration);
    } else {
      // Got Random
      setActiveSlotIcons(generateRandomSlots());
      setTimeout(() => {
        setWinText("Try Again!");

        setWhileAnim(false);
        setCanPull(false);
      }, animDuration);
    }
    // setActiveSlotIcons
  };
  const reset = () => {
    if (whileAnim) return;
    audioPull();
    setWhileAnim(true);
    setCanPull(false);
    const resetDuration = 6000;
    setSlotDisplay([false, false, false]);

    setTimeout(() => {
      setWinText("#PIXELCHRONICLE");
      setWhileAnim(false);
      setCanPull(true);
    }, resetDuration);
    setActiveMessageCard("");
  };

  return (
    <main id="page_home">
      <h1 hidden={true}>PixelLink Jackpot</h1>
      <section className="slot-machine-desktop">
        <div className="slot-machine">
          <div className="results-display">
            <div className={canPull ? "results" : "results glow"}>
              <p>
                <span>◇ {winText} ◇</span>
              </p>
            </div>
          </div>
          <div className="slots">
            <Slot prize={activeSlotIcons[0]} show={slotDisplay[0]}></Slot>
            <Slot prize={activeSlotIcons[1]} show={slotDisplay[1]}></Slot>
            <Slot prize={activeSlotIcons[2]} show={slotDisplay[2]}></Slot>
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
        {canPull ? (
          <button
            className="btn-pull"
            onClick={pull}
            disabled={whileAnim === true}
          >
            {" "}
            PULL{" "}
          </button>
        ) : (
          <button
            className="btn-pull"
            onClick={reset}
            disabled={whileAnim === true}
          >
            {" "}
            RESET
          </button>
        )}
      </section>

      <section id="rewards">
        {/* IF active prize !== 5(JP) then show cardModal else show countdown */}
        <CardModal
          card={activeMessageCard}
          isVisible={showCardModal}
          onClose={() => {
            setShowCardModal(false);
          }}
        />
        <TimerModal
          isVisible={showTimerModal}
          onClose={() => {
            setShowTimerModal(false);
          }}
        />
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
        {new Array(20).fill("").map((_, index) => {
          const randomIcon = Math.floor(Math.random() * slotList.length);
          return (
            <div className="slot-tick" key={"randomized-" + index}>
              <hr />
              <img
                src={slotList[randomIcon].icon}
                alt=""
                className="slot-icon"
              />
              <hr />
            </div>
          );
        })}
        {/* <div className="slot-tick">
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
        </div> */}
        <div className="slot-tick end">
          <hr />
          <img src="" alt="" className="slot-icon none" />
          <hr />
        </div>
      </div>
    </div>
  );
}

type ModalProps = {
  isVisible: boolean;
  onClose: () => void;
};

type CardModalProps = ModalProps & {
  card: string;
};
function CardModal({ onClose, card, isVisible }: CardModalProps) {
  return (
    <div
      className={`modal-container ${isVisible ? "visible" : "hidden"}`}
      onClick={onClose}
    >
      <div className="card-container">
        <div className="card">
          <img src={card} alt="" />
        </div>
      </div>
      <p className="close-text">click anywhere to close</p>
    </div>
  );
}

function TimerModal({ onClose, isVisible }: ModalProps) {
  const [difference, setDifference] = useState(0);
  const diff = dayjs.duration(difference, "second");

  useEffect(() => {
    const interval = setInterval(() => {
      const targetDate = dayjs.tz("2024-05-11 12:00:00", "America/Los_Angeles");
      const localTimezone = dayjs().tz(dayjs.tz.guess());
      setDifference(targetDate.diff(localTimezone, "second"));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div
      className={`modal-container ${isVisible ? "visible" : "hidden"}`}
      onClick={onClose}
    >
      <img src="/decors/clock-decor.png" alt="" className="decor-clock" />
      <div className="timer-modal">
        <p className="time">
          {difference > 0 ? (
            <>
              <span>-{diff.get("days")}D:</span>
              <span>{diff.get("hours")}H:</span>
              <span>{diff.get("minutes")}M:</span>
              <span>{diff.get("seconds")}S</span>
            </>
          ) : (
            <span>The time is here.</span>
          )}
        </p>
        <div className="details">
          <hr />
          <p>
            The time is near.
            <a href="https://twitter.com/hashtag/PixelChronicle">
              #PixelChronicle
            </a>
          </p>
        </div>
      </div>
      <p className="close-text">click anywhere to close</p>
    </div>
  );
}
// function Modals({ children }: { children: React.ReactNode }) {
//   return <div className="modal-container">{children}</div>;
// }
