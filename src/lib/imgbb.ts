// ImgBB API for image uploads
const IMGBB_API_KEY = "983c65c18779a75c25d95b44f228a648";

export async function uploadToImgBB(file: File): Promise<string> {
  if (!IMGBB_API_KEY) {
    throw new Error('ImgBB API key not configured');
  }

  // Convert file to base64
  const base64 = await fileToBase64(file);
  
  // Remove data URL prefix (e.g., "data:image/jpeg;base64,")
  const base64Data = base64.split(',')[1];

  const formData = new FormData();
  formData.append('key', IMGBB_API_KEY);
  formData.append('image', base64Data);

  const response = await fetch('https://api.imgbb.com/1/upload', {
    method: 'POST',
    body: formData,
  });

  const data = await response.json();
  
  if (!data.success) {
    console.error('ImgBB error:', data);
    throw new Error(data.error?.message || 'Upload failed');
  }

  return data.data.url;
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}
