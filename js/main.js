$(document).ready(function() {

    const swiper = new Swiper('.swiper-container', {
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: true,
        },
        scrollbar: {
            el: '.swiper-scrollbar',
            draggable: true,
            dragSize: 'auto',
            hide: false,
            snapOnRelease: true,
            horizontalClass: 'swiper-scrollbar-horizontal',
        },
    });

    $(window).scroll(function() {

        const header = $('.header-nav');
        const targetElement = $('.swiper-container');
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

document.addEventListener('DOMContentLoaded', function () {

    const canvas1 = document.getElementById("pdfCanvas1");
    const canvas2 = document.getElementById("pdfCanvas2");
    const canvas3 = document.getElementById("pdfCanvas3");
    const canvas4 = document.getElementById("pdfCanvas4");
    const canvas5 = document.getElementById("pdfCanvas5");

    pdfjsLib.getDocument("剧本/亲戚-阿海.pdf").promise.then(pdf => {
        pdf.getPage(1).then(page =>{

            const scale = 1;
            const viewport = page.getViewport({ scale });

            const context = canvas1.getContext("2d");

            canvas1.height = viewport.height;
            canvas1.width = viewport.width;

            page.render({
                canvasContext: context,
                viewport: viewport
            })
        })
    })

    pdfjsLib.getDocument("剧本/船夫-阿杰.pdf").promise.then(pdf => {
        pdf.getPage(1).then(page =>{

            const scale = 1;
            const viewport = page.getViewport({ scale });

            const context = canvas2.getContext("2d");

            canvas2.height = viewport.height;
            canvas2.width = viewport.width;

            page.render({
                canvasContext: context,
                viewport: viewport
            })
        })
    })

    pdfjsLib.getDocument("剧本/见习护士-舒望.pdf").promise.then(pdf => {
        pdf.getPage(1).then(page =>{

            const scale = 1;
            const viewport = page.getViewport({ scale });

            const context = canvas3.getContext("2d");

            canvas3.height = viewport.height;
            canvas3.width = viewport.width;

            page.render({
                canvasContext: context,
                viewport: viewport
            })
        })
    })

    pdfjsLib.getDocument("剧本/女大学生-唐小姐.pdf").promise.then(pdf => {
        pdf.getPage(1).then(page =>{

            const scale = 1;
            const viewport = page.getViewport({ scale });

            const context = canvas4.getContext("2d");

            canvas4.height = viewport.height;
            canvas4.width = viewport.width;

            page.render({
                canvasContext: context,
                viewport: viewport
            })
        })
    })

    pdfjsLib.getDocument("剧本/少女住客-玉馨.pdf").promise.then(pdf => {
        pdf.getPage(1).then(page =>{

            const scale = 1;
            const viewport = page.getViewport({ scale });

            const context = canvas5.getContext("2d");

            canvas5.height = viewport.height;
            canvas5.width = viewport.width;

            page.render({
                canvasContext: context,
                viewport: viewport
            })
        })
    })
});

// 回到顶部按钮逻辑
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




