
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate= useNavigate();
  const [scrolled, setScrolled] = useState(false);

  const scrollToWaitlist = () => {
    const waitlistSection = document.getElementById("waitlist");
    if (waitlistSection) {
      waitlistSection.scrollIntoView({ behavior: "smooth" });
    }
  };


  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-500 ease-in-out ${
        scrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container-tight flex items-center justify-between">
        <div className="flex items-center">
          <a
            href="#"
            className="text-2xl font-semibold text-primary flex items-center"
          >
            <span className="text-gradient">Link</span>
            <span>Free</span>
          </a>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <a
            href="#features"
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            Features
          </a>
          <a
            href="#templates"
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            Templates
          </a>
          <a
            href="#how-it-works"
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            How it works
          </a>
          <a
            href="https://github.com/shravankumar8/LinkFree"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors flex items-center gap-1"
          >
            <Github size={16} />
            <span>GitHub</span>
          </a>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/login">
            <Button
              variant="ghost"
              size="sm"
              className="hidden md:inline-flex transition-all"
            >
              Log in
            </Button>
          </Link>

          <Button
            onClick={() => {
              navigate("/signup");
            }}
            className="bg-gradient-primary hover:opacity-90 transition-all text-white button-shine"
          >
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
