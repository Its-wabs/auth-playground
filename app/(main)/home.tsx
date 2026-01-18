"use client";
import SignUp from "../components/signup";
import Image from "next/image";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { SplitText } from "gsap/SplitText";
import { useEffect } from "react";
import Login from "../components/login";
import ResetPassword from "../components/reset-password";
import ResetPage from "../components/resetPage";
import { useSearchParams } from "next/navigation";


export default function Home() {

  const searchParams = useSearchParams();
  

  useEffect(() => {
    gsap.registerPlugin(CustomEase, SplitText);
    CustomEase.create("hop", ".8, 0, .3, 1");
const splitTextElement = (
  selector: string,
  type = "words,chars",
  addFirstChar = false
) => {
  const elements = document.querySelectorAll(selector);

  elements.forEach((el) => {
    const splitText = new SplitText(el, {
      type,
      wordsClass: "word",
      charsClass: "char",
    });

    if (type.includes("chars")) {
      splitText.chars.forEach((char, index) => {
        const originalText = char.textContent;

        char.innerHTML = `<span>${originalText}</span>`;

        if (addFirstChar && index === 0) {
          char.classList.add("first-char");
        }
      });
    }
  });
};


    splitTextElement(".intro-title h1", "words,chars", true);
    splitTextElement(".outro-title h1");
    splitTextElement(".tag p","words");
    splitTextElement(".card h1","words,chars", true); 

    gsap.set([".intro-title h1", ".outro-title h1", ".card h1", ".overlay-tags p"], { 
  opacity: 1, 
  visibility: "visible" 
});

    const isMobile = window.innerWidth <= 1000;

    gsap.set(
      [".split-overlay .intro-title .first-char span",
      ".split-overlay .outro-title .char span",
      ], { y : "0%"}
    );

    gsap.set(".split-overlay .intro-title .first-char", { 
  x: isMobile ? "4.5rem" : "18rem", // Reduced mobile X
  y : isMobile ? "-0.4rem" : "-2.75rem", // Adjusted mobile Y for smaller font
  fontWeight: "900",  
  scale: 0.75,
});

gsap.set(".split-overlay .outro-title .char", { 
  x: isMobile ? "-1.5rem" : "-8rem", // Reduced mobile X
  fontSize: isMobile ? "5rem" : "14rem", // Scale the V.1 font for mobile
  fontWeight: "500",  
});


       const tl = gsap.timeline({ defaults: { ease: "hop" } });
       const tags = gsap.utils.toArray<HTMLElement>(".tag");

       tags.forEach((tag, index) => {
        tl.to(
           tag.querySelectorAll("p .word"), {
          y: "0%", 
          duration: 0.75,
          
        }, 0.5 + index * 0.1);
       });

       tl.to(".preloader .intro-title .char span", {
      y: "0%",
      duration: 0.75,
      stagger: 0.05,      } ,
       0.5)
       .to(".preloader .intro-title .char:not(.first-char) span", {
      y: "100%",
      duration: 0.75,
      stagger: 0.05,
      
    }, 2)
    .to(".preloader .outro-title .char span", {
      y: "0%",
      duration: 0.75,
      stagger: 0.075,
    },2.5 )
    .to(".preloader .intro-title .first-char", {
  x: isMobile ? "5.5rem" : "21.25rem", // Proportional movement
  duration: 1,
}, 3.5)
.to(".preloader .outro-title .char", {
  x: isMobile ? "-1.5rem" : "-8rem", // Keep it stable
  duration: 1,
}, 3.5)

// Around line 133 (the 4.5 second mark)
.to(".preloader .intro-title .first-char", {
  x: isMobile ? "4.5rem" : "18rem", 
  y : isMobile ? "-0.4rem" : "-2.75rem",
  scale: 0.75,
  fontWeight: "900",  
  duration: 0.75,  
}, 4.5)
.to(".preloader .outro-title .char", {
  x: isMobile ? "-1.5rem" : "-8rem",  
  fontSize: isMobile ? "5rem" : "14rem",
  fontWeight: "500",  
  duration: 0.75,
  onComplete: () => {
    // ... your existing clipPath logic
  },
}, 4.5)
    .to(".preloader .outro-title .char", {
      x: isMobile ? "-3rem" : "-8rem",  
      fontSize: isMobile ? "6rem" : "14rem",
      fontWeight: "500",  
      duration: 0.75,
      onComplete: () => {
        gsap.set(".preloader", {
          clipPath: "polygon(0% 0%, 100% 0, 100% 50%, 0% 50%)",
        });
        gsap.set(".split-overlay", {
          clipPath: "polygon(0% 50%, 100% 50%, 100% 100%, 0% 100%)",
        });
      },
    },4.5)
    .to(".container",{
      clipPath: "polygon(0% 48%, 100% 48%, 100% 52%, 0% 52%)",
      duration: 1,
    },5);

    tags.forEach((tag, index) => {
      tl.to(
        tag.querySelectorAll("p .word"), {
       y: "100%", 
       duration: 0.75,
       
     }, 5.5 + index * 0.1);
    });

    tl.to(
      [".preloader", ".split-overlay"], {
      y : (i) => i === 0 ? "-50%" : "50%",
      duration: 1,
     
    }, 6
    )
    .to(".container",{ 
       clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 1,
    }, 6)
    .to(".container .card", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 0.75,
    }, 6.25)
    .to(".container .card h1 .char span", {
      y: "0%",
      duration: 0.75,
      stagger: 0.05,
    }, 6.5 );


  }, []);

 useEffect(() => {
  

    // login/signup card animation

    const loginCard = document.querySelector(".login-card");
const signupCard = document.querySelector(".signup-card");
const resetCard = document.querySelector(".reset-card");
const resetNewCard = document.querySelector(".resetnew-card");

gsap.set(signupCard, {
  scale: 0.95,
  y: 20,
  rotate: -4,
  zIndex: 1,
  pointerEvents: "none",
});

gsap.set(resetCard, {
  scale: 0.95,
  y: 20,
  rotate: -4,
  zIndex: 1,
  pointerEvents: "none",
});

gsap.set(resetNewCard, {
  scale: 0.95,
  y: 20,
  rotate: -4,
  zIndex: 1,
  pointerEvents: "none",
});

gsap.set(loginCard, {
  scale: 1,
  y: 0,
  rotate: 0,
  zIndex: 2,
});

const showSignup = () => {
  gsap.timeline({ defaults: { duration: 0.6, ease: "power3.inOut" } })
    .to(".login-card", {
      scale: 0.95,
      y: 20,
      rotate: -4,
      zIndex: 1,
      pointerEvents: "none",
    })
    .to(".signup-card", {
      scale: 1,
      y: 0,
      rotate: 0,
      zIndex: 2,
      pointerEvents: "auto",
    }, "<");
};

const showReset = () => {
  gsap.timeline({ defaults: { duration: 0.6, ease: "power3.inOut" } })
    .to(".signup-card", {
      scale: 0.95,
      y: 20,
      rotate: -4,
      zIndex: 1,
      pointerEvents: "none",
    })
    .to(".reset-card", {
      scale: 1,
      y: 0,
      rotate: 0,
      zIndex: 2,
      pointerEvents: "auto",
    }, "<");
};

const showResetNew = () => {
  gsap.timeline({ defaults: { duration: 0.6, ease: "power3.inOut" } })
    .to(".login-card", {
      scale: 0.95,
      y: 20,
      rotate: -4,
      zIndex: 1,
      pointerEvents: "none",
    })
    .to(".resetnew-card", {
      scale: 1,
      y: 0,
      rotate: 0,
      zIndex: 2,
      pointerEvents: "auto",
    }, "<");
};



const showLogin = () => {
  gsap.timeline({ defaults: { duration: 0.6, ease: "power3.inOut" } })
    .to(signupCard, {
      scale: 0.95,
      y: 20,
      rotate: -4,
      zIndex: 1,
      pointerEvents: "none",
    })
    .to(resetCard, { // Also hide reset card
      scale: 0.95,
      y: 20,
      rotate: -4,
      zIndex: 1,
      pointerEvents: "none",
    }, "<")
    .to(loginCard, {
      scale: 1,
      y: 0,
      rotate: 0,
      zIndex: 2,
      pointerEvents: "auto",
      opacity: 1,
    }, "<");
};

if (searchParams.get("auth") === "login") { showLogin(); // whatever logic you already have 
  }

window.addEventListener("show-signup", showSignup);
window.addEventListener("show-login", showLogin);
window.addEventListener("show-reset", showReset);
window.addEventListener("show-resetnew",showResetNew);

return () => {
  window.removeEventListener("show-signup", showSignup);
  window.removeEventListener("show-login", showLogin);
  window.removeEventListener("show-reset", showReset); 
  window.removeEventListener("show-resetnew", showResetNew); 
};


}, [searchParams]);


  return (
    <main className="main-page">
      <div className="preloader">

      <div className="intro-title">
        <h1>Auth playground</h1>

      </div>
      <div className="outro-title">
        <h1>V.1</h1>
      </div>
    </div>
    <div className="split-overlay">
      <div className="intro-title">
        <h1>Auth Playground</h1>

      </div>
      <div className="outro-title">
        <h1>V.1</h1>
      </div>
      
    </div>
    <div className="overlay-tags">
      <div className="tag tag-1"><p>Oauth</p></div>
      <div className="tag tag-2"><p>Passwordless</p></div>
      <div className="tag tag-3"><p>Sessions</p></div>
    </div>
    <div className="container">
      <nav>
        <a href="./"><p id="logo">authplay</p></a>
        <a href="https://github.com/Its-wabs/auth-playground" target="_blank"><p className="cursor-pointer">Github</p></a>
      </nav>
      <div className="hero-img">
        <Image
    src="/img/bg-auth.png"
    alt="hero image"
    fill
    className="object-cover"
    sizes="100vw"
    priority
  />
       <div className="card">
        <div className="auth-deck">
    <div className="auth-card login-card">
      <Login />
    </div>
    <div className="auth-card signup-card">
      <SignUp />
    </div>
    <div className="auth-card reset-card">
      <ResetPassword />
    </div>
     <div className="auth-card resetnew-card">
      <ResetPage />
    </div>
  </div>

       </div>
      </div>
      <footer>
        <p>Exploring auth patterns</p>
        <p>Made by wabs</p>
      </footer>
    </div>



    </main>
    
  );
}
