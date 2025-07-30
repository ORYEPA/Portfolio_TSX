// services/certificates.ts
import { storage } from "../firebaseConfig";
import { ref, listAll, getDownloadURL } from "firebase/storage";

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  year: string;
  skills: string[];
  pdfUrl: string;
  imageUrl: string;
}

export async function fetchCertificates(): Promise<Certificate[]> {
  const folderRef = ref(storage, "Certificados");
  const result = await listAll(folderRef);

  const pdfItems = result.items.filter(item => item.name.endsWith('.pdf'));

  const certificates = await Promise.all(
    pdfItems.map(async (pdfItem) => {
      const baseName = pdfItem.name.replace(".pdf", "");

      const pdfUrl = await getDownloadURL(pdfItem);
      const imageUrl = await getDownloadURL(ref(storage, `Certificados/${baseName}.jpg`));
      const jsonUrl = await getDownloadURL(ref(storage, `Certificados/${baseName}.json`));

      const jsonData = await fetch(jsonUrl).then(res => res.json());

      return {
        id: jsonData.id,
        title: jsonData.title,
        issuer: jsonData.issuer,
        year: jsonData.year,
        skills: jsonData.skills,
        pdfUrl,
        imageUrl,
      };
    })
  );

  return certificates;
}
