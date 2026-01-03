import { NextRequest, NextResponse } from 'next/server';

const IMGBB_API_KEY = "983c65c18779a75c25d95b44f228a648";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    // Convert to base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString('base64');

    // Create URLSearchParams for ImgBB
    const params = new URLSearchParams();
    params.append('key', IMGBB_API_KEY);
    params.append('image', base64);

    const response = await fetch('https://api.imgbb.com/1/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    const text = await response.text();
    
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      console.error('Failed to parse ImgBB response:', text);
      return NextResponse.json({ error: 'Invalid response from image server' }, { status: 500 });
    }

    if (!data.success) {
      console.error('ImgBB error:', data);
      return NextResponse.json({ error: data.error?.message || 'Upload failed' }, { status: 500 });
    }

    return NextResponse.json({ url: data.data.url });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed: ' + (error instanceof Error ? error.message : 'Unknown error') }, { status: 500 });
  }
}
