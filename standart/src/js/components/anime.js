const anchors = document.querySelectorAll('a[href*="#"]');

anchors.forEach(item => {
   item.addEventListener('click', event => {
       event.preventDefault();
       const elementId = item.getAttribute('href');
       document.querySelector(elementId).scrollIntoView({
          behavior: 'smooth',
          block: 'start'
       });
   });
});