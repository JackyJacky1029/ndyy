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
        const name = $('.name')
        const $navItems = $('.nav-item');
        const buttonClass = $('.button')
        const header = $('.header-nav');
        const overlay = $('#overlay')
        const searchBox = $('.search-box')
        const scrollPosition = $(window).scrollTop();
        if(!scrollPosition == 0) {
            buttonClass.css({
                opacity: 0,
                'z-index': -1,
            });
            overlay.css({
                height: '100px',
            });
            header.css({
                'padding-bottom': '30px'
            });
            header.css({
                height: '70px'
            });
            $navItems.filter('.fas').attr('id', 'scroll-nav-item')
            searchBox.css({
                'height': '38px',
                'top': '-6px',
            })
        } else {
            overlay.css({
                height: '0px',
            });
            header.css({
                height: '100px'
            });
            header.css({
                'padding-bottom': '30px'
            });
            buttonClass.css({
                opacity: 1,
                'z-index': 0,
            });
            $navItems.filter('.fas').attr('id', '')
            searchBox.css({'height': '32px'})
            searchBox.css({'top': '-5px'})
        }
    })
})

    $(window).scroll(function() {

        const header = $('.header-nav');
        const targetElement = $('main');
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



// Features & Welcome Part
document.addEventListener('DOMContentLoaded', function () {
  const featureItems = document.querySelectorAll('.feature-item');
  const defaultInfo = document.querySelector('.default-info');
  const descriptions = document.querySelectorAll('.feature-text');

  featureItems.forEach(item => {
    const feature = item.getAttribute('data-feature');

    item.addEventListener('mouseenter', () => {
      // 隐藏默认欢迎语
      defaultInfo.classList.remove('active');

      // 隐藏所有功能介绍
      descriptions.forEach(desc => {
        desc.classList.remove('active');
      });

      // 显示当前功能介绍
      const currentText = document.querySelector(`.feature-text[data-feature="${feature}"]`);
      if (currentText) currentText.classList.add('active');
    });

    item.addEventListener('mouseleave', () => {
      // 恢复默认欢迎语
      descriptions.forEach(desc => desc.classList.remove('active'));
      defaultInfo.classList.add('active');
    });

    // 点击跳转功能已由 HTML 内嵌 onclick 处理
  });
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




