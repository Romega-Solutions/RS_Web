# Contact Form Setup Guide

The contact form is now fully integrated with EmailJS, Google reCAPTCHA v2, and Google Analytics tracking.

## Features Implemented

✅ **EmailJS Integration** - Sends emails directly from the client-side
✅ **reCAPTCHA v2** - Spam protection with visible checkbox
✅ **Honeypot Field** - Additional bot detection (silent rejection)
✅ **Google Analytics** - Tracks form submissions with gtag events
✅ **Form Validation** - Client-side validation with error messages
✅ **Loading States** - Animated spinner during submission
✅ **Success/Error Notifications** - User feedback after submission

## Environment Variables Required

The following environment variables need to be configured in your `.env.local` file:

### EmailJS Configuration
Already configured with production credentials:
- `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=JD0EOnTsEC1LeFyhe`
- `NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_8r6ul7n`
- `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_5i4etfg`

### Google reCAPTCHA v2
**ACTION REQUIRED:** You need to get your reCAPTCHA Site Key:

1. Go to https://www.google.com/recaptcha/admin
2. Register a new site or use an existing one
3. Select reCAPTCHA v2 → "I'm not a robot" Checkbox
4. Add your domain(s):
   - `localhost` (for development)
   - `romegasolutions.com` (for production)
   - `www.romegasolutions.com`
5. Copy the **Site Key** (not the Secret Key)
6. Update `.env.local`:
   ```
   NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_actual_site_key_here
   ```

### Google Analytics
Already configured:
- `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-B58C5MNZTZ`

## How It Works

### 1. Bot Protection (Multi-Layer)
- **Honeypot Field**: Hidden field that bots typically fill out (silent rejection)
- **reCAPTCHA v2**: Visible "I'm not a robot" checkbox for human verification

### 2. Email Sending Flow
1. User fills out the form
2. Client-side validation checks all required fields
3. reCAPTCHA validates the user is human
4. EmailJS sends the email with the following data:
   - Name, Email, Phone, Company
   - Subject and Message
   - Timestamp of submission
   - reCAPTCHA response token

### 3. Analytics Tracking
When the form is successfully submitted, a Google Analytics event is fired:
```javascript
gtag('event', 'form_submission', {
  event_category: 'Contact',
  event_label: 'Contact Form Submitted',
  value: 1
});
```

## Testing the Form

### Test with Valid Data
1. Fill out all required fields with valid data
2. Complete the reCAPTCHA checkbox
3. Click "Send Message"
4. You should see a success message
5. Check the configured email inbox for the message

### Test Bot Protection
1. Open browser developer tools
2. Find the hidden honeypot field: `input[name="botfield"]`
3. Fill it with any value
4. Submit the form
5. Form should be silently rejected (no feedback given)

## EmailJS Template Variables

Your EmailJS template should use these variables:
- `{{from_name}}` - Full name (firstName + lastName)
- `{{from_email}}` - Email address
- `{{phone}}` - Phone number
- `{{company}}` - Company name (or "Not specified")
- `{{subject}}` - Selected subject
- `{{message}}` - Message content
- `{{to_name}}` - "Romega Solutions Team"
- `{{reply_to}}` - Timestamp of submission
- `{{g-recaptcha-response}}` - reCAPTCHA token (for verification)

## Troubleshooting

### reCAPTCHA not showing
- Verify `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` is set correctly
- Check browser console for errors
- Ensure you're using a v2 site key, not v3

### Emails not sending
- Verify EmailJS credentials in `.env.local`
- Check EmailJS dashboard for usage limits
- Verify the service and template IDs are correct
- Check browser console for EmailJS errors

### Form validation not working
- Check that all required fields have the `required` span
- Verify validation logic in `validateForm()` function
- Check browser console for JavaScript errors

## Security Notes

- **Honeypot Field**: Invisible to users, automatically filled by bots
- **reCAPTCHA**: Prevents automated submissions
- **Client-Side Validation**: Basic validation before submission
- **EmailJS Rate Limiting**: EmailJS has built-in rate limiting
- **Environment Variables**: Never commit `.env.local` to git

## Files Modified

1. `app/layout.tsx` - Added Google Analytics script
2. `components/organisms/contact/ContactForm.tsx` - Full EmailJS & reCAPTCHA integration
3. `.env.local` - Added all required environment variables
4. `.env.example` - Updated with new variables documentation

## Next Steps

1. **Get reCAPTCHA Site Key**: Follow the instructions above
2. **Test the form**: Submit a test message to verify everything works
3. **Monitor EmailJS**: Check your EmailJS dashboard for usage
4. **Check Analytics**: Verify form submissions appear in Google Analytics

---

**Note**: Remember to keep your `.env.local` file private and never commit it to version control!
