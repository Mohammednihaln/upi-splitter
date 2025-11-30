# Design Document

## Overview

The Freelancer UPI Payment Splitter is a client-side single-page application that calculates invoice payment splits and generates UPI QR codes. The application uses vanilla JavaScript for logic, CSS for styling (with optional Tailwind CSS via CDN), and the qrcode.js library for QR code generation. All processing happens in the browser with no backend dependencies.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────┐
│         User Interface Layer            │
│  (HTML Form + Display Components)       │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│      Application Logic Layer            │
│  - Input Validation                     │
│  - Calculation Engine                   │
│  - QR Code Generator                    │
│  - Theme Manager                        │
│  - Clipboard Manager                    │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│         Browser APIs Layer              │
│  - LocalStorage (theme preference)      │
│  - Clipboard API                        │
│  - Print API                            │
└─────────────────────────────────────────┘
```

### Technology Stack

- **HTML5**: Semantic markup for form and display elements
- **CSS3**: Styling with mobile-first responsive design
- **JavaScript (ES6+)**: Application logic and DOM manipulation
- **qrcode.js**: QR code generation library (via CDN)
- **Optional Tailwind CSS**: Utility-first CSS framework (via CDN)

### Design Patterns

- **MVC-like separation**: Clear separation between UI (view), calculation logic (model), and event handlers (controller)
- **Event-driven updates**: Input changes trigger immediate recalculation and UI updates
- **Progressive enhancement**: Core functionality works without JavaScript, enhanced with interactivity

## Components and Interfaces

### 1. Input Form Component

**Responsibilities:**
- Capture user inputs (total amount, GST rate, UPI ID, advance percentage)
- Validate inputs in real-time
- Display error messages

**Interface:**
```javascript
// Input elements
- totalAmountInput: HTMLInputElement (type="number")
- gstRateSlider: HTMLInputElement (type="range", min=0, max=28, default=18)
- upiIdInput: HTMLInputElement (type="text")
- advancePercentSlider: HTMLInputElement (type="range", min=0, max=100, default=0)

// Event handlers
- onTotalAmountChange()
- onGstRateChange()
- onUpiIdChange()
- onAdvancePercentChange()
```

### 2. Calculation Engine

**Responsibilities:**
- Calculate base amount from total and GST rate
- Calculate GST amount
- Calculate advance amount
- Validate calculation inputs

**Interface:**
```javascript
class CalculationEngine {
  calculateBaseAmount(total: number, gstRate: number): number
  calculateGstAmount(total: number, baseAmount: number): number
  calculateAdvanceAmount(total: number, advancePercent: number): number
  validateAmount(amount: number): boolean
  formatCurrency(amount: number): string
}
```

**Formulas:**
- Base Amount = Total / (1 + GST_Rate/100)
- GST Amount = Total - Base Amount
- Advance Amount = Total × (Advance_Percent/100)

### 3. UPI Link Generator

**Responsibilities:**
- Generate UPI payment links in standard format
- Validate UPI ID format
- Create links for each payment component

**Interface:**
```javascript
class UpiLinkGenerator {
  generateUpiLink(upiId: string, amount: number, description: string): string
  validateUpiId(upiId: string): boolean
}
```

**UPI Link Format:**
```
upi://pay?pa={UPI_ID}&am={AMOUNT}&tn={DESCRIPTION}&cu=INR
```

### 4. QR Code Manager

**Responsibilities:**
- Generate QR codes from UPI links using qrcode.js
- Display QR codes with labels
- Handle QR code visibility based on amounts

**Interface:**
```javascript
class QrCodeManager {
  generateQrCode(containerId: string, upiLink: string, size: number): void
  clearQrCode(containerId: string): void
  shouldDisplayQrCode(amount: number): boolean
}
```

### 5. Split Display Component

**Responsibilities:**
- Display calculated amounts in a table
- Update display when calculations change
- Format amounts with currency symbols

**Interface:**
```javascript
// Display elements
- baseAmountDisplay: HTMLElement
- gstAmountDisplay: HTMLElement
- advanceAmountDisplay: HTMLElement
- totalAmountDisplay: HTMLElement

