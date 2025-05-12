import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FadeIn } from "./Animations";
import { supabase } from "../supabaseClient";

import { Bounce, ToastContainer, toast } from "react-toastify";
import ReactDesignRain from "../components/ui/Reactconfeti";
const Waitlist: React.FC = () => {
  const [showRain, setShowRain] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (showRain) {
      const timer = setTimeout(() => {
        setShowRain(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showRain]);

  const JoinedWaitlist = () => {
    return toast.success("You have been successfully added to the waitlist!", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  const addToWaitlist = async (email) => {
    const { data, error } = await supabase.from("waitlist").insert([{ email }]);

    if (error) {
      console.error("Error inserting data:", error.message);

      throw error;
    } else {
      JoinedWaitlist();
      console.log("Data inserted successfully:", data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addToWaitlist(email);
      setShowRain(true);

      setEmail("");
    } catch (error) {
      if (error.code === "23505") {
        toast.info("You're already on the waitlist!");
      } else {
        toast.error("An error occurred, please try again later.");
      }
    }

    setEmail("");
  };

  return (
    <section id="waitlist" className="py-20 bg-primary/5">
      <div className="container-tight">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Join the <span className="text-gradient">Waitlist</span>
            </h2>
            <p className="text-muted-foreground mb-8">
              LinkFree is coming soon! Be the first to know when we launch and
              get early access to all features.
            </p>

            <form
              id="waitlist-form"
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <Input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter your email"
                className="h-11"
                required
              />
              <Button
                type="submit"
                className="bg-gradient-primary hover:opacity-90 transition-all text-white button-shine px-4 py-2 rounded-lg duration-150 active:scale-95 hover:scale-105"
              >
                Join Waitlist
              </Button>
            </form>

            <p className="text-xs text-muted-foreground mt-4">
              We'll never share your email with anyone else.
            </p>
          </div>
        </FadeIn>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />

      {showRain && <ReactDesignRain />}
    </section>
  );
};

export default Waitlist;
