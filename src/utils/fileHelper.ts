/**
 * File Helper for document uploads (Aadhaar cards, photos, audition thumbnails)
 * Automatically compresses large camera photos to crisp, high-resolution web-ready DataURLs
 * to avoid HTTP payload limits, localStorage quotas, and ensure instant rendering & downloads.
 */

export async function processDocumentFile(file: File): Promise<{
  dataUrl: string;
  fileName: string;
  isPdf: boolean;
  fileSizeFormatted: string;
}> {
  const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
  const sizeMb = (file.size / (1024 * 1024)).toFixed(2);

  if (isPdf) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve({
          dataUrl: (e.target?.result as string) || '',
          fileName: file.name,
          isPdf: true,
          fileSizeFormatted: `${sizeMb} MB`,
        });
      };
      reader.onerror = () => reject(new Error('Failed to read PDF file'));
      reader.readAsDataURL(file);
    });
  }

  // Image files (JPG, PNG, WEBP, etc.)
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const rawDataUrl = e.target?.result as string;
      if (!rawDataUrl) {
        resolve({
          dataUrl: '',
          fileName: file.name,
          isPdf: false,
          fileSizeFormatted: `${sizeMb} MB`,
        });
        return;
      }

      const img = new Image();
      img.onload = () => {
        // High quality scale: max dimension 1600px ensures text on Aadhaar is razor sharp
        const MAX_DIM = 1600;
        let width = img.width;
        let height = img.height;

        if (width > MAX_DIM || height > MAX_DIM) {
          if (width > height) {
            height = Math.round((height * MAX_DIM) / width);
            width = MAX_DIM;
          } else {
            width = Math.round((width * MAX_DIM) / height);
            height = MAX_DIM;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
          const compressedSizeKb = Math.round((compressedDataUrl.length * 3) / 4 / 1024);
          resolve({
            dataUrl: compressedDataUrl,
            fileName: file.name,
            isPdf: false,
            fileSizeFormatted: `${compressedSizeKb} KB`,
          });
        } else {
          resolve({
            dataUrl: rawDataUrl,
            fileName: file.name,
            isPdf: false,
            fileSizeFormatted: `${sizeMb} MB`,
          });
        }
      };
      img.onerror = () => {
        resolve({
          dataUrl: rawDataUrl,
          fileName: file.name,
          isPdf: false,
          fileSizeFormatted: `${sizeMb} MB`,
        });
      };
      img.src = rawDataUrl;
    };
    reader.onerror = () => {
      resolve({
        dataUrl: '',
        fileName: file.name,
        isPdf: false,
        fileSizeFormatted: `${sizeMb} MB`,
      });
    };
    reader.readAsDataURL(file);
  });
}
