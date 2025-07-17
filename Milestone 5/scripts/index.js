(function () {
    var form = document.getElementById("resumeForm");
    var output = document.getElementById("resumeOutput");
    form.addEventListener("submit", function (e) {
        var _a;
        e.preventDefault();
        var name = document.getElementById("name").value;
        var email = document.getElementById("email").value;
        var phone = document.getElementById("phone").value;
        var address = document.getElementById("address").value;
        var about = document.getElementById("about").value;
        var educationGroups = document.querySelectorAll(".education-group");
        var educationHTML = Array.from(educationGroups).map(function (group) {
            var level = group.querySelector('[name="level"]').value;
            var degree = group.querySelector('[name="degree"]').value;
            var institution = group.querySelector('[name="institution"]').value;
            return "\n        <div style=\"margin-bottom: 15px;\">\n          <strong class=\"education_name\">".concat(level, "</strong>\n          <div class=\"education_para1\">\u27A4 ").concat(degree, "</div>\n          <div class=\"education_para2\">\u27A4 ").concat(institution, "</div>\n        </div>");
        }).join("");
        var experienceGroups = document.querySelectorAll(".experience-group");
        var experienceHTML = Array.from(experienceGroups).map(function (group) {
            var company = group.querySelector('[name="company"]').value;
            var para = group.querySelector('[name="experience"]').value;
            return "\n      <div style=\"margin-bottom: 15px;\">\n        <p class=\"company_name\">\n          <strong>".concat(company, "</strong>\n        </p>\n        <p class=\"company_para\">\u27A4 ").concat(para, "</p>\n      </div>");
        }).join("");
        var skills = document.getElementById("skills").value.split(",");
        var hobbies = document.getElementById("hobbies").value.split(",");
        var fileInput = document.getElementById("file");
        var file = (_a = fileInput.files) === null || _a === void 0 ? void 0 : _a[0];
        var reader = new FileReader();
        reader.onload = function () {
            var imgSrc = reader.result;
            output.innerHTML = "\n        <div class=\"resume\" id=\"resume\">\n          <div class=\"left\">\n            <img src=\"".concat(imgSrc, "\" alt=\"Profile\" class=\"profile-pic\" />\n            <div class=\"section-title\">Contact</div>\n            <p><span class=\"icon-circle\"><i class=\"fas fa-envelope\"></i></span> ").concat(email, "</p>\n            <p><span class=\"icon-circle\"><i class=\"fas fa-phone\"></i></span> ").concat(phone, "</p>\n            <p><span class=\"icon-circle\"><i class=\"fas fa-map-marker-alt\"></i></span> ").concat(address, "</p>\n            <div class=\"section-title\">Skills</div>\n            <ul>").concat(skills.map(function (skill) { return "<li>".concat(skill.trim(), "</li>"); }).join(""), "</ul>\n            <div class=\"section-title\">Hobbies</div>\n            <ul>").concat(hobbies.map(function (hobby) { return "<li>".concat(hobby.trim(), "</li>"); }).join(""), "</ul>\n          </div>\n          <div class=\"right\">\n            <div class=\"my-scriptina-text\">\n              <h2 class=\"name-head\">").concat(name, "</h2>\n            </div>\n            <div class=\"sub-right\">\n              <h2 class=\"about\">Objective</h2>\n              <p class=\"about-para\">").concat(about, "</p>\n              <h2 class=\"education\">Education</h2>\n              <p class=\"edu-area\">").concat(educationHTML, "</p>\n              <h2 class=\"experience\">Experience</h2>\n              <p class=\"exp-area\">").concat(experienceHTML, "</p>\n            </div>\n          </div>\n        </div>\n        <div class=\"download-button\">\n          <button id=\"downloadBtn\">Download PDF</button>\n          <button id=\"printBtn\">Save as PDF</button>\n        </div>\n      ");
            var downloadBtn = document.getElementById("downloadBtn");
            downloadBtn.addEventListener("click", function () {
                var resumeElement = document.getElementById("resume");
                if (resumeElement) {
                    setTimeout(function () {
                        var opt = {
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
            var printBtn = document.getElementById("printBtn");
            printBtn.addEventListener("click", function () {
                var resumeElement = document.getElementById("resume");
                if (!resumeElement)
                    return;
                var printWindow = window.open('', '', 'height=600,width=800');
                var styles = Array.from(document.querySelectorAll('link[rel="stylesheet"], style'))
                    .map(function (style) { return style.outerHTML; })
                    .join('\n');
                var customStyle = "\n          <style>\n            @font-face {\n              font-family: 'Scriptina';\n              src: url('./fonts/SCRIPTIN.ttf') format('truetype');\n            }\n            body {\n              font-family: Arial, sans-serif;\n              background-color: white;\n              padding: 20px;\n              margin: 0;\n            }\n          </style>\n        ";
                printWindow === null || printWindow === void 0 ? void 0 : printWindow.document.write("\n          <html>\n            <head>\n              <title>Print Resume</title>\n              ".concat(styles, "\n              ").concat(customStyle, "\n            </head>\n            <body>\n              ").concat(resumeElement.outerHTML, "\n            </body>\n          </html>\n        "));
                printWindow === null || printWindow === void 0 ? void 0 : printWindow.document.close();
                printWindow === null || printWindow === void 0 ? void 0 : printWindow.focus();
                setTimeout(function () {
                    printWindow === null || printWindow === void 0 ? void 0 : printWindow.print();
                    printWindow === null || printWindow === void 0 ? void 0 : printWindow.close();
                }, 1000);
            });
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    });
})();
function addEducation() {
    var container = document.getElementById('educationContainer');
    var group = document.createElement('div');
    group.className = 'education-group';
    group.style.padding = '15px';
    group.style.borderBottom = '1px solid #ccc';
    group.style.marginBottom = '10px';
    group.innerHTML = "\n    <input type=\"text\" name=\"level\" placeholder=\"Education Level (e.g., Graduation, College, School)\" required />\n    <input type=\"text\" name=\"degree\" placeholder=\"Degree (e.g. Program)\" required />\n    <input type=\"text\" name=\"institution\" placeholder=\"Institution\" required />\n  ";
    container === null || container === void 0 ? void 0 : container.appendChild(group);
}
function addExperience() {
    var container = document.getElementById('experienceContainer');
    var group = document.createElement('div');
    group.className = 'experience-group';
    group.style.padding = '15px';
    group.style.borderBottom = '1px solid #ccc';
    group.style.marginBottom = '10px';
    group.innerHTML = "\n    <input type=\"text\" name=\"company\" placeholder=\"Company\" />\n    <textarea name=\"experience\" placeholder=\"Experience Description\" required></textarea>\n  ";
    container === null || container === void 0 ? void 0 : container.appendChild(group);
}
