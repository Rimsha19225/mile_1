declare var html2pdf: any;

(() => {
  const form = document.getElementById("resumeForm") as HTMLFormElement;
  const output = document.getElementById("resumeOutput") as HTMLDivElement;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = (document.getElementById("name") as HTMLInputElement).value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const phone = (document.getElementById("phone") as HTMLInputElement).value;
    const address = (document.getElementById("address") as HTMLInputElement).value;
    const about = (document.getElementById("about") as HTMLTextAreaElement).value;

    const educationGroups = document.querySelectorAll(".education-group");
    const educationHTML = Array.from(educationGroups).map(group => {
      const level = (group.querySelector('[name="level"]') as HTMLInputElement).value;
      const degree = (group.querySelector('[name="degree"]') as HTMLInputElement).value;
      const institution = (group.querySelector('[name="institution"]') as HTMLInputElement).value;
      return `
        <div style="margin-bottom: 15px;">
          <strong class="education_name">${level}</strong>
          <div class="education_para1">➤ ${degree}</div>
          <div class="education_para2">➤ ${institution}</div>
        </div>`;
    }).join("");

    const experienceGroups = document.querySelectorAll(".experience-group");
    const experienceHTML = Array.from(experienceGroups).map(group => {
      const company = (group.querySelector('[name="company"]') as HTMLInputElement).value;
      const para = (group.querySelector('[name="experience"]') as HTMLTextAreaElement).value;
      return `
      <div style="margin-bottom: 15px;">
        <p class="company_name">
          <strong>${company}</strong>
        </p>
        <p class="company_para">➤ ${para}</p>
      </div>`;
    }).join("");

    const skills = (document.getElementById("skills") as HTMLInputElement).value.split(",");
    const hobbies = (document.getElementById("hobbies") as HTMLInputElement).value.split(",");

    const fileInput = document.getElementById("file") as HTMLInputElement;
    const file = fileInput.files?.[0];

    const reader = new FileReader();
    reader.onload = () => {
      const imgSrc = reader.result as string;

      output.innerHTML = `
        <div class="resume" id="resume">
          <div class="left">
            <img src="${imgSrc}" alt="Profile" class="profile-pic" />
            <div class="section-title">Contact</div>
            <p><span class="icon-circle"><i class="fas fa-envelope"></i></span> ${email}</p>
            <p><span class="icon-circle"><i class="fas fa-phone"></i></span> ${phone}</p>
            <p><span class="icon-circle"><i class="fas fa-map-marker-alt"></i></span> ${address}</p>
            <div class="section-title">Skills</div>
            <ul>${skills.map(skill => `<li>${skill.trim()}</li>`).join("")}</ul>
            <div class="section-title">Hobbies</div>
            <ul>${hobbies.map(hobby => `<li>${hobby.trim()}</li>`).join("")}</ul>
          </div>
          <div class="right">
            <div class="my-scriptina-text">
              <h2 class="name-head">${name}</h2>
            </div>
            <div class="sub-right">
              <h2 class="about">Objective</h2>
              <p class="about-para">${about}</p>
              <h2 class="education">Education</h2>
              <p class="edu-area">${educationHTML}</p>
              <h2 class="experience">Experience</h2>
              <p class="exp-area">${experienceHTML}</p>
            </div>
          </div>
        </div>
        <div class="download-button">
          <button id="downloadBtn">Download PDF</button>
          <button id="printBtn">Save as PDF</button>
        </div>
      `;

      const downloadBtn = document.getElementById("downloadBtn") as HTMLButtonElement;
      downloadBtn.addEventListener("click", () => {
        const resumeElement = document.getElementById("resume");
        if (resumeElement) {
          setTimeout(() => {
            const opt = {
              margin: 0,
              filename: 'my_resume.pdf',
              image: { type: 'jpeg', quality: 0.98 },
              html2canvas: { scale: 2 },
              jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            };
            html2pdf().from(resumeElement).set(opt).save();
          }, 500); 
        }
      });


      const printBtn = document.getElementById("printBtn") as HTMLButtonElement;
      printBtn.addEventListener("click", () => {
        const resumeElement = document.getElementById("resume");
        if (!resumeElement) return;

        const printWindow = window.open('', '', 'height=600,width=800');

        const styles = Array.from(document.querySelectorAll('link[rel="stylesheet"], style'))
          .map(style => style.outerHTML)
          .join('\n');

        const customStyle = `
          <style>
            @font-face {
              font-family: 'Scriptina';
              src: url('./fonts/SCRIPTIN.ttf') format('truetype');
            }
            body {
              font-family: Arial, sans-serif;
              background-color: white;
              padding: 20px;
              margin: 0;
            }
          </style>
        `;

        printWindow?.document.write(`
          <html>
            <head>
              <title>Print Resume</title>
              ${styles}
              ${customStyle}
            </head>
            <body>
              ${resumeElement.outerHTML}
            </body>
          </html>
        `);

        printWindow?.document.close();
        printWindow?.focus();

        setTimeout(() => {
          printWindow?.print();
          printWindow?.close();
        }, 1000);
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  });
})();

function addEducation() {
  const container = document.getElementById('educationContainer');

  const group = document.createElement('div');
  group.className = 'education-group';
  group.style.padding = '15px';
  group.style.borderBottom = '1px solid #ccc';
  group.style.marginBottom = '10px';

  group.innerHTML = `
    <input type="text" name="level" placeholder="Education Level (e.g., Graduation, College, School)" required />
    <input type="text" name="degree" placeholder="Degree (e.g. Program)" required />
    <input type="text" name="institution" placeholder="Institution" required />
  `;

  container?.appendChild(group);
}

function addExperience() {
  const container = document.getElementById('experienceContainer');

  const group = document.createElement('div');
  group.className = 'experience-group';
  group.style.padding = '15px';
  group.style.borderBottom = '1px solid #ccc';
  group.style.marginBottom = '10px';

  group.innerHTML = `
    <input type="text" name="company" placeholder="Company" />
    <textarea name="experience" placeholder="Experience Description" required></textarea>
  `;

  container?.appendChild(group);
}