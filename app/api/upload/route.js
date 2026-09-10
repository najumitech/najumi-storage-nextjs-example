import { NextResponse } from 'next/server';
import { NajumiStorage } from '@najumi/storage';

// Initialize Najumi Storage client securely using environment variables
const storage = new NajumiStorage({
  baseUrl: process.env.NEXT_PUBLIC_NAJUMI_BASE_URL || 'https://storage-api.najumitech.com',
  bucketId: process.env.NAJUMI_BUCKET_ID,
  accessKey: process.env.NAJUMI_ACCESS_KEY,
  secretKey: process.env.NAJUMI_SECRET_KEY,
});

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ status: 'error', message: 'No file provided' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filePath = `/uploads/${Date.now()}-${file.name}`;

    // Upload file to Najumi Storage
    const result = await storage.upload(buffer, filePath);

    return NextResponse.json({ status: 'success', data: result });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}
