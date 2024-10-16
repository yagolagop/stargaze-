// themetoggle functionality
const themeMap = {
    dark: "light",
    light: "solar",
    solar: "dark"
  };
  
  const theme = localStorage.getItem('theme')
    || (tmp = Object.keys(themeMap)[0],
        localStorage.setItem('theme', tmp),
        tmp);
  const bodyClass = document.body.classList;
  bodyClass.add(theme);
  
  function toggleTheme() {
    const current = localStorage.getItem('theme');
    const next = themeMap[current];
  
    bodyClass.replace(current, next);
    localStorage.setItem('theme', next);
  }

  document.addEventListener('scroll', function() {
    const sections = [

      // importante!

      { id: 'welcome', threshold: 0 },
      { id: 'mission', threshold: 1 },
    ];
  
    const scrollPosition = window.scrollY;
  
    sections.forEach(section => {
      const element = document.getElementById(section.id);
      const rect = element.getBoundingClientRect();
  
      if (rect.top < window.innerHeight && rect.bottom >= 0) {

        if (scrollPosition > section.threshold) {
          element.classList.add('visible');
        }
      } else {

        element.classList.remove('visible');
      }
    });
  });
  

  // parallax effect for planets in the header

  document.getElementById('themeButton').onclick = toggleTheme;

  document.addEventListener("mousemove", parallax);
    function parallax(e){
      document.querySelectorAll(".object").forEach(function(move){

        var moving_value = move.getAttribute("data-value");
        var x = (e.clientX * moving_value) / 250;
        var y = (e.clientY * moving_value) / 250;

        move.style.transform = "translateX(" + x + "px) translateY(" + y + "px)";
      });
    }

    // parallax effect for the "stargaze" text

    document.addEventListener('scroll', function() {
      const stargaze = document.querySelector('.stargaze');
      const scrollPosition = window.scrollY; // scroll position
      const parallaxSpeed = 0.5; // effect ajustment
  
      stargaze.style.transform = `translate(-50%, calc(-50% + ${scrollPosition * parallaxSpeed}px))`;
  });

  // counter for launch information

  const counters = document.querySelectorAll('.count');
  let started = false;
  
  const updateCounter = (counter) => {
      const target = +counter.getAttribute('data-target');
      let count = 0;
  
      const incrementCounter = () => {
          if (count < target) {
              count++;
              counter.innerText = count;
              setTimeout(incrementCounter, 10);
          } else {
              counter.innerText = target;
          }
      };
  
      incrementCounter();
  };
  
  const checkScroll = () => {
      const rect = document.getElementById('counters').getBoundingClientRect();
      
      if (!started && rect.top <= window.innerHeight) {
          started = true;
          counters.forEach(updateCounter);
      }
      
   
      if (started && rect.bottom < 0) {
          started = false;
          counters.forEach(counter => {
              counter.innerText = 0; // reset the counter
          });
          window.addEventListener('scroll', checkScroll);
      }
  };
  
  window.addEventListener('scroll', checkScroll);
  