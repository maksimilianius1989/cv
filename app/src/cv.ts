import fs from "fs";
import * as path from "path";
import Handlebars from "handlebars";
import puppeteer from "puppeteer";

// const templateName = "cv";
// const templateName = "modern_dark";
const templateName = "real";

async function generateCV() {
  try {
    console.log("🚀 START");

    const filePath = path.join(process.cwd(), "src", "templates", templateName + ".hbs");
    console.log("📄 Template:", filePath);

    const source = fs.readFileSync(filePath, "utf-8");

    const template = Handlebars.compile(source);

    const data = {
      name: "Maksym Bukach",
      role: "Backend Developer",
      email: "max@email.com",
      phone: "+380...",
      about: "Backend developer with 7+ years experience in Node.js and PHP.",
      skills: ["Node.js", "TypeScript", "Docker", "MySQL"],
      experience: [
        {
          company: "Company A",
          position: "Backend Dev",
          date: "2022 - Present",
          description: "Built APIs and microservices"
        }
      ],
      education: [
        {
          school: "University",
          year: "2015 - 2019"
        }
      ]
    };

    const html = template(data);

    console.log("✅ HTML ready");

    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });

    const page = await browser.newPage();

    await page.setContent(html);

    console.log("📄 HTML loaded");

    await page.pdf({
      path: path.join(process.cwd(), templateName + ".pdf"),
      format: "A4",
      printBackground: true
    });

    await browser.close();

    console.log("🏁 PDF CREATED: " + template + ".pdf");

  } catch (err) {
    console.error("❌ ERROR:", err);
  }
}

generateCV();