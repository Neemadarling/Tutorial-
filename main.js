document.addEventListener("DOMContentLoaded", () => {

  /* =============================
     DARK / LIGHT MODE
  ============================== */
  const toggle = document.getElementById("modeToggle");
  if (toggle) {
    toggle.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      toggle.textContent = document.body.classList.contains("dark")
        ? "Light Mode"
        : "Dark Mode";
    });
  }

  /* =============================
     CODE EXAMPLES
  ============================== */
  const examples = {
    example1: {
      html: "<h1>Hello SPCK!</h1>",
      css: "h1 { color:#0077b6; text-align:center; margin-top:50px; }",
      js: "console.log('Hello SPCK!');"
    },
    example2: {
      html: "<div class='box'></div>",
      css: ".box{width:100px;height:100px;background:#fcbf49;margin:50px auto;}",
      js: ""
    },
    example3: {
      html: "<button id='btn'>Click Me</button>",
      css: "button{padding:10px 20px;background:#0077b6;color:#fff;border:none;border-radius:5px;cursor:pointer;}",
      js: "document.getElementById('btn').onclick=()=>alert('Clicked!');"
    }
  };

  const htmlCode = document.getElementById("htmlCode");
  const cssCode = document.getElementById("cssCode");
  const jsCode = document.getElementById("jsCode");
  const preview = document.getElementById("preview");

  window.loadExample = function (name) {
    htmlCode.value = examples[name].html;
    cssCode.value = examples[name].css;
    jsCode.value = examples[name].js;
    runCode();
  };

  window.switchExample = function (name) {
    document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
    event.target.classList.add("active");
    loadExample(name);
  };

  window.runCode = function () {
    preview.srcdoc = `
      <html>
        <head><style>${cssCode.value}</style></head>
        <body>
          ${htmlCode.value}
          <script>${jsCode.value}<\/script>
        </body>
      </html>
    `;
  };

  window.copyAll = function () {
    const allCode =
      "HTML:\n" + htmlCode.value +
      "\n\nCSS:\n" + cssCode.value +
      "\n\nJS:\n" + jsCode.value;

    navigator.clipboard.writeText(allCode).then(() => {
      alert("All code copied!");
    });
  };

  loadExample("example1");

  /* =============================
     COMMUNITY PROJECTS
  ============================== */
  const projectForm = document.getElementById("projectForm");
  const projectsList = document.getElementById("projectsList");

  let projects = JSON.parse(localStorage.getItem("communityProjects")) || [];

  function displayProjects() {
    projectsList.innerHTML = "";

    if (projects.length === 0) {
      projectsList.innerHTML = "<p>No projects submitted yet. Be the first!</p>";
      return;
    }

    projects.forEach((p, index) => {
      const card = document.createElement("div");
      card.className = "project-card";
      card.innerHTML = `
        <h4>${p.name}</h4>
        <p>${p.desc}</p>
        <button class="btn" data-index="${index}">Load in Editor</button>
      `;
      projectsList.appendChild(card);
    });

    document.querySelectorAll(".project-card button").forEach(btn => {
      btn.addEventListener("click", () => {
        const p = projects[btn.dataset.index];
        htmlCode.value = p.html;
        cssCode.value = p.css;
        jsCode.value = p.js;
        runCode();
      });
    });
  }

  if (projectForm) {
    projectForm.addEventListener("submit", e => {
      e.preventDefault();

      const newProject = {
        name: document.getElementById("projName").value,
        desc: document.getElementById("projDesc").value,
        html: document.getElementById("projHTML").value,
        css: document.getElementById("projCSS").value,
        js: document.getElementById("projJS").value
      };

      projects.push(newProject);
      localStorage.setItem("communityProjects", JSON.stringify(projects));
      projectForm.reset();
      displayProjects();
    });
  }

  displayProjects();

});
