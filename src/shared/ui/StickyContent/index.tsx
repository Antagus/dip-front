import { observer } from "mobx-react-lite";
import React, { useRef, useState, useEffect } from "react";
import { useDevice } from "shared/hooks";
import { themeStore } from "shared/store";

type StickySectionProps = {
  children: React.ReactNode;
};

export const StickySection: React.FC<StickySectionProps> = observer(
  ({ children }) => {
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const { theme } = themeStore;
    const [isSticky, setSticky] = useState<boolean>(false);
    const { isMobile } = useDevice();

    useEffect(() => {
      const handleScroll = () => {
        if (!sectionRef.current) return;

        const rect = sectionRef.current.getBoundingClientRect();

        if (rect.top <= 0 && isSticky) {
          setSticky(false);
        } else if (rect.top > 0 && !isSticky) {
          setSticky(true);
        }
      };

      window.addEventListener("scroll", handleScroll);
      handleScroll();

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, [isSticky, theme]);

    return (
      <section
        ref={sectionRef}
        style={
          // eslint-disable-next-line no-nested-ternary
          isMobile
            ? {
                position: "fixed",
                bottom: 0,
                right: 0,
                zIndex: 1,
                backgroundColor: theme === "dark" ? "#191919" : "#ffffff",
                width: "100%",
                boxSizing: "border-box",
                padding: "16px",
              }
            : isSticky
            ? {
                position: "sticky",
                bottom: 0,
                left: 0,
                zIndex: 1,

                backgroundColor: theme === "dark" ? "#191919" : "#ffffff",
                ...(isMobile ? { alignSelf: "flex-end" } : {}),
              }
            : { ...(isMobile ? { alignSelf: "flex-end" } : {}) }
        }
      >
        {children}
      </section>
    );
  }
);
