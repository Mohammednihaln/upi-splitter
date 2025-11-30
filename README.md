# 💰 Freelancer UPI Payment Splitter

A single-page web application designed for freelancers to split invoice payments into separate components (Base Amount, GST, and Advance) and generate individual UPI links for each component.

## 🚀 Features

- **Smart Payment Splitting**: Automatically calculates Base Amount, GST, and Advance payments
- **UPI links**: Generate copyable links for each payment component
- **Real-time Calculations**: Live preview of split amounts as you type
- **Dark Mode**: Toggle between light and dark themes with persistent preference
- **Mobile-First Design**: Fully responsive interface optimized for all devices
- **Copy to Clipboard**: Easily copy UPI payment links by clicking it
- **Print/PDF Export**: Print or save payment details as PDF
- **Offline Ready**: Works without internet connection once loaded
- **No Backend Required**: Pure client-side application

## 📋 Usage

### Online

Simply open `index.html` in any modern web browser.

### Local Development

1. Clone or download this repository
2. Open `index.html` in your browser
3. No build process or dependencies required!

### Input Fields

1. **Total Invoice Amount (₹)**: Enter your total invoice amount including GST
2. **GST Rate (%)**: Adjust the GST rate slider (0-28%, default 18%)
3. **Client UPI ID**: Enter your client's UPI ID (format: username@bank)
4. **Advance Payment (%)**: Set advance payment percentage (0-100%, default 0%)

### How It Works

The app automatically calculates:
- **Base Amount** = Total / (1 + GST Rate/100)
- **GST Amount** = Total - Base Amount
- **Advance Amount** = Total × (Advance %/100)

Each component gets its own scannable UPI QR code that your client can use to make split payments.

## 🎯 Use Cases

- **Freelancers**: Split invoice payments for better tax compliance
- **Consultants**: Request advance payments with separate QR codes
- **Service Providers**: Simplify GST collection from clients
- **Small Businesses**: Generate payment QR codes on the go

## 💡 Example

**Scenario**: You have an invoice of ₹11,800 with 18% GST and want 30% advance.

**Results**:
- Base Amount: ₹10,000.00
- GST Amount: ₹1,800.00
- Advance Amount: ₹3,540.00

The app generates 3 separate UPI links that your client can click and pay each component individually.

## 🛠️ Technical Details

### Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Custom styling with CSS variables for theming
- **JavaScript (ES6+)**: Vanilla JS, no frameworks

### Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari 14+, Chrome Android 90+)

### Features

- ✅ Client-side only (no server required)
- ✅ Works offline after initial load
- ✅ Responsive design (mobile-first)
- ✅ Dark mode with system preference detection
- ✅ LocalStorage for theme persistence
- ✅ Print-friendly layout
- ✅ Clipboard API integration
- ✅ Input validation with error messages
- ✅ Real-time calculations
- ✅ Accessible (44px touch targets, proper focus states)

## 📱 Screenshots

### Light Mode
The app features a clean, modern interface with clear input fields and instant feedback.

### Dark Mode
Comfortable dark theme for low-light environments with automatic system preference detection.

### Mobile View
Optimized single-column layout for mobile devices with large touch targets.

## 🔒 Security & Privacy

- No data is sent to any server
- All calculations happen in your browser
- Theme preference stored locally only
- No tracking or analytics
- No external dependencies except QRCode.js CDN

## 📄 File Structure

```
freelancer-upi-splitter/
├── index.html          # Main HTML file with embedded CSS
├── app.js              # JavaScript application logic
├── README.md           # This file
└── .kiro/              # Spec files (requirements, design, tasks)
    └── specs/
        └── freelancer-upi-splitter/
            ├── requirements.md
            ├── design.md
            └── tasks.md
```

## 🚀 Deployment

### GitHub Pages

1. Push to GitHub repository
2. Go to Settings → Pages
3. Select main branch
4. Your app will be live at `https://username.github.io/repo-name`

### Netlify / Vercel

1. Drag and drop the folder to Netlify/Vercel
2. Instant deployment with custom domain support

### Local File

Simply open `index.html` in any browser - works perfectly as a local file!

## 🤝 Contributing

This is a hackathon project built with Kiro AI. Feel free to fork and customize for your needs!

## 📝 License

MIT License - Feel free to use this for personal or commercial projects.

## 🙏 Acknowledgments

- Built using spec-driven development with Kiro AI
- Designed for the freelancer community

## 📞 Support

For issues or questions, please open an issue on GitHub.

---

**Made for Freelancers to ease their work**
