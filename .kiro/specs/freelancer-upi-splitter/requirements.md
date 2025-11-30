# Requirements Document

## Introduction

The Freelancer UPI Payment Splitter is a single-page web application designed for Indian freelancers to split invoice payments into separate components (Base Amount, GST, and Advance) and generate individual UPI QR codes for each component. This enables clients to make split payments directly through UPI, simplifying tax compliance and payment tracking for freelancers.

## Glossary

- **UPI System**: The web application that generates split payment QR codes
- **Freelancer**: The user who inputs invoice details and generates payment QR codes
- **Client**: The payer who scans QR codes to make UPI payments
- **Base Amount**: The invoice amount excluding GST
- **GST Amount**: Goods and Services Tax calculated on the base amount
- **Advance Amount**: Optional upfront payment calculated as percentage of total
- **UPI QR Code**: Scannable Quick Response code containing UPI payment link
- **UPI ID**: Unique Payment Interface identifier in format user@bank

## Requirements

### Requirement 1

**User Story:** As a freelancer, I want to input my invoice total amount in rupees, so that the system can calculate the payment split components.

#### Acceptance Criteria

1. WHEN a freelancer enters a numeric value in the total amount field, THEN the UPI System SHALL accept values greater than zero
2. WHEN a freelancer enters an invalid value, THEN the UPI System SHALL display an error message and prevent calculation
3. WHEN the total amount changes, THEN the UPI System SHALL recalculate all split amounts immediately
4. THE UPI System SHALL display the total amount with rupee symbol and proper formatting

### Requirement 2

**User Story:** As a freelancer, I want to set the GST rate using a slider with 18% as default, so that I can accommodate different GST slabs for my services.

#### Acceptance Criteria

1. WHEN the application loads, THEN the UPI System SHALL set the GST rate to 18 percent
2. THE UPI System SHALL allow GST rate selection between 0 and 28 percent
3. WHEN the GST rate changes, THEN the UPI System SHALL recalculate base amount and GST amount immediately
4. THE UPI System SHALL display the current GST rate percentage next to the slider
5. WHEN calculating base amount, THEN the UPI System SHALL use the formula: Base = Total / (1 + GST_Rate/100)
6. WHEN calculating GST amount, THEN the UPI System SHALL use the formula: GST = Total - Base

### Requirement 3

**User Story:** As a freelancer, I want to input my client's UPI ID, so that the generated QR codes direct payments to the correct recipient.

#### Acceptance Criteria

1. WHEN a freelancer enters a UPI ID, THEN the UPI System SHALL validate the format matches pattern: alphanumeric@alphanumeric
2. WHEN an invalid UPI ID is entered, THEN the UPI System SHALL display an error message indicating the correct format
3. WHEN a valid UPI ID is entered, THEN the UPI System SHALL enable QR code generation
4. THE UPI System SHALL accept UPI IDs with hyphens, dots, and underscores in the username portion

### Requirement 4

**User Story:** As a freelancer, I want to set an optional advance payment percentage with 0% as default, so that I can request upfront payments when needed.

#### Acceptance Criteria

1. WHEN the application loads, THEN the UPI System SHALL set the advance percentage to 0 percent
2. THE UPI System SHALL allow advance percentage selection between 0 and 100 percent
3. WHEN the advance percentage changes, THEN the UPI System SHALL calculate advance amount as: Advance = Total * (Advance_Percent/100)
4. WHEN advance percentage is 0, THEN the UPI System SHALL not display the advance QR code
5. WHEN advance percentage is greater than 0, THEN the UPI System SHALL display the advance QR code

### Requirement 5

**User Story:** As a freelancer, I want to see a live preview table showing the split amounts, so that I can verify the calculations before sharing with clients.

#### Acceptance Criteria

1. THE UPI System SHALL display a table with rows for Base Amount, GST Amount, and Advance Amount
2. WHEN any input changes, THEN the UPI System SHALL update all amounts in the table immediately
3. THE UPI System SHALL format all amounts with rupee symbol and two decimal places
4. WHEN advance percentage is 0, THEN the UPI System SHALL either hide the advance row or show zero
5. THE UPI System SHALL display the total amount as a summary row in the table

### Requirement 6

**User Story:** As a freelancer, I want to generate separate scannable UPI QR codes for Base Amount, GST, and Advance, so that my client can make split payments easily.

