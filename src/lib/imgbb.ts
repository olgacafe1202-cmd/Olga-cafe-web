// ImgBB API for image uploads
const IMGBB_API_KEY = "983c65c18779a75c25d95b44f228a648";

export async function uploadToImgBB(file: File): Promise<string> {
  if (!IMGBB_API_KEY) {
    throw new Error('ImgBB API key not configured');
  }

  const formData = new FormData();
  formData.append('image', file);

  const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to upload image');
  }

  const data = await response.json();
  
  if (!data.success) {
    throw new Error(data.error?.message || 'Upload failed');
  }

  return data.data.url;
}
