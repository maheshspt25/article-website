'use server';

export async function submitContactForm(formData: FormData) {
  const data = {
    access_key: process.env.NEXT_WEB3FORMS_KEY,
    name: formData.get('name'),
    email: formData.get('email'),
    subject: formData.get('subject'),
    message: formData.get('message'),
  };

  if (!data.access_key) {
    return { success: false, message: 'Server configuration error: Missing API Key' };
  }

  try {
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
      return { success: false, message: result.message || 'Failed to send message' };
    }

    return { success: true, message: 'Message sent successfully' };
  } catch (error) {
    console.error('Web3Forms Server Action Error:', error);
    return { success: false, message: 'Something went wrong. Please try again later.' };
  }
}
