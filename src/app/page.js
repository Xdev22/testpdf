import DownloadButton from "./DownloadBtn"; // Assu
import InvoiceForm from "./InvoiceForm";

const App = () => (
  <div className=" h-screen bg-white">
    <h1 className="text-black">Ma Facture</h1>
    <InvoiceForm />
    <DownloadButton />
  </div>
);

export default App;
