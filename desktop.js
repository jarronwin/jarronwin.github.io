let topZ = 1000; // starting z-index
document.addEventListener("DOMContentLoaded", () => {
    function updateClock() {
      const now = new Date();
      const timeEl = document.querySelector(".taskbar-clock .time");
      const dateEl = document.querySelector(".taskbar-clock .date");
  
      if (timeEl) timeEl.textContent = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      if (dateEl) dateEl.textContent = now.toLocaleDateString();
    }
  
    updateClock();
    setInterval(updateClock, 1000);
  
  // Folder Window
    document.querySelectorAll(".icon.folder").forEach(icon => {
      icon.addEventListener("click", () => {
        const folderName = icon.dataset.folder || "Folder";
  
        // Remove previous open windows
        // document.querySelectorAll(".window.active").forEach(w => w.remove());
  
        const win = document.createElement("div");
        win.className = "window active";
        win.innerHTML = `
          <div class="title-bar">
            <div class="title-bar-text">${folderName}</div>
            <div class="title-bar-controls">
              <button aria-label="Minimize"></button>
              <button aria-label="Maximize"></button>
              <button aria-label="Close" class="close-btn"></button>
            </div>
          </div>
          <div class="window-body">
            <p>This is the <strong>${folderName}</strong> folder.</p>
          </div>
        `;
  
        Object.assign(win.style, {
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "60%",
          height: "60%",
          zIndex: 1000
        });
  
        document.body.appendChild(win);

        // Bring to front on click
        win.addEventListener("mousedown", () => {
          topZ++;
            win.style.zIndex = topZ;
        });
  
        win.querySelector(".close-btn").addEventListener("click", () => {
          win.remove();
        });
  
        // DRAG
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
  
        // MAXIMIZE
        const maximizeBtn = win.querySelector('[aria-label="Maximize"]');
        maximizeBtn.addEventListener("click", () => {
          const isMaximized = win.classList.toggle("maximized");
          const taskbar = document.getElementById("taskbar");
          const taskbarHeight = taskbar ? taskbar.offsetHeight : 40;
  
          if (isMaximized) {
            win.style.top = "0";
            win.style.left = "0";
            win.style.width = "100%";
            win.style.height = `calc(100% - ${taskbarHeight}px)`;
            win.style.transform = "none";
          } else {
            win.style.width = "60%";
            win.style.height = "60%";
            win.style.top = "50%";
            win.style.left = "50%";
            win.style.transform = "translate(-50%, -50%)";
          }
        });
      });
    });
  });

  // Resume Window
  document.querySelectorAll(".icon[data-app='pdf']").forEach((icon) => {
    icon.addEventListener("click", (e) => {
      e.preventDefault();
      const link = icon.querySelector("a").getAttribute("href");
      const fileName = icon.querySelector("div")?.textContent || "Document";
      const originalWidth = "60%";
      const originalHeight = "85%";
  
      const win = document.createElement("div");
      win.className = "window active";
      win.innerHTML = `
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
  
      Object.assign(win.style, {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: originalWidth,
        height: originalHeight,
        backgroundColor: "white",
        zIndex: 1000,
        boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.4)",
        borderRadius: "10px 10px 0 0"
      });
  
      document.body.appendChild(win);
  
        // Bring to front on click
        win.addEventListener("mousedown", () => {
          topZ++;
            win.style.zIndex = topZ;
        });
  
      // Close
      win.querySelector(".close-btn").addEventListener("click", () => {
        win.remove();
      });
  
      // DRAG
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
  
      // MAXIMIZE
      const maximizeBtn = win.querySelector('[aria-label="Maximize"]');
      maximizeBtn.addEventListener("click", () => {
        const isMaximized = win.classList.toggle("maximized");
        const taskbar = document.getElementById("taskbar");
        const taskbarHeight = taskbar ? taskbar.offsetHeight : 40;
  
        if (isMaximized) {
          win.style.top = "0";
          win.style.left = "0";
          win.style.width = "100%";
          win.style.height = `calc(100% - ${taskbarHeight}px)`;
          win.style.transform = "none";
        } else {
          win.style.width = originalWidth;
          win.style.height = originalHeight;
          win.style.top = "50%";
          win.style.left = "50%";
          win.style.transform = "translate(-50%, -50%)";
        }
      });
    });
  });

// Icon File Click for About Me
document.querySelectorAll(".icon[data-app='AboutMe.txt']").forEach(icon => {
    icon.addEventListener("click", () => {
      const fileName = icon.querySelector("div")?.textContent || "Untitled - Notepad";
  
      // Remove other windows
      // document.querySelectorAll(".window.active").forEach(w => w.remove());
  
      const win = document.createElement("div");
      win.className = "window active";
      win.innerHTML = `
        <div class="title-bar">
          <div class="title-bar-text">${fileName}</div>
          <div class="title-bar-controls">
            <button aria-label="Minimize"></button>
            <button aria-label="Maximize"></button>
            <button aria-label="Close" class="close-btn"></button>
          </div>
        </div>
        <div class="window-body" style="padding: 0; background-color: white;">
        <div>
          <p style="width: 100%; height: 100%; border: none; padding: 10px; font-family: 'Courier New', monospace; font-size: 14px; resize: none;">
            Hi there! My name is Jarron Nguyen (Win) and welcome to my website! I graduated with a B.S in Computer Information Systems at Arizona State University.
            With this degree, I aspire to work in agile environments focused on software development. 
            <br></br>
            Other than that, my hobbies include watching movies, listening to music, playing video games, and taking photos with my camera. On my site you can view my
            photo portfolio, what I have been listening to lately, and some reviews of my favorite movies. I hope you take the time to explore my site, and have fun, you
            might find some easter eggs...
          </p>
          </div>
          </div>
        </div>
      `;
  
      Object.assign(win.style, {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "60%",
        height: "60%",
        backgroundColor: "white",
        zIndex: 1000,
        boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.4)",
        borderRadius: "10px"
      });
  
      document.body.appendChild(win);

              // Bring to front on click
              win.addEventListener("mousedown", () => {
                topZ++;
                  win.style.zIndex = topZ;
              });
  
      win.querySelector(".close-btn").addEventListener("click", () => win.remove());
  
      // DRAG
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
  
      // MAXIMIZE
      const maximizeBtn = win.querySelector('[aria-label="Maximize"]');
      maximizeBtn.addEventListener("click", () => {
        const isMaximized = win.classList.toggle("maximized");
        const taskbar = document.getElementById("taskbar");
        const taskbarHeight = taskbar ? taskbar.offsetHeight : 40;
  
        if (isMaximized) {
          win.style.top = "0";
          win.style.left = "0";
          win.style.width = "100%";
          win.style.height = `calc(100% - ${taskbarHeight}px)`;
          win.style.transform = "none";
        } else {
          win.style.width = "60%";
          win.style.height = "60%";
          win.style.top = "50%";
          win.style.left = "50%";
          win.style.transform = "translate(-50%, -50%)";
        }
      });
    });
  });

  // Personal Website
  document.querySelectorAll(".icon[data-app='site'], .taskbar-icons[data-app='site']").forEach((element) => {
    element.addEventListener("click", (e) => {
      e.preventDefault();
  
      const link = element.getAttribute("data-link");
      const title = element.querySelector("div")?.textContent || "Browser";
  
      const win = document.createElement("div");
      win.className = "window active";
      win.innerHTML = `
        <div class="title-bar">
          <div class="title-bar-text">${title}</div>
          <div class="title-bar-controls">
            <button aria-label="Minimize"></button>
            <button aria-label="Maximize"></button>
            <button aria-label="Close" class="close-btn"></button>
          </div>
        </div>
        <div class="window-body" style="height: calc(100% - 28px); padding: 0;">
          <iframe src="${link}"  style="width: 100%; height: 100%; border: none;"></iframe>
        </div>
      `;
  
      Object.assign(win.style, {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "85%",
        height: "80%",
        backgroundColor: "white",
        zIndex: 1000,
        boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.4)",
        borderRadius: "10px 10px 0 0",
      });
  
      document.body.appendChild(win);

              // Bring to front on click
              win.addEventListener("mousedown", () => {
                topZ++;
                  win.style.zIndex = topZ;
              });
  
      // Close button
      win.querySelector(".close-btn").addEventListener("click", () => {
        win.remove();
      });
  
      // Drag
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
  
      // Maximize button
      const maximizeBtn = win.querySelector('[aria-label="Maximize"]');
      maximizeBtn.addEventListener("click", () => {
        const isMaximized = win.classList.toggle("maximized");
        const taskbar = document.getElementById("taskbar");
        const taskbarHeight = taskbar ? taskbar.offsetHeight : 40;
  
        if (isMaximized) {
          win.style.top = "0";
          win.style.left = "0";
          win.style.width = "100%";
          win.style.height = `calc(100% - ${taskbarHeight}px)`;
          win.style.transform = "none";
        } else {
          win.style.width = "80%";
          win.style.height = "80%";
          win.style.top = "50%";
          win.style.left = "50%";
          win.style.transform = "translate(-50%, -50%)";
        }
      });
    });
  });

  // Email Window
  document.querySelectorAll(".icon.email[data-folder='Email'], .taskbar-icons[data-app='email']").forEach(icon => {
    icon.addEventListener("click", () => {
      const folderName = icon.dataset.folder || "Folder";

      // Remove previous open windows
      // document.querySelectorAll(".window.active").forEach(w => w.remove());

      const win = document.createElement("div");
      win.className = "window active";
      win.innerHTML = `
      <div class="title-bar">
        <div class="title-bar-text">${folderName}</div>
        <div class="title-bar-controls">
          <button aria-label="Minimize"></button>
          <button aria-label="Maximize"></button>
          <button aria-label="Close" class="close-btn"></button>
        </div>
      </div>
      <div class="window-body has-scrollbar" style="display: flex; flex-direction: column; gap: 12px; font-family: 'Segoe UI', Tahoma, sans-serif;">
        
        <!-- Email + Fields Container -->
        <div style="display: flex; gap: 16px; flex: 1;"> 
          
          <!-- Sidebar -->
          <div class="has-scrollbar" 
            style="
            width: 160px; 
            font-size: 12px;
            color: #2a2a2a;
            overflow-y: scroll;
            max-height: 100%;
            "
            >
            <div style="border-bottom: 1px solid #c0cde0; margin-bottom: 10px;">
              <strong style="font-size: 13px;">Hotmail</strong>
            </div>
    
            <ul style="list-style: none; padding-left: 0; margin-bottom: 16px;">
              <li style="margin-bottom: 6px;">📥 Inbox</li>
            </ul>
    
            <div style="font-weight: bold; margin-bottom: 6px;">Folders</div>
            <ul style="list-style: none; padding-left: 10px; margin-bottom: 16px;">
              <li style="margin-bottom: 4px;">Junk</li>
              <li style="margin-bottom: 4px;">Drafts</li>
              <li style="margin-bottom: 4px;">Sent</li>
              <li style="margin-bottom: 4px;">Deleted</li>
              <li style="margin-bottom: 4px;">New folder</li>
            </ul>
    
            <div style="font-weight: bold; margin-bottom: 6px;">Quick Views</div>
            <ul style="list-style: none; padding-left: 10px;">
              <li style="margin-bottom: 4px;">Documents</li>
              <li style="margin-bottom: 4px;">Flagged</li>
              <li style="margin-bottom: 4px;">Photos</li>
              <li style="margin-bottom: 4px;">Shipping updates</li>
              <li style="margin-bottom: 4px; color: #0078d4;">+ New category</li>
            </ul>
          </div>
    
          <!-- Fields -->
          <div style="flex: 1; display: flex; flex-direction: column; gap: 12px;">
            <div style="background: #e0e8f5; border: 1px solid #a1b4cf; padding: 6px 10px; border-radius: 4px; font-size: 13px; color: #2a2a2a;">
              <strong>JNguyen715@gmail.com</strong>
            </div>
    
            <div style="display: flex; align-items: center; gap: 10px;">
              <label style="width: 70px;">From:</label>
              <input class="field-row" type="text" placeholder="Your email" style="flex: 1; cursor: url('../text.cur'), default;" />
            </div>
    
            <div style="display: flex; align-items: center; gap: 10px;">
              <label style="width: 70px;">Subject:</label>
              <input class="field-row" type="text" placeholder="Subject" style="flex: 1; cursor: url('../text.cur'), default;" />
            </div>
    
            <div style="display: flex; align-items: flex-start; gap: 10px;">
              <label style="width: 70px; margin-top: 4px;">Message:</label>
              <textarea class="field-row" placeholder="Write your message..." style="flex: 1; height: 200px; resize: vertical; cursor: url('../text.cur'), default;"></textarea>
            </div>
    
            <div style="text-align: right; margin-top: 5px;">
              <button class="seven-button send-btn">Send</button>
            </div>
          </div>
    
        </div>
      </div>
    `;

      Object.assign(win.style, {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "60%",
        height: "60%",
        zIndex: 1000
      });

      document.body.appendChild(win);

      // Bring to front on click
      win.addEventListener("mousedown", () => {
        topZ++;
          win.style.zIndex = topZ;
      });

      win.querySelector(".close-btn").addEventListener("click", () => {
        win.remove();

        win.querySelector(".send-btn").addEventListener("click", () => {
          alert("Pretend email sent ✅");
          win.remove(); // optional: auto-close
        });
      });

      // DRAG
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

      // MAXIMIZE
      const maximizeBtn = win.querySelector('[aria-label="Maximize"]');
      maximizeBtn.addEventListener("click", () => {
        const isMaximized = win.classList.toggle("maximized");
        const taskbar = document.getElementById("taskbar");
        const taskbarHeight = taskbar ? taskbar.offsetHeight : 40;

        if (isMaximized) {
          win.style.top = "0";
          win.style.left = "0";
          win.style.width = "100%";
          win.style.height = `calc(100% - ${taskbarHeight}px)`;
          win.style.transform = "none";
        } else {
          win.style.width = "60%";
          win.style.height = "60%";
          win.style.top = "50%";
          win.style.left = "50%";
          win.style.transform = "translate(-50%, -50%)";
        }
      });
    });
  });

