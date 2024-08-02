"use client";
import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import Invoice from "./Invoice"; // Assurez-vous que le chemin est correct
import invoiceData from "./invoiceData"; // Assurez-vous que le chemin est correct

const DownloadAndOpenButton = () => {
  const handleDownload = async () => {
    const blob = await pdf(
      <Invoice
        number={invoiceData.number}
        date={invoiceData.date}
        customer={invoiceData.customer}
        items={invoiceData.items}
        total={invoiceData.total}
      />
    ).toBlob();
    saveAs(blob, `facture_${invoiceData.number}.pdf`);
  };

  const handleOpen = async () => {
    const blob = await pdf(
      <Invoice
        number={invoiceData.number}
        date={invoiceData.date}
        customer={invoiceData.customer}
        items={invoiceData.items}
        total={invoiceData.total}
      />
    ).toBlob();
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

  return (
    <div>
      <button
        className="text-black bg-slate-200 rounded-md px-5"
        onClick={handleDownload}
      >
        Télécharger la Facture
      </button>
      <button
        className="text-black bg-slate-200 rounded-md px-5"
        onClick={handleOpen}
        style={{ marginLeft: 10 }}
      >
        Ouvrir la Facture
      </button>
    </div>
  );
};

export default DownloadAndOpenButton;
