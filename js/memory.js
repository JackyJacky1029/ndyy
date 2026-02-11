document.addEventListener('DOMContentLoaded', function() {

            const character = localStorage.getItem("character");
            const characterModal = document.getElementById("characterModal");

            if (character === null) {

                characterModal.classList.add("open");
                characterModal.setAttribute("aria-hidden", "false");

                const canvas1 = document.getElementById("pdfCanvas1");
                const canvas2 = document.getElementById("pdfCanvas2");
                const canvas3 = document.getElementById("pdfCanvas3");
                const canvas4 = document.getElementById("pdfCanvas4");
                const canvas5 = document.getElementById("pdfCanvas5");

                document.querySelectorAll(".pdfCanvas").forEach(canvas => {
                    
                    canvas.addEventListener('click', (e) => {
                        if (e.target === canvas) {
                            localStorage.setItem("character", canvas.dataset.character)
                            closeCharacterModal()
                        }
                    })
                })

                pdfjsLib.getDocument("../剧本/亲戚-阿海.pdf").promise.then(pdf => {
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

                pdfjsLib.getDocument("../剧本/船夫-阿杰.pdf").promise.then(pdf => {
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

                pdfjsLib.getDocument("../剧本/见习护士-舒望.pdf").promise.then(pdf => {
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

                pdfjsLib.getDocument("../剧本/女大学生-唐小姐.pdf").promise.then(pdf => {
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

                pdfjsLib.getDocument("../剧本/少女住客-玉馨.pdf").promise.then(pdf => {
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
                
            }

            const picker = document.querySelector(".picker");

            picker.addEventListener("wheel", (e) => {
                if(Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
                    e.preventDefault();
                    picker.scrollLeft += e.deltaY * 2;
                }
            }, {passive: false});

            document.querySelectorAll(".attraction-image").forEach(img => {

                const id = img.dataset.id;

                const title = img.closest(".attraction-card").querySelector("h3");

                const unlocked = localStorage.getItem(id);

                if (unlocked === "unlocked") {

                    img.dataset.inv = "true";
                    title.textContent = title.textContent.replace(" (未解锁)", "");
                }
            });

            const attractionFilterButtons = document.querySelectorAll('.attractions-filter-btn');
            const attractionCards = document.querySelectorAll('.attraction-card');

            // default filter
            const defaultFilter = document.querySelector('[data-filter="ahai"]');
            defaultFilter.classList.add('active');


            attractionFilterButtons.forEach(button => {
                button.addEventListener('click', function() {
                    // remove active
                    attractionFilterButtons.forEach(btn => {
                        btn.classList.remove('active');
                    });
                    
                    // add active
                    this.classList.add('active');
                    
                    // filter
                    const filterValue = this.getAttribute('data-filter');
                    
                    filterCards(filterValue);
                });
            });
            
            // 筛选函数
            function filterCards(filter) {
                attractionCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    
                    if (filter === 'all' || cardCategory === filter) {
                        card.classList.remove('hidden');
                        setTimeout(() => {
                            card.style.display = 'block';
                        }, 10);
                    } else {
                        card.classList.add('hidden');
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300); 
                    }
                });
                
                // 重排布局
                const grid = document.querySelector('.attractions-grid');
                grid.style.display = 'none';
                grid.offsetHeight; 
                grid.style.display = 'grid';
            }

            document.querySelectorAll(".attraction-image").forEach(img => {
                const id = img.dataset.id;
                let on = false;
                const title = img.closest(".attraction-card").querySelector("h3");

                img.onclick =() => {

                    const notInv = img.dataset.inv === "false"
                    const investigatedCount = countInvestigated();

                    const memoryCharacter = img.dataset.character

                    if (memoryCharacter != localStorage.getItem("character")) {
                        alert("请选择你自己角色的回忆!");
                        return;
                    }

                    img.src = on ? img.dataset.off : img.dataset.on ;
                    on = !on;

                    if (notInv) {
                        title.textContent = title.textContent.replace(' (未解锁)', "")
                        img.dataset.inv = "true";
                        localStorage.setItem(id, "unlocked")
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

            const restartBtn = document.getElementById("restart-btn")

            restartBtn.addEventListener('click', resetAll)

            function closeCharacterModal() {
                characterModal.classList.remove("open")
                characterModal.setAttribute("aria-hidden", "true");
            }

            function closeModal() {
                modal.classList.remove("open")
                modal.setAttribute("aria-hidden", "true");
                modalImg.src = "";
            }

            function resetAll() {
                localStorage.clear();
                location.reload();
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

