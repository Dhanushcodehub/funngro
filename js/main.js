document.addEventListener('DOMContentLoaded', () => {

  /* ===================== MOBILE NAV ===================== */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  let isMenuOpen = false;

  if(hamburger) {
    hamburger.addEventListener('click', () => {
      isMenuOpen = !isMenuOpen;
      mobileMenu.classList.toggle('active');
    });
  }

  /* ===================== NAVBAR SCROLL ===================== */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  /* ===================== THEME TOGGLE ===================== */
  const themeToggle = document.getElementById('themeToggle');
  themeToggle.addEventListener('click', () => {
    const html = document.documentElement;
    if (html.getAttribute('data-theme') === 'light') {
      html.removeAttribute('data-theme');
      themeToggle.innerHTML = '<span class="theme-icon">🌙</span>';
    } else {
      html.setAttribute('data-theme', 'light');
      themeToggle.innerHTML = '<span class="theme-icon">☀️</span>';
    }
  });

  /* ===================== SCROLL REVEAL (INTERSECTION OBSERVER) ===================== */
  const revealElements = document.querySelectorAll('.reveal-up, .reveal-right');
  
  const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealObserver = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      } else {
        // Apply inline delay if defined in CSS var for staggered grids
        const delay = entry.target.style.getPropertyValue('--delay');
        if(delay) {
          entry.target.style.transitionDelay = delay;
        }
        
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, revealOptions);

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  /* ===================== STATS COUNTER ANIMATION ===================== */
  const statNumbers = document.querySelectorAll('.stat-number');
  let hasCounted = false;

  const statsObserver = new IntersectionObserver((entries) => {
    if(entries[0].isIntersecting && !hasCounted) {
      hasCounted = true;
      statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const prefix = stat.getAttribute('data-prefix') || '';
        const suffix = stat.getAttribute('data-suffix') || '';
        let current = 0;
        const increment = target / 50; // speed
        
        const updateCounter = () => {
          if (current < target) {
            current += increment;
            stat.innerText = prefix + Math.ceil(current).toLocaleString('en-IN') + suffix;
            setTimeout(updateCounter, 30);
          } else {
            stat.innerText = prefix + target.toLocaleString('en-IN') + suffix;
          }
        };
        updateCounter();
      });
    }
  }, { threshold: 0.5 });

  const statsSection = document.querySelector('.stats-section');
  if(statsSection) {
    statsObserver.observe(statsSection);
  }

  /* ===================== HERO MOCKUP COUNTER ===================== */
  const dashboardEarnings = document.getElementById('dashboardEarnings');
  if(dashboardEarnings) {
    setTimeout(() => {
      let current = 0;
      const target = 12500;
      const increment = target / 30;
      
      const updateEarnings = () => {
        if(current < target) {
          current += increment;
          dashboardEarnings.innerText = '₹' + Math.ceil(current).toLocaleString('en-IN');
          setTimeout(updateEarnings, 40);
        } else {
          dashboardEarnings.innerText = '₹' + target.toLocaleString('en-IN');
        }
      }
      updateEarnings();
    }, 1000); // Start after 1s
  }

  /* ===================== AI CHATBOT INTERACTION ===================== */
  const chatbotTrigger = document.getElementById('chatbotTrigger');
  const chatbotPopup = document.getElementById('chatbotPopup');
  const chatbotClose = document.getElementById('chatbotClose');
  const chatOptions = document.querySelectorAll('.chat-option');
  const chatMessages = document.getElementById('chatMessages');

  if(chatbotTrigger && chatbotPopup) {
    // Open chat
    chatbotTrigger.addEventListener('click', () => {
      chatbotPopup.classList.add('active');
    });

    // Close chat
    if(chatbotClose) {
      chatbotClose.addEventListener('click', () => {
        chatbotPopup.classList.remove('active');
      });
    }

    // Handle Option Clicks
    chatOptions.forEach(option => {
      option.addEventListener('click', function() {
        const replyText = this.getAttribute('data-reply');
        
        // Add user message
        const userMsg = document.createElement('div');
        userMsg.className = 'chat-msg user';
        userMsg.textContent = "I'm interested in " + replyText;
        chatMessages.appendChild(userMsg);
        
        // Hide options to look natural
        document.getElementById('chatOptions').style.display = 'none';

        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Simulate typing delay for bot
        setTimeout(() => {
          const botMsg = document.createElement('div');
          botMsg.className = 'chat-msg bot';
          botMsg.innerHTML = `Great! We have <b>over 400 active projects</b> in ${replyText}. <br><br>Ready to start? <a href="https://refer.funngro.com/refer/LM0SCU" style="color:var(--brand-primary); font-weight:bold; text-decoration:underline;">Sign up now</a> to browse them!`;
          chatMessages.appendChild(botMsg);
          chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 800);
      });
    });
  }

  /* ===================== ICON INITIALIZATION ===================== */
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

});
