import { useEffect, useRef, useState } from "react";

type props = {
  routes: string[];
  defaultActiveIndex?: number;
  defaultHidden?: string[];
  children?: any;
};

export let activeTabLineRef: any;
export let activeTabRef: any;

const InPageNavigation = ({
  routes,
  defaultHidden = [],
  defaultActiveIndex = 0,
  children,
}: props) => {
  activeTabLineRef = useRef<HTMLHRElement>(null);
  activeTabRef = useRef<any>(null);
  const [inPageNavIndex, setInPageNavIndex] = useState(defaultActiveIndex);

  const handlePageState = (btn: HTMLButtonElement, i: number) => {
    let { offsetWidth, offsetLeft } = btn;
    if (activeTabLineRef.current) {
      activeTabLineRef.current.style.width = offsetWidth + "px";
      activeTabLineRef.current.style.left = offsetLeft + "px";
    }
    setInPageNavIndex(i);
  };

  useEffect(() => {
    handlePageState(activeTabRef.current, defaultActiveIndex);
  }, []);

  return (
    <>
      <div className="relative mb-8 bg-white border-b border-grey flex flex-nowrap overflow-x-auto">
        {routes.map((route, i) => {
          return (
            <button
              key={i}
              ref={i == defaultActiveIndex ? activeTabRef : null}
              className={
                "p-4 px-5 capitalize " +
                (inPageNavIndex == i ? "text-black" : "text-dark-grey ") +
                (defaultHidden.includes(route) ? "md:hidden " : " ")
              }
              onClick={(e) => handlePageState(e.target as HTMLButtonElement, i)}
            >
              {route}
            </button>
          );
        })}
        <hr ref={activeTabLineRef} className="absolute bottom-0 duration-300" />
      </div>
      {Array.isArray(children) ? children[inPageNavIndex] : children}
    </>
  );
};

export default InPageNavigation;
