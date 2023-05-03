(document.cookie = "cookieName=cookieValue; SameSite=Lax; path=/"),
  (document.cookie = "cookieName=newCookieValue; SameSite=Strict; path=/");
const select = (e, t = !1) =>
  ((e = e.trim()), t)
    ? [...document.querySelectorAll(e)]
    : document.querySelector(e);
let preloader = select("#preloader");
preloader &&
  window.addEventListener("load", () => {
    preloader.remove();
  });
let Side_bar = select("#Side-bar"),
  toggle_open = select("#toggle-open"),
  close = select("#close"),
  Home = select("#Home"),
  site_overlay = select("#site-overlay");
(toggle_open.onclick = function () {
  (Side_bar.style.cssText = "right:0px;"),
    (site_overlay.style.display = "block");
}),
  (close.onclick = function () {
    (Side_bar.style.cssText = "right:-620px;"),
      (site_overlay.style.display = "none");
  });
let Home_ = document.getElementById("Home");
window.onscroll = () => {
  let e = document.documentElement.scrollTop;
  Home_.style.backgroundPositionY = 0.7 * e + "px";
};
const slides = document.querySelectorAll(".slider-container .slide"),
  eraser = document.querySelector(".eraser"),
  prev = document.getElementById("previous"),
  next = document.getElementById("next"),
  intervalTime = 6e3,
  eraserActiveTime = 500;
let sliderInterval;
const nextSlide = () => {
    eraser.classList.add("active"),
      setTimeout(() => {
        let e = document.querySelector(".slide.active");
        e.classList.toggle("active"),
          e.nextElementSibling
            ? e.nextElementSibling.classList.toggle("active")
            : slides[0].classList.toggle("active"),
          setTimeout(() => {
            eraser.classList.remove("active");
          }, 180);
      }, 500);
  },
  prevSlide = () => {
    eraser.classList.add("active"),
      setTimeout(() => {
        let e = document.querySelector(".slide.active");
        e.classList.toggle("active"),
          e.previousElementSibling
            ? e.previousElementSibling.classList.toggle("active")
            : slides[slides.length - 1].classList.toggle("active"),
          setTimeout(() => {
            eraser.classList.remove("active");
          }, 180);
      }, 500);
  };
next.addEventListener("click", () => {
  nextSlide(),
    clearInterval(sliderInterval),
    (sliderInterval = setInterval(nextSlide, 6e3));
}),
  prev.addEventListener("click", () => {
    prevSlide(),
      clearInterval(sliderInterval),
      (sliderInterval = setInterval(nextSlide, 6e3));
  }),
  (sliderInterval = setInterval(nextSlide, 6e3)),
  setTimeout(nextSlide, 500);
const on = (e, t, l, s = !1) => {
    let i = select(t, s);
    i &&
      (s
        ? i.forEach((t) => t.addEventListener(e, l))
        : i.addEventListener(e, l));
  },
  onscroll = (e, t) => {
    e.addEventListener("scroll", t);
  };
let navbarlinks = select("#navbar .scrollto", !0);
const navbarlinksActive = () => {
  let e = window.scrollY + 200;
  navbarlinks.forEach((t) => {
    if (!t.hash) return;
    let l = select(t.hash);
    l &&
      (e >= l.offsetTop && e <= l.offsetTop + l.offsetHeight
        ? t.classList.add("active")
        : t.classList.remove("active"));
  });
};
window.addEventListener("load", navbarlinksActive),
  onscroll(document, navbarlinksActive);
const scrollto = (e) => {
  let t = select("#header"),
    l = t.offsetHeight;
  t.classList.contains("header-scrolled") || (l -= 16);
  let s = select(e).offsetTop;
  window.scrollTo({ top: s - l, behavior: "smooth" });
};
let selectHeader = select("#header");
if (selectHeader) {
  let e = selectHeader.offsetTop,
    t = selectHeader.nextElementSibling,
    l = () => {
      e - window.scrollY <= 0
        ? (selectHeader.classList.add("fixed-top"),
          t.classList.add("scrolled-offset"))
        : (selectHeader.classList.remove("fixed-top"),
          t.classList.remove("scrolled-offset"));
    };
  window.addEventListener("load", l), onscroll(document, l);
}
let backtotop = select(".back-to-top");
if (backtotop) {
  let s = () => {
    window.scrollY > 100
      ? backtotop.classList.add("active")
      : backtotop.classList.remove("active");
  };
  window.addEventListener("load", s), onscroll(document, s);
}
on("click", ".mobile-nav-toggle", function (e) {
  select("#navbar").classList.toggle("navbar-mobile"),
    this.classList.toggle("bi-list"),
    this.classList.toggle("bi-x");
}),
  on(
    "click",
    ".navbar .dropdown > a",
    function (e) {
      select("#navbar").classList.contains("navbar-mobile") &&
        (e.preventDefault(),
        this.nextElementSibling.classList.toggle("dropdown-active"));
    },
    !0
  ),
  on(
    "click",
    ".scrollto",
    function (e) {
      if (select(this.hash)) {
        e.preventDefault();
        let t = select("#navbar");
        if (t.classList.contains("navbar-mobile")) {
          t.classList.remove("navbar-mobile");
          let l = select(".mobile-nav-toggle");
          l.classList.toggle("bi-list"), l.classList.toggle("bi-x");
        }
        scrollto(this.hash);
      }
    },
    !0
  ),
  window.addEventListener("load", () => {
    window.location.hash &&
      select(window.location.hash) &&
      scrollto(window.location.hash);
  }),
  window.addEventListener("load", () => {
    AOS.init({ duration: 700, easing: "ease-in-out", once: !0, mirror: !1 });
  });
