'use server';

export async function submitContactForm(formData: FormData) {
  try {
    const data = {
      access_key: process.env.NEXT_WEB3FORMS_KEY,
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    };

    if (!data.access_key) {
      console.error('SERVER ACTION ERROR: NEXT_WEB3FORMS_KEY is missing from environment variables.');
      return { success: false, message: 'Server configuration error: Missing API Key in Vercel.' };
    }

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      console.error('WEB3FORMS API ERROR:', result);
      return { success: false, message: result.message || 'Failed to send message via Web3Forms API' };
    }

    return { success: true, message: 'Message sent successfully' };
  } catch (error: any) {
    console.error('Web3Forms Server Action Catch Block Error:', error);
    return { success: false, message: error.message || 'Something went wrong on the server. Please try again later.' };
  }
}