// Update methods
- updateSplitDisplay(baseAmount, gstAmount, advanceAmount, total)
```

### 6. Theme Manager

**Responsibilities:**
- Detect system theme preference
- Toggle between light and dark modes
- Persist theme preference in localStorage
- Apply theme classes to document

**Interface:**
```javascript
class ThemeManager {
  detectSystemTheme(): string
  loadSavedTheme(): string
  toggleTheme(): void
  applyTheme(theme: string): void
  saveTheme(theme: string): void
}
```

### 7. Clipboard Manager

**Responsibilities:**
- Copy UPI links to clipboard
- Show success/error feedback
- Handle clipboard API permissions

**Interface:**
```javascript
class ClipboardManager {
  copyToClipboard(text: string): Promise<boolean>
  showCopyFeedback(success: boolean, element: HTMLElement): void
}
```

### 8. Print Manager

**Responsibilities:**
- Trigger browser print dialog
- Apply print-specific styles
- Ensure QR codes are included in print output

**Interface:**
```javascript
class PrintManager {
  triggerPrint(): void
}
```

### 9. Validation Manager

**Responsibilities:**
- Validate all user inputs
- Display error messages
- Enable/disable QR generation based on validation state

**Interface:**
```javascript
class ValidationManager {
  validateTotalAmount(amount: number): ValidationResult
  validateUpiId(upiId: string): ValidationResult
  displayError(fieldId: string, message: string): void
  clearError(fieldId: string): void
  isFormValid(): boolean
}