#### Acceptance Criteria

1. WHEN all inputs are valid and amounts are greater than zero, THEN the UPI System SHALL generate QR codes for each non-zero component
2. THE UPI System SHALL format UPI links as: upi://pay?pa=CLIENT_UPI&am=AMOUNT&tn=Invoice&cu=INR
3. WHEN generating QR codes, THEN the UPI System SHALL use the qrcode.js library
4. THE UPI System SHALL display QR codes with labels indicating Base Amount, GST Amount, or Advance Amount
5. WHEN an amount is zero, THEN the UPI System SHALL not generate a QR code for that component
6. THE UPI System SHALL ensure QR codes are scannable on mobile devices with minimum size of 200x200 pixels

### Requirement 7

**User Story:** As a freelancer, I want to copy UPI payment links to clipboard, so that I can share them via messaging apps or email.

#### Acceptance Criteria

1. THE UPI System SHALL provide a copy button next to each generated QR code
2. WHEN a freelancer clicks the copy button, THEN the UPI System SHALL copy the corresponding UPI link to clipboard
3. WHEN the copy action succeeds, THEN the UPI System SHALL display a confirmation message
4. WHEN the copy action fails, THEN the UPI System SHALL display an error message

### Requirement 8

**User Story:** As a freelancer, I want a dark mode toggle, so that I can use the application comfortably in different lighting conditions.

#### Acceptance Criteria

1. WHEN the application loads, THEN the UPI System SHALL detect the user's system theme preference
2. THE UPI System SHALL provide a visible toggle button for switching between light and dark modes
3. WHEN the toggle is clicked, THEN the UPI System SHALL switch the theme immediately
4. WHEN the theme changes, THEN the UPI System SHALL persist the preference in browser local storage
5. THE UPI System SHALL apply appropriate colors for text, backgrounds, and UI elements in both themes

### Requirement 9

**User Story:** As a freelancer, I want a print/PDF button, so that I can save or print the payment split details for my records.

#### Acceptance Criteria

1. THE UPI System SHALL provide a print button visible on the interface
2. WHEN the print button is clicked, THEN the UPI System SHALL trigger the browser print dialog
3. WHEN printing, THEN the UPI System SHALL format the output to include all split amounts and QR codes
4. WHEN printing, THEN the UPI System SHALL hide UI controls like buttons and sliders from the print output
5. THE UPI System SHALL ensure QR codes remain scannable in the printed output

### Requirement 10

**User Story:** As a freelancer using a mobile device, I want a responsive mobile-first interface, so that I can generate payment splits on the go.

#### Acceptance Criteria

1. THE UPI System SHALL display all form elements in a single column on mobile screens below 768 pixels width
2. THE UPI System SHALL ensure touch targets for sliders and buttons are at least 44x44 pixels
3. WHEN viewed on mobile, THEN the UPI System SHALL scale QR codes appropriately to fit the screen
4. THE UPI System SHALL use responsive typography that remains readable on all screen sizes
5. WHEN viewed on desktop, THEN the UPI System SHALL optimize layout to use available horizontal space

### Requirement 11

**User Story:** As a freelancer, I want clear error messages when I enter invalid data, so that I can correct my inputs quickly.

#### Acceptance Criteria

1. WHEN a freelancer enters zero or negative total amount, THEN the UPI System SHALL display error message: "Total amount must be greater than zero"
2. WHEN a freelancer enters an invalid UPI ID format, THEN the UPI System SHALL display error message: "Invalid UPI ID format. Use: username@bank"
3. WHEN an error is present, THEN the UPI System SHALL disable QR code generation
4. WHEN the freelancer corrects the invalid input, THEN the UPI System SHALL clear the error message immediately
5. THE UPI System SHALL display error messages in a visually distinct style near the relevant input field

### Requirement 12

**User Story:** As a developer, I want the application to use only client-side technologies without a backend, so that it can be deployed easily and work offline.

#### Acceptance Criteria

1. THE UPI System SHALL be implemented using only HTML, CSS, and JavaScript
2. THE UPI System SHALL not require any server-side processing or API calls
3. THE UPI System SHALL load all dependencies from CDN or inline code
4. THE UPI System SHALL function correctly when opened as a local HTML file
5. THE UPI System SHALL store user preferences only in browser local storage
