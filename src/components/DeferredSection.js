import { useEffect, useRef, useState } from "react";

export default function DeferredSection({
  children,
  rootMargin = "700px 0px",
  minHeight = 320,
  className = "",
}) {
  const ref = useRef(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element || !("IntersectionObserver" in window)) {
      setShouldRender(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div
      ref={ref}
      className={className}
      style={shouldRender ? undefined : { minHeight }}
    >
      {shouldRender ? children : null}
    </div>
  );
}
