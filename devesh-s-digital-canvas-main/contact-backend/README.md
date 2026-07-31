# Contact Backend

Minimal Express backend to accept contact form submissions and forward them to a Gmail account using Nodemailer.

Installation

1. From the `contact-backend` folder install the dependencies listed in `package.json`:

```bash
npm install
```

Alternatively you can install the exact packages required with:

```bash
npm install express cors dotenv nodemailer
```

Usage

1. Copy `.env.example` to `.env` and fill in your Gmail user and app password.
2. Start the server:

```bash
node server.js
```

The server listens on port `5000` and exposes a POST endpoint at `/api/contact`.

Request format

POST /api/contact
Content-Type: application/json

Body:

```json
{
  "name": "Your name",
  "email": "you@example.com",
  "subject": "Subject here",
  "message": "The message body"
}
```

Responses

Success:

```json
{
  "success": true,
  "message": "Message sent successfully"
}
```

Failure:

```json
{
  "success": false,
  "message": "Failed to send message"
}
```

Frontend example (use from your portfolio)

```js
async function submitContact(formData) {
  const res = await fetch('http://localhost:5000/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
  return res.json();
}

// Example usage:
// submitContact({ name: 'Alice', email: 'alice@example.com', subject: 'Hello', message: 'Hi there' })
//   .then(r => console.log(r))
//   .catch(e => console.error(e));
```

Production notes

- Use a dedicated transactional email provider (SendGrid, Mailgun, SES) for higher deliverability in production.
- Use secure environment variable storage (not checked into source control).
- Consider adding rate limiting and request logging for abuse protection.
