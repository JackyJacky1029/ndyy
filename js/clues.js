window.window.serverState = window.window.serverState || {};

document.addEventListener("DOMContentLoaded", async () => {
    const res = await fetch("https://ndyy-api.onrender.com/state");
    window.serverState = await res.json();

    document.querySelectorAll(".attraction-image").forEach(img => {
        const id = img.dataset.id;
        const title = img.closest(".attraction-card").querySelector("h3");
        
        if (window.serverState[id]) {
            img.src = img.dataset.on;
            img.dataset.inv ="true";
            title.textContent = title.textContent.replace(" (未调查)", "");
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {

            // document.addEventListener("DOMContentLoaded", async () => {
            //     const res = await fetch("https://ndyy-api.onrender.com/state");
            //     const state = await res.json();

            //     document.querySelectorAll(".attraction-image").forEach(img => {
            //         const id = img.dataset.id;
            //         const title = img.closest(".attraction-card").querySelector("h3");
                    
            //         if (state[id]) {
            //             img.src = img.dataset.on;
            //             img.dataset.inv ="true";
            //             title.textContent = title.textContent.replace(" (未调查)", "");
            //         }
            //     });
            // });

            // document.querySelectorAll(".attraction-image").forEach(img => {
            //     const id = img.dataset.id;
            //     const title = img.closest(".attraction-card").querySelector("h3");

            //     const saved = localStorage.getItem(id);

            //     if (saved === "true") {

            //         img.dataset.inv = "true";
            //         title.textContent = title.textContent.replace(" (未调查)", "");
            //     }
            // });

            const attractionFilterButtons = document.querySelectorAll('.attractions-filter-btn');
            const attractionCards = document.querySelectorAll('.attraction-card');

            // default filter
            const defaultFilter = document.querySelector('[data-filter="murder"]');
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

                img.onclick = async () => {

                    const notInv = img.dataset.inv === "false"
                    const investigatedCount = countInvestigated();

                    if (notInv && investigatedCount >= 22) {
                        alert("时间差不多了!");
                        return;
                    }

                    img.src = on ? img.dataset.off : img.dataset.on ;
                    on = !on;

                    if (notInv && investigatedCount < 22) {

                        const res = await fetch("https://ndyy-api.onrender.com/investigate", {
                            method: "POST",
                            headers: {"Content-Type": "application/json"},
                            body: JSON.stringify({id})
                        });

                        console.log("POST /investigate status =", res.status);

                        if(!res.ok) {
                            const text = await res.text();
                            console.error("POST failed:", text);
                            return;
                        }

                        if(res.ok) {
                            window.serverState[id] = true;
                        }

                        title.textContent = title.textContent.replace(' (未调查)', "")
                        img.dataset.inv = "true";
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

            function closeModal() {
                modal.classList.remove("open")
                modal.setAttribute("aria-hidden", "true");
                modalImg.src = "";
            }

            async function resetAll() {

                const res = await fetch("https://ndyy-api.onrender.com/reset", {
                    method: "POST"
                });

                if (!res.ok) {
                    alert("重置失败");
                    return;
                }
                localStorage.clear();
                location.reload();
            }

            function countInvestigated() {
                return Object.keys(window.serverState).length;
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

