$(document).ready(function() {

    $(window).scroll(function() {

        const header = $('.header-nav');
        const targetElement = $('.pdfDisplay');
        const elementOffset = targetElement.offset().top - header.height();
        const scrollPosition = $(window).scrollTop();

        if(scrollPosition > elementOffset) {
            header.css({
                opacity: 0,
                top: '-60px'
            })
        } else {
            header.css({
                opacity: 1,
                top: '0px'
            })
        }
    })
})

const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopBtn.classList.add('show');
  } else {
    backToTopBtn.classList.remove('show');
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});




