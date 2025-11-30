# ✅ Feature Checklist

Use this checklist to verify all features are working correctly.

## 🧮 Calculation Features

- [ ] **Total Amount Input**
  - Enter a positive number (e.g., 11800)
  - See it formatted with rupee symbol in the table
  - Try entering 0 or negative - should show error

- [ ] **GST Rate Slider**
  - Default value is 18%
  - Slide from 0% to 28%
  - See percentage display update next to slider
  - See Base and GST amounts recalculate

- [ ] **Base Amount Calculation**
  - Formula: Base = Total / (1 + GST/100)
  - Example: ₹11,800 at 18% GST = ₹10,000 base
  - Should update instantly when total or GST changes

- [ ] **GST Amount Calculation**
  - Formula: GST = Total - Base
  - Example: ₹11,800 - ₹10,000 = ₹1,800 GST
  - Should always equal Total minus Base

- [ ] **Advance Amount Calculation**
  - Formula: Advance = Total × (Advance%/100)
  - Default is 0%
  - Example: ₹11,800 at 30% = ₹3,540 advance
  - Should update when slider moves

## 🔍 Validation Features

- [ ] **Total Amount Validation**
  - Empty field: No error until you type
  - Zero: Shows "Total amount must be greater than zero"
  - Negative: Shows error message
  - Valid positive number: No error, green border

- [ ] **UPI ID Validation**
  - Empty field: No error until you type
  - Invalid format (no @): Shows "Invalid UPI ID format"
  - Valid format (user@bank): No error, green border
  - Special characters (user.name_123@bank): Should work

- [ ] **Error Clearing**
  - Enter invalid value → see error
  - Correct the value → error disappears immediately
  - Error message appears near the input field

## 📱 QR Code Features

- [ ] **Base Amount QR Code**
  - Appears when total amount > 0 and UPI ID is valid
  - Size is at least 200×200 pixels
  - Label says "Base Amount"
  - Scannable with any UPI app

- [ ] **GST Amount QR Code**
  - Appears when GST amount > 0 and UPI ID is valid
  - Label says "GST Amount"
  - Separate from base amount QR

- [ ] **Advance Amount QR Code**
  - Hidden when advance % is 0
  - Appears when advance % > 0
  - Label says "Advance Amount"
  - Shows correct advance amount

- [ ] **QR Code Hiding**
  - All QR codes hidden when UPI ID is invalid
  - All QR codes hidden when total amount is 0 or invalid
  - QR codes appear immediately when inputs become valid

## 📋 Clipboard Features

- [ ] **Copy Base Amount Link**
  - Click "📋 Copy Link" under Base QR
  - See success toast: "Base amount link copied!"
  - Paste somewhere - should be UPI link format

- [ ] **Copy GST Amount Link**
  - Click copy button under GST QR
  - See success message
  - Link should have correct GST amount

- [ ] **Copy Advance Amount Link**
  - Click copy button under Advance QR
  - See success message
  - Link should have correct advance amount

- [ ] **UPI Link Format**
  - Format: `upi://pay?pa=USER@BANK&am=AMOUNT&tn=Invoice&cu=INR`
  - Amount should have 2 decimal places
  - UPI ID should be URL encoded

## 🎨 Theme Features

- [ ] **Initial Theme**
  - Detects system preference (light/dark)
  - Or loads saved preference from previous visit

- [ ] **Theme Toggle**
  - Click moon icon (🌙) → switches to dark mode
  - Click sun icon (☀️) → switches to light mode
  - Icon changes based on current theme

- [ ] **Dark Mode Colors**
  - Dark background
  - Light text
  - Proper contrast for readability
  - All elements visible

- [ ] **Theme Persistence**
  - Toggle theme
  - Refresh page
  - Theme should remain the same

## 🖨️ Print Features

- [ ] **Print Button**
  - Click "🖨️ Print" button in header
  - Browser print dialog opens

- [ ] **Print Preview**
  - All amounts visible
  - All QR codes visible
  - QR codes are scannable in print
  - Input fields hidden
  - Buttons hidden
  - Clean, professional layout

