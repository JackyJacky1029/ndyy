document.addEventListener('DOMContentLoaded', function() {

            document.querySelectorAll(".attraction-image").forEach(img => {
                const id = img.dataset.id;
                const title = img.closest(".attraction-card").querySelector("h3");

                const saved = localStorage.getItem(id);

                if (saved === "true") {

                    img.dataset.inv = "true";
                    title.textContent = title.textContent.replace(" (未解锁)", "");
                }
            });

            document.querySelectorAll(".attraction-image").forEach(img => {
                const id = img.dataset.id;
                let on = false;
                const title = img.closest(".attraction-card").querySelector("h3");

                img.onclick =() => {
                    
                    const notInv = img.dataset.inv === "false"
                    const investigatedCount = countInvestigated();

                    if (notInv && investigatedCount >= 22) {
                        alert("时间差不多了!");
                        return;
                    }

                    img.src = on ? img.dataset.off : img.dataset.on ;
                    on = !on;

                    if (notInv) {
                        title.textContent = title.textContent.replace(' (未解锁)', "")
                        img.dataset.inv = "true";
                        localStorage.setItem(id, "true")
                    }
                }
            })

            // const imgs = document.querySelectorAll(".attraction-image");

            // imgs.forEach(img =>{
            //     img.addEventListener("click", ()=>{
            //         const src = img.src;

            //         if(src.includes('-.'))

            //             img.src = src.replace('-.', '.');
            //         else
            //             img.src = src.replace('.', '-.');
            //     });
            // });

            const modal = document.getElementById("imgModal");
            const modalImg = document.getElementById("modalImg");
            const closeBtn = document.getElementById("closeModal");

            document.querySelectorAll(".zoom-btn").forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();

                    const card = btn.closest('.attraction-card');
                    const img = card.querySelector('.attraction-image');


                    modalImg.src = img.src;
                    modal.classList.add("open");
                    modal.setAttribute("aria-hidden", "false");
                });
            });

            closeBtn.addEventListener("click", closeModal);

            modal.addEventListener("click", (e) => {
                if (e.target === modal) closeModal();
            })

            document.addEventListener("keydown", (e) => {
                if (e.key === "Escape") closeModal();
            })

            function closeModal() {
                modal.classList.remove("open")
                modal.setAttribute("aria-hidden", "true");
                modalImg.src = "";
            }

            function countInvestigated() {
                let count = 0;

                for (let i = 0; i < localStorage.length; i++) {
                    const key = localStorage.key(i);
                    if (localStorage.getItem(key) === "true") {
                        count++;
                    }
                }

                return count;
            }

            $(window).scroll(function() {

                const header = $('.header-nav');
                const targetElement = $('.attractions-banner');
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

