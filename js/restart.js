document.addEventListener('DOMContentLoaded', function() {

    const restartBtn = document.getElementById("restart-btn")

    restartBtn.addEventListener('click', resetAll)

    async function resetAll() {

        const res = await fetch("https://ndyy-api.onrender.com/reset", {
            method: "POST"
        });

        if (!res.ok) {
            alert("重置失败");
            return;
        }
    }
})