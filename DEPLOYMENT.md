# 🚀 Deployment Guide

## Quick Start

Your Freelancer UPI Payment Splitter is ready to use! Simply open `index.html` in any modern web browser.

## Deployment Options

### 1. Local Usage (Immediate)

**Windows:**
```cmd
start index.html
```

**Mac/Linux:**
```bash
open index.html
```

Or simply double-click `index.html` in your file explorer.

### 2. GitHub Pages (Free Hosting)

1. Create a new GitHub repository
2. Push your files:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: UPI Payment Splitter"
   git branch -M main
   git remote add origin https://github.com/yourusername/upi-splitter.git
   git push -u origin main
   ```
3. Go to repository Settings → Pages
4. Select "main" branch as source
5. Your app will be live at: `https://yourusername.github.io/upi-splitter`

### 3. Netlify (One-Click Deploy)

1. Go to [netlify.com](https://netlify.com)
2. Drag and drop your project folder
3. Get instant deployment with HTTPS
4. Optional: Add custom domain

### 4. Vercel (Git Integration)

1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Automatic deployments on every push
4. Free SSL certificate included

### 5. Surge.sh (Command Line)

```bash
npm install -g surge
surge
```

Follow prompts to deploy instantly.

## Testing Checklist

Before deploying, verify these features work:

- [ ] Enter total amount and see calculations update
- [ ] Adjust GST slider (0-28%)
- [ ] Enter valid UPI ID (e.g., user@bank)
- [ ] Adjust advance percentage slider
- [ ] See QR codes generate for each component
- [ ] Click copy buttons to copy UPI links
- [ ] Toggle dark mode (moon/sun icon)
- [ ] Click print button to see print preview
- [ ] Test on mobile device (responsive layout)
- [ ] Verify error messages for invalid inputs

## Browser Testing

Test in these browsers for best compatibility:

- ✅ Chrome/Edge (90+)
- ✅ Firefox (88+)
- ✅ Safari (14+)
- ✅ Mobile browsers (iOS Safari, Chrome Android)

## File Structure

```
upi-splitter/
├── index.html          # Main application (open this!)
├── app.js              # JavaScript logic
├── README.md           # Documentation
├── DEPLOYMENT.md       # This file
└── .kiro/              # Spec files (optional for deployment)
```

## What Gets Deployed

**Required files:**
- `index.html` - Main HTML file
- `app.js` - JavaScript application logic

**Optional files:**
- `README.md` - Documentation
- `.kiro/` folder - Development specs (not needed for production)

## CDN Dependencies

The app uses these CDN resources (loaded automatically):
- QRCode.js: `https://cdn.jsdelivr.net/npm/qrcode@1.5.3/build/qrcode.min.js`

No build process or npm install required!

## Performance Tips

1. **Enable Gzip**: Most hosting providers do this automatically
2. **Add Caching Headers**: For static hosting (optional)
3. **Use HTTPS**: Free with GitHub Pages, Netlify, Vercel

## Troubleshooting

**QR codes not showing?**
- Check browser console for errors
- Ensure QRCode.js CDN is accessible
- Try refreshing the page

**Dark mode not persisting?**
- Check if localStorage is enabled in browser
- Try in incognito mode to test

**Print not working?**
- Ensure pop-ups are not blocked
- Try Ctrl+P (Cmd+P on Mac) as alternative

## Custom Domain (Optional)

All major hosting providers support custom domains:

**GitHub Pages:**
- Add CNAME file with your domain
- Configure DNS A records

**Netlify/Vercel:**
- Add domain in dashboard
- Follow DNS configuration steps

## Security Notes

- ✅ No backend required
- ✅ No data sent to servers
- ✅ All processing happens in browser
- ✅ No cookies or tracking
- ✅ Works offline after first load

## Support

For issues or questions:
1. Check browser console for errors
2. Verify all files are uploaded
3. Test in different browser
4. Open issue on GitHub (if applicable)

---

**Ready to deploy?** Just upload `index.html` and `app.js` to any web host!
