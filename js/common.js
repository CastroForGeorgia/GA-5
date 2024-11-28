document.addEventListener("DOMContentLoaded", function() {
  'use strict';

  var html = document.querySelector('html'),
    body = document.querySelector('body'),
    globalWrap = document.querySelector('.global-wrap'),
    menuToggle = document.querySelector(".hamburger"),
    menuList = document.querySelector(".main-nav"),
    searchOpenButton = document.querySelector(".search-button"),
    searchCloseIcon = document.querySelector(".icon__search__close"),
    searchOverlay = document.querySelector(".search__overlay"),
    searchInput = document.querySelector(".search__text"),
    search = document.querySelector(".search"),
    toggleTheme = document.querySelector(".toggle-theme"),
    projectsSlider = document.querySelector(".projects__inner"),
    testimonialSlider = document.querySelector(".testimonials__slider");


  /* =======================================================
  // Menu + Search + Theme Switcher
  ======================================================= */
  menuToggle.addEventListener("click", () => {
    menu();
  });

  searchOpenButton.addEventListener("click", () => {
    searchOpen();
  });

  searchCloseIcon.addEventListener("click", () => {
    searchClose();
  });

  searchOverlay.addEventListener("click", () => {
    searchClose();
  });

  // Menu
  function menu() {
    menuToggle.classList.toggle("is-open");
    menuList.classList.toggle("is-visible");
  }

  // Search
  function searchOpen() {
    search.classList.add("is-visible");
    body.classList.add("search-is-visible");
    globalWrap.classList.add("is-active");
    menuToggle.classList.remove("is-open");
    menuList.classList.remove("is-visible");
    setTimeout(function () {
      searchInput.focus();
    }, 250);
  }

  function searchClose() {
    search.classList.remove("is-visible");
    body.classList.remove("search-is-visible");
    globalWrap.classList.remove("is-active");
  }

  document.addEventListener('keydown', function(e){
    if (e.key == 'Escape') {
      searchClose();
    }
  });

  // Theme Switcher
  if (toggleTheme) {
    toggleTheme.addEventListener("click", () => {
      darkMode();
    });
  };

  function darkMode() {
    if (html.classList.contains('dark-mode')) {
      html.classList.remove('dark-mode');
      localStorage.removeItem("theme");
      document.documentElement.removeAttribute("dark");
    } else {
      html.classList.add('dark-mode');
      localStorage.setItem("theme", "dark");
      document.documentElement.setAttribute("dark", "");
    }
  }


  /* ================================================================
  // Stop Animations During Window Resizing and Switching Theme Modes
  ================================================================ */
  let disableTransition;

  if (toggleTheme) {
    toggleTheme.addEventListener("click", () => {
      stopAnimation();
    });

    window.addEventListener("resize", () => {
      stopAnimation();
    });

    function stopAnimation() {
      document.body.classList.add("disable-animation");
      clearTimeout(disableTransition);
      disableTransition = setTimeout(() => {
        document.body.classList.remove("disable-animation");
      }, 100);
    }
  }


  /* =======================
  // Responsive Videos
  ======================= */
  reframe(".post__content iframe:not(.reframe-off), .page__content iframe:not(.reframe-off), .project-content iframe:not(.reframe-off)");


  /* =======================
  // LazyLoad Images
  ======================= */
  var lazyLoadInstance = new LazyLoad({
    elements_selector: ".lazy"
  })


  /* =======================
  // Zoom Image
  ======================= */
  const lightense = document.querySelector(".page__content img, .post__content img, .project__content img, .gallery__image img"),
  imageLink = document.querySelectorAll(".page__content a img, .post__content a img, .project__content a img, .gallery__image a img");

  if (imageLink) {
    for (var i = 0; i < imageLink.length; i++) imageLink[i].parentNode.classList.add("image-link");
    for (var i = 0; i < imageLink.length; i++) imageLink[i].classList.add("no-lightense");
  }

  if (lightense) {
    Lightense(".page__content img:not(.no-lightense), .post__content img:not(.no-lightense), .project__content img:not(.no-lightense), .gallery__image img:not(.no-lightense)", {
    padding: 60,
    offset: 30
    });
  }


  /* ============================
  // Projects Slider
  ============================ */
  if (projectsSlider) {
    new Splide(projectsSlider, {
      perPage: 4,
      perMove: 1,
      gap: 32,
      arrows: false,
      pagination: true,
      breakpoints: {
        1400: {
          perPage: 3
        },
        1024: {
          perPage: 2
        },
        768: {
          perPage: 1
        }
      }
    }).mount();
  }


  /* ============================
  // Testimonials Slider
  ============================ */
  if (testimonialSlider) {
    new Splide(testimonialSlider, {
      type: 'loop',
      perPage: 1,
      perMove: 1,
      gap: 32,
      speed: 800,
      breakpoints: {
        768: {
          perPage: 1,
          arrows: false,
        }
      }
    }).mount();
  }


  /* =================================
  // Accordion
  ================================= */
  const items = document.querySelectorAll(".faq .faq__item");

  function toggleAccordion() {
    const itemToggle = this.getAttribute('data-name');

    if (itemToggle === 'closed') {
      this.setAttribute('data-name', 'open');
    } else {
      this.setAttribute('data-name', 'closed');
    }
  }

  items.forEach(item => {
    item.addEventListener('click', toggleAccordion);
    item.addEventListener('keydown', function (event) {
      if (event.keyCode === 13) {
        toggleAccordion.call(this);
      }
    });
  });


  /* =================================
  // Load More Posts
  ================================= */
  var load_posts_button = document.querySelector('.load-more-posts');

  load_posts_button&&load_posts_button.addEventListener("click",function(e){e.preventDefault();var o=document.querySelector(".pagination"),e=pagination_next_url.split("/page")[0]+"/page/"+pagination_next_page_number+"/";fetch(e).then(function(e){if(e.ok)return e.text()}).then(function(e){var n=document.createElement("div");n.innerHTML=e;for(var t=document.querySelector(".grid"),a=n.querySelectorAll(".article--grid"),i=0;i<a.length;i++)t.appendChild(a.item(i)); new LazyLoad({ elements_selector: ".lazy" }); pagination_next_page_number++,pagination_next_page_number>pagination_available_pages_number&&(o.style.display="none")})});

});