interface ValidationResult {
  isValid: boolean
  errorMessage: string
}
```

## Data Models

### PaymentSplit

```javascript
interface PaymentSplit {
  total: number
  gstRate: number
  baseAmount: number
  gstAmount: number
  advancePercent: number
  advanceAmount: number
  upiId: string
}
```

### UpiPaymentLink

```javascript
interface UpiPaymentLink {
  upiId: string
  amount: number
  description: string
  currency: string
  fullLink: string
}
```

### ValidationError

```javascript
interface ValidationError {
  field: string
  message: string
  isActive: boolean
}
```

### ThemePreference

```javascript
interface ThemePreference {
  mode: 'light' | 'dark'
  isSystemDefault: boolean
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*


### Property 1: GST calculation correctness
*For any* valid total amount and GST rate between 0 and 28, the calculated base amount should equal Total / (1 + GST_Rate/100), and the GST amount should equal Total - Base Amount.
**Validates: Requirements 2.5, 2.6**

### Property 2: Advance calculation correctness
*For any* valid total amount and advance percentage between 0 and 100, the calculated advance amount should equal Total × (Advance_Percent/100).
**Validates: Requirements 4.3**

### Property 3: Input reactivity
*For any* change to total amount, GST rate, or advance percentage, all dependent calculated values (base amount, GST amount, advance amount) should be recalculated and displayed immediately.
**Validates: Requirements 1.3, 2.3, 5.2**

### Property 4: Amount formatting consistency
*For any* calculated amount value, when displayed in the UI, it should include the rupee symbol (₹) and be formatted to exactly two decimal places.
**Validates: Requirements 1.4, 5.3**

### Property 5: UPI link format correctness
*For any* valid UPI ID and positive amount, the generated UPI payment link should follow the exact format: `upi://pay?pa={UPI_ID}&am={AMOUNT}&tn=Invoice&cu=INR`.
**Validates: Requirements 6.2**

### Property 6: UPI ID validation
*For any* string input as UPI ID, the validation should accept formats matching the pattern `alphanumeric@alphanumeric` (including hyphens, dots, underscores in username) and reject all other formats.
**Validates: Requirements 3.1, 3.4**

### Property 7: Input range validation
*For any* numeric input, the system should accept GST rates between 0-28%, advance percentages between 0-100%, and total amounts greater than zero, while rejecting values outside these ranges.
**Validates: Requirements 1.1, 2.2, 4.2**

### Property 8: Conditional QR code display
*For any* payment component (base, GST, advance), a QR code should be generated and displayed if and only if the amount is greater than zero and all inputs are valid.
**Validates: Requirements 4.5, 6.1, 6.5**

### Property 9: Error state prevents QR generation
*For any* validation error (invalid UPI ID, invalid amount, out-of-range values), the system should disable QR code generation and display an appropriate error message.
**Validates: Requirements 1.2, 3.2, 11.3**

### Property 10: Error clearing on correction
*For any* input field with a validation error, when the user corrects the input to a valid value, the error message should be cleared immediately.
**Validates: Requirements 11.4**

### Property 11: QR code minimum size
*For any* generated QR code, the rendered size should be at least 200×200 pixels to ensure scannability on mobile devices.
**Validates: Requirements 6.6**

### Property 12: Copy to clipboard functionality
*For any* generated UPI payment link, clicking the associated copy button should copy the exact UPI link string to the system clipboard and display a confirmation message.
**Validates: Requirements 7.2, 7.3**

### Property 13: Theme persistence
*For any* theme change (light to dark or dark to light), the selected theme should be saved to browser localStorage and restored on subsequent page loads.
**Validates: Requirements 8.4, 12.5**

### Property 14: Theme toggle reactivity
*For any* theme toggle action, the UI should immediately apply the new theme's color scheme to all elements.
**Validates: Requirements 8.3**

### Property 15: Print content inclusion
*For any* print action, the print output should include all split amounts, QR codes, and labels, while excluding interactive UI controls (buttons, sliders, input fields).
**Validates: Requirements 9.3, 9.4**

### Property 16: Responsive layout adaptation
*For any* viewport width below 768 pixels, all form elements should be displayed in a single column layout, and for widths above 768 pixels, the layout should optimize for horizontal space.
**Validates: Requirements 10.1, 10.5**

### Property 17: Touch target accessibility
*For any* interactive element (button, slider, input), the touch target size should be at least 44×44 pixels to ensure mobile usability.
**Validates: Requirements 10.2**

### Property 18: Table structure consistency
*For any* application state, the split amounts table should always display rows for Base Amount, GST Amount, Advance Amount (or zero), and Total Amount with proper labels.
**Validates: Requirements 5.1, 5.5**

### Property 19: QR code labeling
*For any* generated QR code, it should be accompanied by a clear label indicating whether it represents Base Amount, GST Amount, or Advance Amount.
**Validates: Requirements 6.4**

### Property 20: Copy button presence
*For any* generated QR code, a copy button should be displayed adjacent to it.
**Validates: Requirements 7.1**

## Error Handling

### Input Validation Errors

1. **Invalid Total Amount**
   - Error: "Total amount must be greater than zero"
   - Trigger: User enters zero, negative, or non-numeric value
   - Action: Display error, disable QR generation, highlight field

2. **Invalid UPI ID**
   - Error: "Invalid UPI ID format. Use: username@bank"
   - Trigger: User enters UPI ID not matching pattern
   - Action: Display error, disable QR generation, highlight field

3. **Out of Range GST Rate**
   - Error: "GST rate must be between 0% and 28%"
   - Trigger: Slider value outside valid range (should be prevented by HTML constraints)
   - Action: Clamp value to valid range

4. **Out of Range Advance Percentage**
   - Error: "Advance percentage must be between 0% and 100%"
   - Trigger: Slider value outside valid range (should be prevented by HTML constraints)
   - Action: Clamp value to valid range

### Runtime Errors

1. **Clipboard API Failure**
   - Error: "Failed to copy to clipboard. Please try again."
   - Trigger: Clipboard API not available or permission denied
   - Action: Display error message, suggest manual copy

2. **QR Code Generation Failure**
   - Error: "Failed to generate QR code. Please refresh the page."
   - Trigger: qrcode.js library fails to load or execute
   - Action: Display error message, log to console

3. **LocalStorage Failure**
   - Error: Silent failure with fallback to default theme
   - Trigger: LocalStorage not available or quota exceeded
   - Action: Continue with default theme, log warning to console

### Error Display Strategy

- **Inline errors**: Display next to the relevant input field
- **Toast notifications**: Use for clipboard and QR generation errors
- **Visual indicators**: Red border on invalid fields, error icon
- **Error clearing**: Remove errors immediately when input becomes valid

## Testing Strategy

### Unit Testing

The application will use **Vitest** as the testing framework for unit tests. Unit tests will cover:

1. **Calculation Functions**
   - Test specific examples: calculateBaseAmount(11800, 18) should return 10000
   - Test edge cases: zero GST rate, 100% advance
   - Test rounding: ensure two decimal places in results

2. **Validation Functions**
   - Test valid UPI IDs: "user@bank", "user.name@bank", "user_123@bank"
   - Test invalid UPI IDs: "user", "@bank", "user@", "user bank"
   - Test amount validation: positive, zero, negative, non-numeric

3. **Formatting Functions**
   - Test currency formatting: 10000 → "₹10,000.00"
   - Test decimal handling: 10000.5 → "₹10,000.50"

4. **UPI Link Generation**
   - Test link format with various inputs
   - Test special character encoding in amounts

5. **Theme Management**
   - Test theme detection and switching
   - Test localStorage save/load

### Property-Based Testing

The application will use **fast-check** library for property-based testing. Each property-based test will run a minimum of 100 iterations.

**Test Configuration:**
```javascript
import fc from 'fast-check'

// Configure to run 100 iterations per property
fc.assert(
  fc.property(/* generators */, /* test function */),
  { numRuns: 100 }
)
```

**Tagging Convention:**
Each property-based test must include a comment tag in this exact format:
```javascript
// Feature: freelancer-upi-splitter, Property 1: GST calculation correctness
```

**Property Tests to Implement:**

1. **Property 1: GST calculation correctness**
   - Generator: Random total amounts (100-1000000), GST rates (0-28)
   - Test: Verify Base = Total / (1 + GST/100) and GST = Total - Base

2. **Property 2: Advance calculation correctness**
   - Generator: Random total amounts, advance percentages (0-100)
   - Test: Verify Advance = Total × (Advance%/100)

3. **Property 3: Input reactivity**
   - Generator: Random input changes
   - Test: Verify all calculations update after input change

4. **Property 4: Amount formatting consistency**
   - Generator: Random amounts
   - Test: Verify format includes ₹ and two decimal places

5. **Property 5: UPI link format correctness**
   - Generator: Random valid UPI IDs and amounts
   - Test: Verify link matches exact format

6. **Property 6: UPI ID validation**
   - Generator: Random valid and invalid UPI ID strings
   - Test: Verify validation accepts valid and rejects invalid

7. **Property 7: Input range validation**
   - Generator: Random values inside and outside valid ranges
   - Test: Verify acceptance/rejection based on ranges

8. **Property 8: Conditional QR code display**
   - Generator: Random amounts including zero
   - Test: Verify QR displayed only when amount > 0

9. **Property 9: Error state prevents QR generation**
   - Generator: Random invalid inputs
   - Test: Verify QR generation disabled when errors present

10. **Property 10: Error clearing on correction**
    - Generator: Random invalid then valid inputs
    - Test: Verify error clears when input becomes valid

**Edge Cases Covered by Generators:**
- Zero amounts (advance percentage = 0)
- Maximum values (GST = 28%, advance = 100%)
- Minimum values (GST = 0%, advance = 0%)
- Special characters in UPI IDs (hyphens, dots, underscores)
- Very large amounts (testing number precision)
- Boundary values (exactly 768px for responsive breakpoint)

### Integration Testing

While the focus is on unit and property tests, basic integration tests will verify:

1. **End-to-End Flow**
   - Enter all inputs → Verify calculations → Verify QR codes generated
   - Test with various input combinations

2. **Theme Persistence**
   - Toggle theme → Reload page → Verify theme persists

3. **Print Functionality**
   - Trigger print → Verify print preview contains expected elements

### Test Organization

```
/tests
  /unit
    calculation.test.js
    validation.test.js
    formatting.test.js
    upi-link.test.js
    theme.test.js
  /property
    calculation-properties.test.js
    validation-properties.test.js
    ui-properties.test.js
    integration-properties.test.js
```

## Performance Considerations

1. **Calculation Performance**
   - All calculations are synchronous and lightweight
   - No performance optimization needed for calculation functions

2. **QR Code Generation**
   - QR codes generated on-demand when inputs change
   - Debounce input changes (300ms) to avoid excessive regeneration
   - Clear previous QR codes before generating new ones

3. **DOM Updates**
   - Use efficient DOM manipulation (update text content, not innerHTML)
   - Batch DOM updates when multiple values change

4. **LocalStorage**
   - Minimal data stored (only theme preference)
   - No performance impact expected

## Security Considerations

1. **Input Sanitization**
   - Validate all user inputs before processing
   - Use type="number" for numeric inputs to prevent injection
   - Sanitize UPI ID input to prevent XSS

2. **No Sensitive Data**
   - Application doesn't store payment information
   - UPI links are generated client-side only
   - No data sent to external servers

3. **CDN Integrity**
   - Use Subresource Integrity (SRI) hashes for CDN resources
   - Fallback to local copies if CDN fails

4. **Content Security Policy**
   - Implement CSP headers if deployed on a server
   - Restrict script sources to self and trusted CDNs

## Deployment

### Build Process

No build process required - the application is a single HTML file with inline or linked CSS/JS.

### Deployment Options

1. **Static File Hosting**
   - Deploy to GitHub Pages, Netlify, Vercel, or similar
   - Simply upload the HTML file

2. **Local Usage**
   - Open HTML file directly in browser
   - Works offline once loaded

3. **CDN Dependencies**
   - qrcode.js: https://cdn.jsdelivr.net/npm/qrcode@1.5.3/build/qrcode.min.js
   - Optional Tailwind CSS: https://cdn.tailwindcss.com

### Browser Compatibility

- **Minimum Requirements:**
  - ES6+ JavaScript support
  - CSS Grid and Flexbox
  - Clipboard API (with fallback)
  - LocalStorage API
  - Print API

- **Supported Browsers:**
  - Chrome 90+
  - Firefox 88+
  - Safari 14+
  - Edge 90+
  - Mobile browsers (iOS Safari 14+, Chrome Android 90+)

## Future Enhancements

1. **Multiple Currency Support**
   - Add currency selector
   - Support different currency symbols and formats

2. **Payment History**
   - Store previous payment splits in localStorage
   - Allow viewing and reusing past splits

3. **Custom Labels**
   - Allow freelancers to customize QR code labels
   - Add custom transaction notes

4. **Bulk Generation**
   - Generate multiple payment splits at once
   - Export as PDF with all QR codes

5. **TDS Calculation**
   - Add TDS (Tax Deducted at Source) calculation
   - Generate separate QR for TDS amount

6. **Share Functionality**
   - Generate shareable link with pre-filled values
   - Share via WhatsApp, Email, etc.
