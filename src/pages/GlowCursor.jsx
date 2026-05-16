import { useEffect, useRef } from "react";

function GlowCursor() {
  const glowRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const glowPos = useRef({ x: 0, y: 0 });
  const raf = useRef(null);

  useEffect(() => {
    const glow = glowRef.current;
;    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      glowPos.current.x += (pos.current.x - glowPos.current.x) * 0.25;
      glowPos.current.y += (pos.current.y - glowPos.current.y) * 0.25 ;
      glow.style.transform = `translate(${glowPos.current.x}px, ${glowPos.current.y}px)`;
      raf.current = requestAnimationFrame(animate);
    };

    const onEnterClickable = () => {
      glow.classList.add("cursor-hover");
    };

    const onLeaveClickable = () => {

      glow.classList.remove("cursor-hover");
    };

    const attachHoverListeners = () => {
      document.querySelectorAll("a, button, [role='button']").forEach((el) => {
        el.addEventListener("mouseenter", onEnterClickable);
        el.addEventListener("mouseleave", onLeaveClickable);
      });
    };

    window.addEventListener("mousemove", onMove);
    raf.current = requestAnimationFrame(animate);
    attachHoverListeners();

    // re-attach on DOM changes (for dynamic content)
    const observer = new MutationObserver(attachHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={glowRef} className="cursor-glow" />
\    </>
  );
}

export default GlowCursor;
