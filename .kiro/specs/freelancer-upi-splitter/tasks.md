# Implementation Plan

- [x] 1. Set up project structure and HTML foundation


  - Create index.html with semantic HTML5 structure
  - Add meta tags for mobile responsiveness
  - Include CDN links for qrcode.js and optional Tailwind CSS
  - Set up basic page layout with header, form section, and results section
  - _Requirements: 12.1, 12.3_

- [x] 2. Implement core calculation engine

  - [x] 2.1 Create calculation functions for base amount, GST amount, and advance amount


    - Write calculateBaseAmount(total, gstRate) function
    - Write calculateGstAmount(total, baseAmount) function
    - Write calculateAdvanceAmount(total, advancePercent) function
    - Write formatCurrency(amount) function for rupee formatting
    - _Requirements: 2.5, 2.6, 4.3, 1.4, 5.3_

  - [ ]* 2.2 Write property test for GST calculation correctness
    - **Property 1: GST calculation correctness**
    - **Validates: Requirements 2.5, 2.6**

  - [ ]* 2.3 Write property test for advance calculation correctness
    - **Property 2: Advance calculation correctness**
    - **Validates: Requirements 4.3**

  - [ ]* 2.4 Write property test for amount formatting consistency
    - **Property 4: Amount formatting consistency**
    - **Validates: Requirements 1.4, 5.3**

- [x] 3. Implement input validation system

  - [x] 3.1 Create validation functions

    - Write validateTotalAmount(amount) function
    - Write validateUpiId(upiId) function with regex pattern
    - Write validateGstRate(rate) and validateAdvancePercent(percent) functions
    - _Requirements: 1.1, 3.1, 3.4, 2.2, 4.2_

  - [ ]* 3.2 Write property test for UPI ID validation
    - **Property 6: UPI ID validation**
    - **Validates: Requirements 3.1, 3.4**

  - [ ]* 3.3 Write property test for input range validation
    - **Property 7: Input range validation**
    - **Validates: Requirements 1.1, 2.2, 4.2**

- [x] 4. Build input form UI with real-time validation

  - [x] 4.1 Create form HTML structure

    - Add total amount input field (type="number")
    - Add GST rate slider (type="range", min=0, max=28, default=18) with value display
    - Add UPI ID input field (type="text")
    - Add advance percentage slider (type="range", min=0, max=100, default=0) with value display
    - Add error message containers for each field
    - _Requirements: 1.1, 2.1, 2.2, 3.1, 4.1, 4.2_

  - [x] 4.2 Implement input event handlers

    - Add event listeners for all input changes
    - Connect inputs to validation functions
    - Display/clear error messages based on validation results
    - Update slider value displays in real-time
    - _Requirements: 1.2, 1.3, 2.3, 2.4, 3.2, 11.1, 11.2, 11.4, 11.5_

  - [ ]* 4.3 Write property test for error state prevents QR generation
    - **Property 9: Error state prevents QR generation**
    - **Validates: Requirements 1.2, 3.2, 11.3**

  - [ ]* 4.4 Write property test for error clearing on correction
    - **Property 10: Error clearing on correction**
    - **Validates: Requirements 11.4**

- [x] 5. Create split amounts display table

  - [x] 5.1 Build table HTML structure

    - Create table with rows for Base Amount, GST Amount, Advance Amount, and Total
    - Add proper labels and currency formatting placeholders
    - _Requirements: 5.1, 5.5_

  - [x] 5.2 Implement table update logic

    - Write updateSplitDisplay() function
    - Connect to calculation engine
    - Update table values when inputs change
    - Handle advance amount visibility (show zero or hide row)
    - _Requirements: 5.2, 5.3, 5.4_

  - [ ]* 5.3 Write property test for input reactivity
    - **Property 3: Input reactivity**
    - **Validates: Requirements 1.3, 2.3, 5.2**

  - [ ]* 5.4 Write property test for table structure consistency
    - **Property 18: Table structure consistency**
    - **Validates: Requirements 5.1, 5.5**

