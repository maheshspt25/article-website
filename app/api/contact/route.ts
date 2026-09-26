import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    
    // Inject the secure key on the server
    const payload = {
      ...data,
      access_key: process.env.NEXT_WEB3FORMS_KEY,
    };

    if (!payload.access_key) {
      console.error('SERVER ERROR: NEXT_WEB3FORMS_KEY is missing.');
      return NextResponse.json({ success: false, message: 'Server configuration error: Missing API Key' }, { status: 500 });
    }

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      return NextResponse.json({ success: false, message: result.message || 'Failed to send message' }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: 'Message sent successfully' }, { status: 200 });
  } catch (error: any) {
    console.error('Web3Forms API Route Error:', error);
    return NextResponse.json({ success: false, message: 'Something went wrong on the server.' }, { status: 500 });
  }
}
