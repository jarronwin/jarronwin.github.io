document.addEventListener("DOMContentLoaded", () => {
    // ✅ Clock Functionality
    function updateClock() {
      const now = new Date();
      const timeEl = document.querySelector(".taskbar-clock .time");
      const dateEl = document.querySelector(".taskbar-clock .date");
  
      if (timeEl) {
        timeEl.textContent = now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
      }
  
      if (dateEl) {
        dateEl.textContent = now.toLocaleDateString();
      }
    }
  
    updateClock();
    setInterval(updateClock, 1000);
  
    // ✅ Folder Icon Click - Open Fake Window
    document.querySelectorAll(".icon.folder").forEach((icon) => {
      icon.addEventListener("click", () => {
        const folderName = icon.dataset.folder || "Folder";
  
        const windowBox = document.createElement("div");
        windowBox.className = "explorer-window";
        windowBox.innerHTML = `
          <div class="explorer-header">
            <span>${folderName}</span>
            <button class="close-btn">×</button>
          </div>
          <div class="explorer-content">
            <p>This is a placeholder for the <strong>${folderName}</strong> folder.</p>
          </div>
        `;
  
        document.body.appendChild(windowBox);
  
        windowBox.querySelector(".close-btn").addEventListener("click", () => {
          windowBox.remove();
        });
      });
    });
  });

    // ✅ External Icon Click (PDF Resume)
    document.querySelectorAll(".icon[data-app='external']").forEach((icon) => {
      icon.addEventListener("click", (e) => {
        e.preventDefault();
        const link = icon.querySelector("a").getAttribute("href");
        const fileName = icon.querySelector("div")?.textContent || "Document";

        const pdfWin = document.createElement("div");
        pdfWin.className = "window active";
        pdfWin.innerHTML = `
          <div class="title-bar">
            <div class="title-bar-text">${fileName}</div>
            <div class="title-bar-controls">
              <button aria-label="Minimize"></button>
              <button aria-label="Maximize"></button>
              <button aria-label="Close" class="close-btn"></button>
            </div>
          </div>
          <div class="window-body" style="height: calc(100% - 28px); padding: 0;">
            <iframe src="${link}" style="width: 100%; height: 100%; border: none;"></iframe>
          </div>
        `;

        Object.assign(pdfWin.style, {
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "60%",
          height: "60%",
          backgroundColor: "white",
          zIndex: 1000,
          boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.4)",
          borderRadius: "10px 10px 0 0"
        });

        document.body.appendChild(pdfWin);

        pdfWin.querySelector(".close-btn").addEventListener("click", () => {
          pdfWin.remove();
        });
      });
    });
