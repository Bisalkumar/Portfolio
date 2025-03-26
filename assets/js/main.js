/**
* Template Name: iPortfolio
* Updated: Jul 27 2023 with Bootstrap v5.3.1
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()

/**
 * Contact form send button
 */

const scriptURL = 'https://script.google.com/macros/s/AKfycby8GPM0nkIB1Z9T_H3tkkFDPGJqYu_y0Hvoo4QcVYHudmx2NFvuueDk0n5Opbrdvuzj/exec';
const form = document.forms['submit-to-google-sheet'];

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const loadingMessage = document.querySelector('.loading');
    const sentMessage = document.querySelector('.sent-message');
    const errorMessage = document.querySelector('.error-message');

    // Hide previous messages
    loadingMessage.style.display = 'none';
    sentMessage.style.display = 'none';
    errorMessage.style.display = 'none';

    // Validate form before submission
    if (!validateForm()) {
        errorMessage.textContent = "Please fill in all fields correctly.";
        errorMessage.style.display = 'block';
        return;
    }

    // Show loading message
    loadingMessage.style.display = 'block';

    try {
        const formData = new FormData(form);
        
        // Timeout logic to prevent indefinite loading
        const response = await Promise.race([
            fetch(scriptURL, { method: 'POST', body: formData }),
            new Promise((_, reject) => setTimeout(() => reject(new Error("Request timed out")), 10000))
        ]);

        if (!response.ok) {
            throw new Error(`Network error: ${response.status}`);
        }

        // Display success message
        loadingMessage.style.display = 'none';
        sentMessage.style.display = 'block';
        form.reset();
    } catch (error) {
        console.error('Error!', error.message);

        // Display error message
        loadingMessage.style.display = 'none';
        errorMessage.textContent = `Failed to submit: ${error.message}`;
        errorMessage.style.display = 'block';
    }
});

// Form validation function
function validateForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (name === '' || email === '' || message === '') {
        return false;
    }

    // Basic email format validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

/**
 * Preloader functions and event listeners
 */

// Define the hidePreloader function
function hidePreloader() {
  setTimeout(function() {
      document.getElementById("preloader").style.display = "none";
  }, 500);
}

// Define the setProgress function
let progressPercentage = 0;

function setProgress(percentage) {
  progressPercentage = Math.min(100, Math.max(0, percentage));
  document.querySelector(".preloader-content .percent").innerText = progressPercentage + "%";
  document.querySelector(".preloader-content .progress-bar").style.width = progressPercentage + "%";

  if (progressPercentage >= 100) {
      hidePreloader();
  }
}

function increaseProgress(interval, targetPercentage) {
  let step = interval;
  let intervalId = setInterval(() => {
      if (progressPercentage + step > targetPercentage) {
          step = targetPercentage - progressPercentage; // Adjust the step to not overshoot the target
      }
      
      setProgress(progressPercentage + step);

      if (progressPercentage >= targetPercentage) {
          clearInterval(intervalId);
      }
  }, 50);
}

document.addEventListener("DOMContentLoaded", function() {
  console.log("DOMContentLoaded triggered");
  increaseProgress(1, 50); // Increase progress to 50% at 1% every 50ms
});

window.onload = function() {
  console.log("window.onload triggered");
  increaseProgress(2, 100); // Increase progress to 100% at 2% every 50ms
};
