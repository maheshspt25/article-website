const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const content = `
    <p>Google Takeout is the official, secure way to download a complete backup of your Gmail inbox. Whether you are migrating to a new email service, closing a Workspace account, or just want offline archives for compliance, Google Takeout exports your emails into an industry-standard <strong>.MBOX format</strong>.</p>
    
    <h2>Why Export Your Gmail Data?</h2>
    <ul>
      <li><strong>Offline Backup:</strong> Protect against accidental deletion or account lockouts.</li>
      <li><strong>Migration:</strong> Import the MBOX file into Apple Mail, Mozilla Thunderbird, or Microsoft Outlook.</li>
      <li><strong>Storage Relief:</strong> Archive old emails locally and delete them from Gmail to free up your 15GB free Google Drive storage.</li>
    </ul>

    <h2>Step-by-Step Instructions</h2>
    
    <h3>1. Access Google Takeout</h3>
    <p>Go directly to <a href="https://takeout.google.com" target="_blank" rel="noopener noreferrer">takeout.google.com</a> and log in with the Google Account you wish to backup.</p>

    <h3>2. Deselect All Products</h3>
    <p>By default, Google selects all 50+ of its services (Drive, Photos, Maps, etc.). Click the <strong>"Deselect all"</strong> button at the top of the list so you don't download unnecessary terabytes of data.</p>

    <h3>3. Select Only Mail (Gmail)</h3>
    <p>Scroll down the list until you find <strong>Mail</strong>. Check the box next to it. 
    <em>Pro Tip:</em> You can click the "All Mail data included" button to specifically select certain labels (like only "Inbox" or "Sent") if you don't want to download the entire account.</p>

    <h3>4. Configure Export Settings</h3>
    <p>Scroll to the very bottom and click <strong>"Next step"</strong>. You will be asked to configure the following:</p>
    <ul>
      <li><strong>Destination:</strong> "Send download link via email" is the best option. You can also send it directly to Dropbox, OneDrive, or Box.</li>
      <li><strong>Frequency:</strong> Choose "Export once" for a one-time backup.</li>
      <li><strong>File type:</strong> Leave it as <strong>.zip</strong>.</li>
      <li><strong>File size:</strong> Leave the maximum size at 2GB or 10GB. If your email archive is larger than the limit, Google will automatically split it into multiple zip files.</li>
    </ul>

    <h3>5. Create Export</h3>
    <p>Click <strong>"Create export"</strong>. Google will now begin compiling your emails in the background. You do not need to keep this tab open.</p>

    <h2>What Happens Next?</h2>
    <p>Depending on how old your account is and how many attachments you have, this process can take anywhere from a few minutes to several days. Google will send you an email titled <em>"Your Google data is ready to download"</em> when it is finished.</p>
    
    <div class="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 rounded-r">
      <p class="font-bold text-blue-900 mb-1">Security Warning</p>
      <p class="text-sm text-blue-800">You only have <strong>7 days</strong> to download the ZIP file once the email is sent. After that, the link expires for security reasons and you will have to request a new Takeout.</p>
    </div>
  `;

  const stepsJson = JSON.stringify([
    { step: 1, title: "Go to Google Takeout", text: "Open takeout.google.com and click 'Deselect all'." },
    { step: 2, title: "Select Mail", text: "Scroll down, find 'Mail', and check the box next to it." },
    { step: 3, title: "Configure Format", text: "Click Next Step. Choose .ZIP format and select 'Send download link via email'." },
    { step: 4, title: "Create Export", text: "Click 'Create export' and wait for Google's confirmation email." },
    { step: 5, title: "Download Archive", text: "Open the email from Google, verify your password, and download the .mbox file." }
  ]);

  const faqsJson = JSON.stringify([
    { q: "What format does Google Takeout use for emails?", a: "Google Takeout exports Gmail data as an .MBOX (Mailbox) file. This is an industry-standard format that can be imported into desktop clients like Mozilla Thunderbird or Apple Mail." },
    { q: "How long does a Google Takeout export take?", a: "It depends on the size of your inbox. A small inbox may take 10 minutes, while an account with 15GB of attachments could take 24 to 48 hours." },
    { q: "Can I open the downloaded .mbox file in a web browser?", a: "No. You cannot read an .mbox file directly. You must import it into a desktop email client like Thunderbird, or use a dedicated MBOX viewer application." }
  ]);

  await prisma.article.update({
    where: { slug: 'how-to-export-gmail-data-with-google-takeout' },
    data: {
      content: content,
      stepByStepJson: stepsJson,
      faqJson: faqsJson,
      summary: "Learn how to easily and securely backup your entire Gmail inbox using Google Takeout. Step-by-step guide on generating and downloading your .MBOX archive."
    }
  });

  console.log("Successfully updated article with real scraped/expert data!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
