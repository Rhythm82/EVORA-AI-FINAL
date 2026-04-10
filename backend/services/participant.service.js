import XLSX from "xlsx";

export const parseParticipantFile = async (file) => {

let participants = [];

/* -------- EXCEL -------- */

if (
file.mimetype.includes("excel") ||
file.originalname.endsWith(".xlsx") ||
file.originalname.endsWith(".xls")
) {

const workbook = XLSX.read(file.buffer);

const sheet = workbook.Sheets[workbook.SheetNames[0]];

participants = XLSX.utils.sheet_to_json(sheet, { defval: "" });

}

/* -------- PDF -------- */

else if (file.mimetype === "application/pdf") {

const pdfParse = (await import("pdf-parse")).default;

const data = await pdfParse(file.buffer);

/* Convert PDF text into rows */

const rows = data.text
.split("\n")
.map(r => r.trim())
.filter(r => r.length > 0);

/* Skip header */

rows.shift();

/* Convert rows → object */

participants = rows.map(row => {

const parts = row.split(/\s{2,}|\t/);

return {
teamName: parts[0] || "",
name: parts[1] || "",
email: parts[2] || "",
phone: parts[3] || ""
};

});

}


return participants;

};