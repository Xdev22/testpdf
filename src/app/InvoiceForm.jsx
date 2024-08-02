"use client";
// InvoiceForm.js
import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import { useState } from "react";
import Invoice from "./Invoice"; // Assurez-vous que le chemin est correct

const InvoiceForm = () => {
  const [formData, setFormData] = useState({
    number: Date.now(),
    date: "",
    customerName: "",
    customerAddress: "",
    customerCity: "",
    customerZipCode: "",
    customerCountry: "",
    items: [{ description: "", quantity: "", unitPrice: "" }],
    total: "",
  });

  const handleChange = (e, index, field) => {
    const { name, value } = e.target;
    if (field) {
      const updatedItems = [...formData.items];
      updatedItems[index][field] = value;
      setFormData((prevState) => ({ ...prevState, items: updatedItems }));
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleAddItem = () => {
    setFormData((prevState) => ({
      ...prevState,
      items: [
        ...prevState.items,
        { description: "", quantity: "", unitPrice: "" },
      ],
    }));
  };

  const handleRemoveItem = (index) => {
    const updatedItems = formData.items.filter((_, i) => i !== index);
    setFormData((prevState) => ({ ...prevState, items: updatedItems }));
  };

  const calculateTotal = () => {
    return formData.items
      .reduce((sum, item) => {
        return (
          sum + (parseFloat(item.quantity) * parseFloat(item.unitPrice) || 0)
        );
      }, 0)
      .toFixed(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const total = calculateTotal();
    setFormData((prevState) => ({ ...prevState, total }));

    const blob = await pdf(
      <Invoice
        number={formData.number}
        date={formData.date}
        customer={{
          name: formData.customerName,
          address: formData.customerAddress,
          city: formData.customerCity,
          zipCode: formData.customerZipCode,
          country: formData.customerCountry,
        }}
        items={formData.items}
        total={total}
      />
    ).toBlob();

    // To download
    saveAs(blob, `facture_${formData.number}.pdf`);

    // To open in a new tab
    // const url = URL.createObjectURL(blob);
    // window.open(url, '_blank');
  };

  return (
    <form onSubmit={handleSubmit} className="text-black border-2 border-black">
      <h2>Création de Facture</h2>

      <div>
        <label>Date:</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          className="text-black border-black ml-2 border-2"
          onChange={handleChange}
          required
        />
      </div>
      <div className=" flex gap-2 flex-wrap">
        <h3>Adresse du Client</h3>
        <label>Nom:</label>
        <input
          type="text"
          name="customerName"
          className="text-black border-black ml-2 border-2"
          value={formData.customerName}
          onChange={handleChange}
          required
        />
        <label>Adresse:</label>
        <input
          type="text"
          name="customerAddress"
          className="text-black border-black ml-2 border-2"
          value={formData.customerAddress}
          onChange={handleChange}
          required
        />
        <label>Ville:</label>
        <input
          type="text"
          name="customerCity"
          value={formData.customerCity}
          onChange={handleChange}
          className="text-black border-black ml-2 border-2"
          required
        />
        <label>Code Postal:</label>
        <input
          type="text"
          name="customerZipCode"
          value={formData.customerZipCode}
          onChange={handleChange}
          className="text-black border-black ml-2 border-2"
          required
        />
        <label>Pays:</label>
        <input
          type="text"
          name="customerCountry"
          value={formData.customerCountry}
          onChange={handleChange}
          className="text-black border-black ml-2 border-2"
          required
        />
      </div>
      <div>
        <h3 className="py-6 text-2xl">Détails de la Facture</h3>
        {formData.items.map((item, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <label>Description:</label>
            <input
              type="text"
              value={item.description}
              onChange={(e) => handleChange(e, index, "description")}
              required
              className="text-black border-black ml-2 border-2"
            />
            <label>Quantité:</label>
            <input
              type="number"
              step="1"
              value={item.quantity}
              onChange={(e) => handleChange(e, index, "quantity")}
              required
              className="text-black border-black ml-2 border-2"
            />
            <label>Prix Unitaire:</label>
            <input
              type="number"
              step="0.01"
              value={item.unitPrice}
              onChange={(e) => handleChange(e, index, "unitPrice")}
              required
              className="text-black border-black ml-2 border-2"
            />
          </div>
        ))}
        <div className="flex flex-row gap-5">
          <button type="button" onClick={() => handleRemoveItem(index)}>
            Supprimer l'Article
          </button>
          <button type="button" onClick={handleAddItem}>
            Ajouter un Article
          </button>
        </div>
        <button type="submit">Générer et Télécharger la Facture</button>
      </div>
    </form>
  );
};

export default InvoiceForm;
