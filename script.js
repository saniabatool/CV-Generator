

document.getElementById("portfolioForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const skills = document.getElementById("skills").value.split(',');
  const education = document.getElementById("education").value;
  const experience = document.getElementById("experience").value.split('\n');
  const projects = document.getElementById("projects").value.split('\n');
  const contactNumber = document.getElementById("contactNumber").value;
  const email = document.getElementById("email").value;
  const theme = document.getElementById("theme").value;
  const photoFile = document.getElementById("photo").files[0];
  const about = document.getElementById("about").value;

  let themeStyle = "";

if (theme === "light") {
  themeStyle = `
    body { font-family: 'Segoe UI'; background: #fdfdfd; color: #333; }
    .container { max-width: 1000px; background: #fff; display: flex; box-shadow: 0 4px 20px rgba(0,0,0,0.05); border-radius: 12px; overflow: hidden; margin: auto; }
    .left { width: 35%; background: #f0f4f8; color: #333; padding: 30px; text-align: center; }
    .left img { width: 200px; height: 200px; border-radius: 50%; object-fit: cover; margin-bottom: 20px; border: 3px solid #4a90e2; }
    .left h2, .left h3 { margin: 10px 0; }
    .left ul { list-style: none; padding: 0; }
    .left ul li { background: #d9e6f2; padding: 8px; margin: 5px 0; border-radius: 4px; }
    .right { width: 65%; padding: 30px; }
    .right h2 { color: #2c3e50; border-bottom: 2px solid #4a90e2; padding-bottom: 5px; margin-top: 25px; }
    .right p, .right li { line-height: 1.6; }
    .right ul { padding-left: 20px; }
  `;
} else if (theme === "dark") {
  themeStyle = `
    body { font-family: 'Segoe UI'; background: #1e1e2f; color: #f5f5f5; }
    .container { max-width: 1000px; background: #2c2c3e; display: flex; box-shadow: 0 4px 20px rgba(0,0,0,0.5); border-radius: 12px; overflow: hidden; margin: auto; }
    .left { width: 35%; background: #3a3a4d; color: #fff; padding: 30px; text-align: center; }
    .left img { width: 200px; height: 200px; border-radius: 50%; object-fit: cover; margin-bottom: 20px; border: 3px solid #0077ff; }
    .left h2, .left h3 { margin: 10px 0; }
    .left ul { list-style: none; padding: 0; }
    .left ul li { background: #444; padding: 8px; margin: 5px 0; border-radius: 4px; }
    .right { width: 65%; padding: 30px; }
    .right h2 { color: #00bfff; border-bottom: 2px solid #00bfff; padding-bottom: 5px; margin-top: 25px; }
    .right p, .right li { line-height: 1.6; }
    .right ul { padding-left: 20px; }
  `;
} else if (theme === "blue") {
  themeStyle = `
    body { font-family: 'Segoe UI'; background: #e6f0ff; color: #003366; }
    .container { max-width: 1000px; background: #ffffff; display: flex; box-shadow: 0 4px 20px rgba(0,0,0,0.1); border-radius: 12px; overflow: hidden; margin: auto; }
    .left { width: 35%; background: #cce0ff; color: #003366; padding: 30px; text-align: center; }
    .left img { width: 200px; height: 200px; border-radius: 50%; object-fit: cover; margin-bottom: 20px; border: 3px solid #003366; }
    .left h2, .left h3 { margin: 10px 0; }
    .left ul { list-style: none; padding: 0; }
    .left ul li { background: #99ccff; padding: 8px; margin: 5px 0; border-radius: 4px; }
    .right { width: 65%; padding: 30px; }
    .right h2 { color: #003366; border-bottom: 2px solid #0055cc; padding-bottom: 5px; margin-top: 25px; }
    .right p, .right li { line-height: 1.6; }
    .right ul { padding-left: 20px; }
  `;
}


  const reader = new FileReader();
  reader.onload = function () {
    const imageBase64 = reader.result;
    const html = generateCV(name, skills, education, experience, projects, contactNumber, email, themeStyle, imageBase64, about);
    createBlob(html, name);
  };

  if (photoFile) {
    reader.readAsDataURL(photoFile);
  } else {
    const html = generateCV(name, skills, education, experience, projects, contactNumber, email, themeStyle, '', about);
    createBlob(html, name);
  }

  document.getElementById("actions").style.display = "block";
});

function generateCV(name, skills, education, experience, projects, contactNumber, email, themeStyle, imageSrc, about) {
  return `
    <html>
    <head>
      <style>${themeStyle}</style>
    </head>
    <body>
      <div class="container">
        <div class="left">
          ${imageSrc ? `<img src="${imageSrc}" alt="Photo">` : ''}
          <h1>${name}</h1>
          <h3>About Me</h3>
          <p>${about}</p>
          <h3>Skills</h3>
          <ul>${skills.map(skill => `<li>${skill.trim()}</li>`).join('')}</ul>
          <h3>Contact</h3>
          <ul>
            <li> ${contactNumber}</li>
            <li> ${email}</li>
          </ul>
        </div>
        <div class="right">
          <h2>Education</h2>
          <p>${education}</p>
          <h2>Experience</h2>
          <ul>${experience.map(exp => `<li>${exp.trim()}</li>`).join('')}</ul>
          <h2>Projects</h2>
          <ul>${projects.map(proj => `<li>${proj.trim()}</li>`).join('')}</ul>
        </div>
      </div>
    </body>
    </html>
  `;
}

let blobURL = '';
let fileName = '';

function createBlob(content, name) {
  const blob = new Blob([content], { type: 'text/html' });
  blobURL = URL.createObjectURL(blob);
  fileName = `${name.replace(/\s+/g, '_')}_CV.html`;
}

document.getElementById("downloadBtn").addEventListener("click", () => {
  if (blobURL) {
    const a = document.createElement("a");
    a.href = blobURL;
    a.download = fileName;
    a.click();
  }
});

document.getElementById("previewBtn").addEventListener("click", () => {
  if (blobURL) {
    window.open(blobURL, "_blank");
  }
});

document.getElementById("copyLinkBtn").addEventListener("click", () => {
  if (blobURL) {
    navigator.clipboard.writeText(blobURL).then(() => {
      document.getElementById("copiedMessage").style.display = "block";
      setTimeout(() => {
        document.getElementById("copiedMessage").style.display = "none";
      }, 2000);
    });
  }
});