- [x] 6. Implement UPI link generation and QR code display

  - [x] 6.1 Create UPI link generator

    - Write generateUpiLink(upiId, amount, description) function
    - Format link as: upi://pay?pa={UPI_ID}&am={AMOUNT}&tn=Invoice&cu=INR
    - _Requirements: 6.2_

  - [x] 6.2 Implement QR code generation using qrcode.js

    - Write generateQrCode(containerId, upiLink, size) function
    - Create QR code containers in HTML for Base, GST, and Advance
    - Set minimum QR code size to 200x200 pixels
    - Add labels for each QR code (Base Amount, GST Amount, Advance Amount)
    - _Requirements: 6.1, 6.3, 6.4, 6.6_

  - [x] 6.3 Implement conditional QR display logic

    - Show/hide QR codes based on amount values (hide if zero)
    - Disable QR generation when validation errors exist
    - Clear QR codes when inputs become invalid
    - _Requirements: 4.4, 4.5, 6.5, 11.3_

  - [ ]* 6.4 Write property test for UPI link format correctness
    - **Property 5: UPI link format correctness**
    - **Validates: Requirements 6.2**

  - [ ]* 6.5 Write property test for conditional QR code display
    - **Property 8: Conditional QR code display**
    - **Validates: Requirements 4.5, 6.1, 6.5**

  - [ ]* 6.6 Write property test for QR code minimum size
    - **Property 11: QR code minimum size**
    - **Validates: Requirements 6.6**

  - [ ]* 6.7 Write property test for QR code labeling
    - **Property 19: QR code labeling**
    - **Validates: Requirements 6.4**

- [x] 7. Checkpoint - Ensure all tests pass


  - Ensure all tests pass, ask the user if questions arise.

- [x] 8. Add clipboard functionality

  - [x] 8.1 Implement copy to clipboard feature

    - Add copy buttons next to each QR code
    - Write copyToClipboard(text) function using Clipboard API
    - Show success/error feedback messages
    - Handle clipboard API failures gracefully
    - _Requirements: 7.1, 7.2, 7.3, 7.4_

  - [ ]* 8.2 Write property test for copy to clipboard functionality
    - **Property 12: Copy to clipboard functionality**
    - **Validates: Requirements 7.2, 7.3**

  - [ ]* 8.3 Write property test for copy button presence
    - **Property 20: Copy button presence**
    - **Validates: Requirements 7.1**

- [x] 9. Implement dark mode toggle

  - [x] 9.1 Create theme management system

    - Write detectSystemTheme() function
    - Write toggleTheme() function
    - Write applyTheme(theme) function
    - Write saveTheme(theme) and loadTheme() functions for localStorage
    - _Requirements: 8.1, 8.3, 8.4, 12.5_

  - [x] 9.2 Build theme toggle UI

    - Add toggle button to header
    - Apply theme classes to document root
    - Define CSS variables for light and dark themes
    - Style all components for both themes
    - _Requirements: 8.2, 8.5_

  - [ ]* 9.3 Write property test for theme persistence
    - **Property 13: Theme persistence**
    - **Validates: Requirements 8.4, 12.5**

  - [ ]* 9.4 Write property test for theme toggle reactivity
    - **Property 14: Theme toggle reactivity**
    - **Validates: Requirements 8.3**

- [x] 10. Add print functionality

  - [x] 10.1 Implement print feature

    - Add print button to UI
    - Write triggerPrint() function
    - Create print-specific CSS with @media print
    - Hide UI controls (buttons, sliders) in print view
    - Ensure QR codes and amounts are visible in print
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_

  - [ ]* 10.2 Write property test for print content inclusion
    - **Property 15: Print content inclusion**
    - **Validates: Requirements 9.3, 9.4**

- [x] 11. Implement responsive design

  - [x] 11.1 Add mobile-first CSS

    - Create single-column layout for mobile (< 768px)
    - Ensure touch targets are at least 44x44 pixels
    - Scale QR codes appropriately for mobile screens
    - Add responsive typography
    - _Requirements: 10.1, 10.2, 10.3, 10.4_

  - [x] 11.2 Add desktop optimizations

    - Create multi-column layout for desktop (>= 768px)
    - Optimize horizontal space usage
    - Adjust spacing and sizing for larger screens
    - _Requirements: 10.5_

  - [ ]* 11.3 Write property test for responsive layout adaptation
    - **Property 16: Responsive layout adaptation**
    - **Validates: Requirements 10.1, 10.5**

  - [ ]* 11.4 Write property test for touch target accessibility
    - **Property 17: Touch target accessibility**
    - **Validates: Requirements 10.2**

- [x] 12. Polish UI and add final touches


  - Add loading states for QR code generation
  - Add smooth transitions for theme switching
  - Add hover effects for buttons
  - Ensure proper focus states for accessibility
  - Add favicon and page title
  - Test all functionality in different browsers
  - _Requirements: All_

- [x] 13. Final Checkpoint - Ensure all tests pass

  - Ensure all tests pass, ask the user if questions arise.

- [x] 14. Create deployment-ready package




  - Verify all CDN links are working
  - Test local file opening (file:// protocol)
  - Add comments to code for clarity
  - Create README with usage instructions
  - Test on multiple devices and browsers
  - _Requirements: 12.2, 12.3, 12.4_