- [ ] **Print to PDF**
  - Select "Save as PDF" in print dialog
  - PDF includes all payment details
  - QR codes are clear and scannable

## 📱 Responsive Features

- [ ] **Mobile View (< 768px)**
  - Single column layout
  - Form on top, results below
  - All inputs easily tappable (44×44px minimum)
  - QR codes stack vertically
  - Text is readable

- [ ] **Desktop View (>= 768px)**
  - Two column layout
  - Form on left, results on right
  - Optimal use of horizontal space
  - Larger QR codes

- [ ] **Tablet View (768px - 1024px)**
  - Smooth transition between layouts
  - Everything remains accessible

## 🎯 User Experience Features

- [ ] **Real-time Updates**
  - Change any input
  - See all calculations update instantly
  - No delay or lag

- [ ] **Smooth Animations**
  - Theme toggle has smooth transition
  - Toast notifications slide in
  - No jarring changes

- [ ] **Visual Feedback**
  - Hover over buttons → color changes
  - Focus on inputs → blue border
  - Error states → red border
  - Success states → green indicators

- [ ] **Loading States**
  - QR codes generate quickly (< 100ms)
  - No loading spinners needed
  - Instant feedback

## 🔧 Technical Features

- [ ] **Offline Functionality**
  - Load page once
  - Disconnect internet
  - App still works (except first load)

- [ ] **No Backend**
  - All processing in browser
  - No API calls
  - No data sent to servers

- [ ] **LocalStorage**
  - Theme preference saved
  - Survives browser restart
  - No other data stored

- [ ] **Browser Compatibility**
  - Works in Chrome
  - Works in Firefox
  - Works in Safari
  - Works in Edge
  - Works on mobile browsers

## 🎪 Demo Scenarios

### Scenario 1: Standard Invoice
```
Input:
- Total: 11800
- GST: 18%
- UPI: freelancer@paytm
- Advance: 0%

Expected:
- Base: ₹10,000.00
- GST: ₹1,800.00
- Advance: ₹0.00 (QR hidden)
- 2 QR codes visible
```

### Scenario 2: With Advance
```
Input:
- Total: 23600
- GST: 18%
- UPI: designer@upi
- Advance: 30%

Expected:
- Base: ₹20,000.00
- GST: ₹3,600.00
- Advance: ₹7,080.00
- 3 QR codes visible
```

### Scenario 3: High GST
```
Input:
- Total: 12800
- GST: 28%
- UPI: consultant@bank
- Advance: 50%

Expected:
- Base: ₹10,000.00
- GST: ₹2,800.00
- Advance: ₹6,400.00
- 3 QR codes visible
```

### Scenario 4: Zero GST
```
Input:
- Total: 10000
- GST: 0%
- UPI: service@provider
- Advance: 0%

Expected:
- Base: ₹10,000.00
- GST: ₹0.00 (QR still shown)
- Advance: ₹0.00 (QR hidden)
- 2 QR codes visible
```

## 🐛 Error Scenarios

### Error 1: Invalid UPI ID
```
Input: "userbank" (no @)
Expected: Error message, no QR codes
```

### Error 2: Zero Amount
```
Input: 0
Expected: Error message, no QR codes
```

### Error 3: Negative Amount
```
Input: -100
Expected: Error message, no QR codes
```

### Error 4: Empty Fields
```
Input: Leave fields empty
Expected: No errors until user types
```

## ✅ Final Verification

- [ ] All calculation features work
- [ ] All validation features work
- [ ] All QR code features work
- [ ] All clipboard features work
- [ ] All theme features work
- [ ] All print features work
- [ ] All responsive features work
- [ ] All UX features work
- [ ] All technical features work
- [ ] All demo scenarios pass
- [ ] All error scenarios handled

## 🎉 Ready to Ship!

If all checkboxes are checked, your app is ready for:
- ✅ Production deployment
- ✅ Hackathon submission
- ✅ User testing
- ✅ Public release

---

**Testing completed by**: _______________
**Date**: _______________
**Status**: ⬜ Pass / ⬜ Fail
**Notes**: _______________
