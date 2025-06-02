window.addEventListener("DOMContentLoaded", () => {
    const win = document.createElement("div");
    win.className = "window active";
    win.innerHTML = `
      <div class="title-bar">
        <div class="title-bar-text">Welcome!</div>
        <div class="title-bar-controls">
          <button aria-label="Close" class="close-btn"></button>
        </div>
      </div>
      <div class="window-body has-scrollbar" style="max-height: 300px; overflow: auto;">
        <p><strong>Welcome to my Website! For the best experience, please use a desktop</strong></p>
        <ul style="margin-left: 20px;">
          <li>💻 Click on <strong>Internet Explorer</strong> to open the full website.</li>
          <li>📂 Open folders like <strong>Photos</strong> or <strong>Career</strong> for more info.</li>
          <li>📄 Click on <strong>About_Me.txt</strong> or <strong>Resume.pdf</strong> to open popups.</li>
        </ul>
        <p style="margin-top: 10px;">Feel free to explore. Have fun!</p>
        <div style="text-align: right; margin-top: 15px;">
          <button class="seven-button ok-btn">OK</button>
          <button class="seven-button ok-btn">Cancel</button>
        </div>
      </div>
    `;
  
    Object.assign(win.style, {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "400px",
        height: "auto",
        maxHeight: "80%",
        zIndex: 1001,
        display: "flex",
        flexDirection: "column",
      });
  
    document.body.appendChild(win);
  
    const closePopup = () => win.remove();
  
    win.querySelector(".close-btn").addEventListener("click", closePopup);
    win.querySelectorAll(".ok-btn").forEach(btn =>
        btn.addEventListener("click", closePopup)
      );
  
    // Dragging logic
    let isDragging = false, offsetX = 0, offsetY = 0;
    const titleBar = win.querySelector(".title-bar");
  
    titleBar.addEventListener("mousedown", (e) => {
      isDragging = true;
      const rect = win.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;
      win.style.transition = "none";
    });
  
    document.addEventListener("mousemove", (e) => {
      if (isDragging) {
        win.style.left = `${e.clientX - offsetX}px`;
        win.style.top = `${e.clientY - offsetY}px`;
        win.style.transform = "none";
      }
    });
  
    document.addEventListener("mouseup", () => {
      isDragging = false;
    });
  });