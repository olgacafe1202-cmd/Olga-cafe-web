import { NextRequest, NextResponse } from 'next/server';

const IMGBB_API_KEY = "983c65c18779a75c25d95b44f228a648";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Only image files allowed' }, { status: 400 });
    }

    // Read file as ArrayBuffer and convert to base64 properly
    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    
    // Convert to base64 using btoa-compatible method
    let binary = '';
    for (let i = 0; i < uint8Array.length; i++) {
      binary += String.fromCharCode(uint8Array[i]);
    }
    const base64 = btoa(binary);

    // Upload to ImgBB
    const imgbbForm = new URLSearchParams();
    imgbbForm.append('key', IMGBB_API_KEY);
    imgbbForm.append('image', base64);

    const response = await fetch('https://api.imgbb.com/1/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: imgbbForm.toString(),
    });

    const data = await response.json();

    if (!data.success) {
      console.error('ImgBB error:', data);
      return NextResponse.json({ 
        error: data.error?.message || 'Upload failed'
      }, { status: 500 });
    }

    return NextResponse.json({ url: data.data.url });
    
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ 
      error: 'Upload failed: ' + (error instanceof Error ? error.message : 'Unknown error')
    }, { status: 500 });
  }
}
