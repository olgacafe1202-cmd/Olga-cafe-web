import { NextRequest, NextResponse } from 'next/server';

const IMGBB_API_KEY = "983c65c18779a75c25d95b44f228a648";
const MAX_FILE_SIZE = 32 * 1024 * 1024; // 32MB max for ImgBB

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'File too large. Max 32MB' }, { status: 400 });
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Only image files allowed' }, { status: 400 });
    }

    // Convert to base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString('base64');

    console.log('Uploading to ImgBB, file size:', file.size, 'base64 length:', base64.length);

    // Upload to ImgBB using FormData (more reliable)
    const imgbbForm = new FormData();
    imgbbForm.append('key', IMGBB_API_KEY);
    imgbbForm.append('image', base64);
    imgbbForm.append('name', file.name || 'upload');

    const response = await fetch('https://api.imgbb.com/1/upload', {
      method: 'POST',
      body: imgbbForm,
    });

    const responseText = await response.text();
    console.log('ImgBB response status:', response.status);
    console.log('ImgBB response:', responseText.substring(0, 500));

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      console.error('Failed to parse ImgBB response:', responseText);
      return NextResponse.json({ 
        error: 'Invalid response from image server',
        details: responseText.substring(0, 200)
      }, { status: 500 });
    }

    if (!data.success) {
      console.error('ImgBB error:', data);
      return NextResponse.json({ 
        error: data.error?.message || 'Upload failed',
        details: JSON.stringify(data.error)
      }, { status: 500 });
    }

    console.log('Upload successful:', data.data.url);
    return NextResponse.json({ url: data.data.url });
    
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ 
      error: 'Upload failed: ' + (error instanceof Error ? error.message : 'Unknown error')
    }, { status: 500 });
  }
}
