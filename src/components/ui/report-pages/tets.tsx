// {
//     data.length > 0 ? (
//         <div className="table w-full">
//             {/* HEADER */}
//             <div className="table-header-group sticky top-0">
//                 <div className="table-row bg-blue-400 text-center">
//                     {columns.map((col) => (
//                         <div key={col.key} className="table-cell">{col.label}</div>
//                     ))}
//                 </div>
//             </div>
//             {/* BODY */}
//             <div className="table-row-group">
//                 {data.map((row, index) => (
//                     <div key={index} className="table-row">
//                         {columns.map((col, colIndex) => (
//                             <div key={col.key} className={`${col.isNumber ? 'text-right' : 'text-center'} table-cell`}>
//                                 {colIndex === 0
//                                     ? index + 1 // Nomor urut
//                                     : col.key === "dtl_margin_percent"
//                                         ? row.dtl_netto !== 0
//                                             ? FormatPercentage((row.dtl_margin / row.dtl_netto) * 100) + " %"
//                                             : "0 %" // Cegah pembagian nol
//                                         : col.isNumber
//                                             ? FormatNumbers(row[col.key])
//                                             : row[col.key] || "-"
//                                 }
//                             </div>
//                         ))}
//                     </div>
//                 ))}
//             </div>
//             {/* FOOTER */}
//             <div className="table-row-group">
//                 <div className="table-row bg-gray-300 font-bold">
//                     {columns.map((col, colIndex) => (
//                         <div key={col.key} className="table-cell text-right">
//                             {colIndex === 0
//                                 ? "Total" // Kolom pertama pakai label "Total"
//                                 : col.key === "dtl_margin_percent"
//                                     ? totals["dtl_netto"] !== 0
//                                         ? FormatPercentage((totals["dtl_margin"] / totals["dtl_netto"]) * 100) + " %"
//                                         : "0 %" // Cegah pembagian nol
//                                     : col.isNumber
//                                         ? FormatNumbers(totals[col.key] || 0)
//                                         : ""
//                             }
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>

//     ) : (
//     <p>Tidak ada data yang tersedia.</p>
// )
// }