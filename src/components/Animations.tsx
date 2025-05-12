
import React, { useEffect, useRef, ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  duration?: number;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
  threshold?: number;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  duration = 0.6,
  delay = 0,
  direction = "up",
  className = "",
  threshold = 0.1,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement;
            element.style.opacity = "1";
            element.style.transform = "translateY(0) translateX(0)";
            observer.unobserve(element);
          }
        });
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  let initialTransform = "translateY(0) translateX(0)";
  switch (direction) {
    case "up":
      initialTransform = "translateY(20px) translateX(0)";
      break;
    case "down":
      initialTransform = "translateY(-20px) translateX(0)";
      break;
    case "left":
      initialTransform = "translateY(0) translateX(20px)";
      break;
    case "right":
      initialTransform = "translateY(0) translateX(-20px)";
      break;
    default:
      initialTransform = "translateY(0) translateX(0)";
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: 0,
        transform: initialTransform,
        transition: `opacity ${duration}s ease-out ${delay}s, transform ${duration}s ease-out ${delay}s`,
      }}
    >
      {children}
    </div>
  );
};

export const FloatingElement: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className = "",
}) => {
  return <div className={`animate-float ${className}`}>{children}</div>;
};

export const PulsatingElement: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className = "",
}) => {
  return <div className={`animate-pulse-light ${className}`}>{children}</div>;
};

export const RotatingElement: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className = "",
}) => {
  return <div className={`animate-rotate-slow ${className}`}>{children}</div>;
};

export const ScaleOnHover: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className = "",
}) => {
  return (
    <div className={`transition-transform duration-300 hover:scale-105 ${className}`}>
      {children}
    </div>
  );
};
