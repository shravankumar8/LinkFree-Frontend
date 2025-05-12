import React from "react";
import { Button } from "@/components/ui/button";
import { Github, Twitter, Heart } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary/70 pt-20 pb-10">
      <div className="container-tight">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <a
              href="#"
              className="text-2xl font-semibold text-primary flex items-center"
            >
              <span className="text-gradient">Link</span>
              <span>Free</span>
            </a>
            <p className="mt-4 text-muted-foreground">
              The open-source alternative to Linktree that gives you full
              control over your online presence. Customize your page, share your
              links, and grow your audience—all for free.
            </p>
            <div className="mt-6 flex gap-4">
              <a
                href="https://github.com/shravankumar8/LinkFree"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Github />
              </a>
              <a
                href="https://x.com/Shravankumar8_"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Twitter />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-4">Product</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#features"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#templates"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Templates
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  How It Works
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-4">Community</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://github.com/shravankumar8/LinkFree"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contributors
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Join Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ProvenLabs.
        
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
