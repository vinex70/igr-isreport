import ExcelJS from "exceljs";

// Fungsi utilitas untuk ekspor ke Excel
export const exportToExcelStyled = async <T extends string | number | null>({
    title,
    headers,
    data,
    fileName = "ExportedData.xlsx",
}: {
    title: string; // Judul tabel
    headers: string[]; // Header tabel
    data: T[][]; // Data dalam bentuk array of arrays
    fileName?: string; // Nama file Excel
}) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet1");

    // Tambahkan judul dengan styling
    worksheet.mergeCells(`A1:${String.fromCharCode(65 + headers.length - 1)}1`);
    const titleCell = worksheet.getCell("A1");
    titleCell.value = title;
    titleCell.alignment = { vertical: "middle", horizontal: "center" };
    titleCell.font = { bold: true, size: 16 };
    titleCell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFCCE5FF" }, // Biru muda
    };

    // Tambahkan header dengan styling
    worksheet.addRow(headers);
    headers.forEach((_, index) => {
        const headerCell = worksheet.getCell(2, index + 1);
        headerCell.font = { bold: true };
        headerCell.alignment = { vertical: "middle", horizontal: "center" };
        headerCell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FFFFCC99" }, // Oranye muda
        };
        headerCell.border = {
            top: { style: "thin" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" },
        };
    });

    // Tambahkan data tabel
    data.forEach((row) => {
        worksheet.addRow(row);
    });

    // Styling border dan alignment untuk setiap cell data
    worksheet.eachRow((row, rowNumber) => {
        if (rowNumber > 2) {
            row.eachCell((cell) => {
                cell.alignment = { vertical: "middle", horizontal: "center" };
                cell.border = {
                    top: { style: "thin" },
                    left: { style: "thin" },
                    bottom: { style: "thin" },
                    right: { style: "thin" },
                };
            });
        }
    });

    // Simpan sebagai file Excel
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
};
