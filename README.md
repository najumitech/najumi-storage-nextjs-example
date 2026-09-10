# Najumi Storage Next.js Example

An enterprise-grade object storage example built for developers. Learn how to integrate **Najumi Storage** into your Next.js applications in under 5 minutes.

---

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone [https://github.com/najumitech/najumi-storage-nextjs-example.git](https://github.com/najumitech/najumi-storage-nextjs-example.git)
cd najumi-storage-nextjs-example

2. Install Dependencies
npm install

3. Configure Environment Variables
​Create a .env.local file in the root directory and add your Najumi Storage credentials:
NEXT_PUBLIC_NAJUMI_BASE_URL=[https://storage-api.najumitech.com](https://storage-api.najumitech.com)
NAJUMI_BUCKET_ID=njs_bucket_xxxxx
NAJUMI_ACCESS_KEY=your_access_key
NAJUMI_SECRET_KEY=your_secret_key

4. Run the Development Server
npm run dev

📦 Code Implementation (app/api/upload/route.js)
​Here is how the backend API securely handles file uploads using the @najumi/storage SDK:
import { NextResponse } from 'next/server';
import { NajumiStorage } from '@najumi/storage';

const storage = new NajumiStorage({
  baseUrl: process.env.NEXT_PUBLIC_NAJUMI_BASE_URL || '[https://storage-api.najumitech.com](https://storage-api.najumitech.com)',
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

    const result = await storage.upload(buffer, filePath);

    return NextResponse.json({ status: 'success', data: result });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}

🛡️ Security Best Practices
​Never expose your NAJUMI_SECRET_KEY in client-side components. Always route storage operations through secure backend endpoints like the one shown above.
​📄 License
​This project is licensed under the MIT License - see the LICENSE file for details.
​<p align="center">
Built with precision by <a href="https://najumitech.com">Najumi Tech Ltd</a>.
</p>

