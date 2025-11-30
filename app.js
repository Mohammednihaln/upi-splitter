// ============================================
// CALCULATION ENGINE
// ============================================

/**
 * Calculate base amount from total and GST rate
 * Formula: Base = Total / (1 + GST_Rate/100)
 */
function calculateBaseAmount(total, gstRate) {
    if (typeof total !== 'number' || typeof gstRate !== 'number') {
        return 0;
    }
    if (total <= 0) {
        return 0;
    }
    const base = total / (1 + gstRate / 100);
    return Math.round(base * 100) / 100; // Round to 2 decimal places
}

/**
 * Calculate GST amount from total and base amount
 * Formula: GST = Total - Base
 */
function calculateGstAmount(total, baseAmount) {
    if (typeof total !== 'number' || typeof baseAmount !== 'number') {
        return 0;
    }
    const gst = total - baseAmount;
    return Math.round(gst * 100) / 100; // Round to 2 decimal places
}

/**
 * Calculate advance amount from total and advance percentage
 * Formula: Advance = Total * (Advance_Percent/100)
 */
function calculateAdvanceAmount(total, advancePercent) {
    if (typeof total !== 'number' || typeof advancePercent !== 'number') {
        return 0;
    }
    if (total <= 0 || advancePercent < 0) {
        return 0;
    }
    const advance = total * (advancePercent / 100);
    return Math.round(advance * 100) / 100; // Round to 2 decimal places
}

/**
 * Format amount as currency with rupee symbol
 */
function formatCurrency(amount) {
    if (typeof amount !== 'number' || isNaN(amount)) {
        return '₹0.00';
    }
    return '₹' + amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// ============================================
// VALIDATION
// ============================================

/**
 * Validate total amount
 */
function validateTotalAmount(amount) {
    if (amount === '' || amount === null || amount === undefined) {
        return { isValid: false, errorMessage: 'Total amount is required' };
    }
    const num = parseFloat(amount);
    if (isNaN(num) || num <= 0) {
        return { isValid: false, errorMessage: 'Total amount must be greater than zero' };
    }
    return { isValid: true, errorMessage: '' };
}

/**
 * Validate UPI ID format
 * Pattern: alphanumeric@alphanumeric (with hyphens, dots, underscores allowed in username)
 */
function validateUpiId(upiId) {
    if (!upiId || upiId.trim() === '') {
        return { isValid: false, errorMessage: 'UPI ID is required' };
    }
    // Regex: username (alphanumeric with .-_) @ bank (alphanumeric with .-_)
    const upiPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+$/;
    if (!upiPattern.test(upiId.trim())) {
        return { isValid: false, errorMessage: 'Invalid UPI ID format. Use: username@bank' };
    }
    return { isValid: true, errorMessage: '' };
}

/**
 * Validate GST rate
 */
function validateGstRate(rate) {
    const num = parseFloat(rate);
    if (isNaN(num) || num < 0 || num > 28) {
        return { isValid: false, errorMessage: 'GST rate must be between 0% and 28%' };
    }
    return { isValid: true, errorMessage: '' };
}

/**
 * Validate advance percentage
 */
function validateAdvancePercent(percent) {
    const num = parseFloat(percent);
    if (isNaN(num) || num < 0 || num > 100) {
        return { isValid: false, errorMessage: 'Advance percentage must be between 0% and 100%' };
    }
    return { isValid: true, errorMessage: '' };
}

/**
 * Check if form is valid
 */
function isFormValid() {
    const totalAmount = document.getElementById('totalAmount').value;
    const upiId = document.getElementById('upiId').value;
    
    const totalValidation = validateTotalAmount(totalAmount);
    const upiValidation = validateUpiId(upiId);
    
    return totalValidation.isValid && upiValidation.isValid;
}

// ============================================
// UPI LINK GENERATION
// ============================================

/**
 * Generate UPI payment link
 * Format: upi://pay?pa={UPI_ID}&am={AMOUNT}&tn={DESCRIPTION}&cu=INR
 */
function generateUpiLink(upiId, amount, description) {
    if (!upiId || amount <= 0) {
        return '';
    }
    const formattedAmount = amount.toFixed(2);
    return `upi://pay?pa=${encodeURIComponent(upiId)}&am=${formattedAmount}&tn=${encodeURIComponent(description)}&cu=INR`;
}

// ============================================
// QR CODE MANAGEMENT
// ============================================

let currentUpiLinks = {
    base: '',
    gst: '',
    advance: ''
};

/**
 * Generate UPI link display (replaces QR code with clickable text)
 */
function generateQrCode(containerId, upiLink) {
    const container = document.getElementById(containerId);
    if (!container || !upiLink) {
        return;
    }
    
    // Clear previous content
    container.innerHTML = '';
    
    // Create text display for UPI link
    const linkText = document.createElement('div');
    linkText.className = 'upi-link-text';
    linkText.textContent = upiLink;
    
    container.appendChild(linkText);
    
    // Make container clickable to copy
    container.onclick = async function() {
        const success = await copyToClipboard(upiLink);
        showToast(success ? 'UPI link copied to clipboard!' : 'Failed to copy link', success ? 'success' : 'error');
    };
}

/**
 * Update QR codes based on current values
 */
function updateQrCodes() {
    if (!isFormValid()) {
        // Hide all QR codes if form is invalid
        document.getElementById('baseQrItem').classList.remove('active');
        document.getElementById('gstQrItem').classList.remove('active');
        document.getElementById('advanceQrItem').classList.remove('active');
        return;
    }
    
    const totalAmount = parseFloat(document.getElementById('totalAmount').value);
    const gstRate = parseFloat(document.getElementById('gstRate').value);
    const advancePercent = parseFloat(document.getElementById('advancePercent').value);
    const upiId = document.getElementById('upiId').value.trim();
    
    const baseAmount = calculateBaseAmount(totalAmount, gstRate);
    const gstAmount = calculateGstAmount(totalAmount, baseAmount);
    const advanceAmount = calculateAdvanceAmount(totalAmount, advancePercent);
    
    // Generate and display Base Amount QR
    if (baseAmount > 0) {
        currentUpiLinks.base = generateUpiLink(upiId, baseAmount, 'Invoice - Base Amount');
        generateQrCode('baseQrCode', currentUpiLinks.base);
        document.getElementById('baseQrItem').classList.add('active');
    } else {
        document.getElementById('baseQrItem').classList.remove('active');
    }
    
    // Generate and display GST Amount QR
    if (gstAmount > 0) {
        currentUpiLinks.gst = generateUpiLink(upiId, gstAmount, 'Invoice - GST Amount');
        generateQrCode('gstQrCode', currentUpiLinks.gst);
        document.getElementById('gstQrItem').classList.add('active');
    } else {
        document.getElementById('gstQrItem').classList.remove('active');
    }
    
    // Generate and display Advance Amount QR
    if (advanceAmount > 0) {
        currentUpiLinks.advance = generateUpiLink(upiId, advanceAmount, 'Invoice - Advance Payment');
        generateQrCode('advanceQrCode', currentUpiLinks.advance);
        document.getElementById('advanceQrItem').classList.add('active');
    } else {
        document.getElementById('advanceQrItem').classList.remove('active');
    }
}

// ============================================
// UI UPDATE
// ============================================

/**
 * Update split amounts display table
 */
function updateSplitDisplay() {
    const totalAmount = parseFloat(document.getElementById('totalAmount').value) || 0;
    const gstRate = parseFloat(document.getElementById('gstRate').value);
    const advancePercent = parseFloat(document.getElementById('advancePercent').value);
    
    const baseAmount = calculateBaseAmount(totalAmount, gstRate);
    const gstAmount = calculateGstAmount(totalAmount, baseAmount);
    const advanceAmount = calculateAdvanceAmount(totalAmount, advancePercent);
    
    // Update table displays
    document.getElementById('baseAmountDisplay').textContent = formatCurrency(baseAmount);
    document.getElementById('gstAmountDisplay').textContent = formatCurrency(gstAmount);
    document.getElementById('advanceAmountDisplay').textContent = formatCurrency(advanceAmount);
    document.getElementById('totalAmountDisplay').textContent = formatCurrency(totalAmount);
    
    // Show/hide advance row based on percentage
    const advanceRow = document.getElementById('advanceRow');
    if (advancePercent > 0) {
        advanceRow.style.display = 'table-row';
    } else {
        advanceRow.style.display = 'table-row'; // Always show but with 0
    }
}

/**
 * Display error message
 */
function displayError(fieldId, message) {
    const errorElement = document.getElementById(fieldId + 'Error');
    const inputElement = document.getElementById(fieldId);
    
    if (errorElement && message) {
        errorElement.textContent = message;
        errorElement.classList.add('active');
        inputElement.classList.add('error');
    }
}

/**
 * Clear error message
 */
function clearError(fieldId) {
    const errorElement = document.getElementById(fieldId + 'Error');
    const inputElement = document.getElementById(fieldId);
    
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.classList.remove('active');
        inputElement.classList.remove('error');
    }
}

/**
 * Handle all input changes and update UI
 */
function handleInputChange() {
    // Validate total amount
    const totalAmount = document.getElementById('totalAmount').value;
    const totalValidation = validateTotalAmount(totalAmount);
    if (!totalValidation.isValid && totalAmount !== '') {
        displayError('totalAmount', totalValidation.errorMessage);
    } else {
        clearError('totalAmount');
    }
    
    // Validate UPI ID
    const upiId = document.getElementById('upiId').value;
    const upiValidation = validateUpiId(upiId);
    if (!upiValidation.isValid && upiId !== '') {
        displayError('upiId', upiValidation.errorMessage);
    } else {
        clearError('upiId');
    }
    
    // Update displays
    updateSplitDisplay();
    updateQrCodes();
}

// ============================================
// CLIPBOARD
// ============================================

/**
 * Copy text to clipboard
 */
async function copyToClipboard(text) {
    try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(text);
            return true;
        } else {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            document.body.appendChild(textArea);
            textArea.select();
            const success = document.execCommand('copy');
            document.body.removeChild(textArea);
            return success;
        }
    } catch (error) {
        console.error('Clipboard error:', error);
        return false;
    }
}

/**
 * Show toast notification
 */
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type} active`;
    
    setTimeout(() => {
        toast.classList.remove('active');
    }, 3000);
}

// ============================================
// THEME MANAGEMENT
// ============================================

/**
 * Detect system theme preference
 */
function detectSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    return 'light';
}

/**
 * Load saved theme from localStorage
 */
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        return savedTheme;
    }
    return detectSystemTheme();
}

/**
 * Apply theme to document
 */
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
}

/**
 * Save theme to localStorage
 */
function saveTheme(theme) {
    localStorage.setItem('theme', theme);
}

/**
 * Toggle theme
 */
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
    saveTheme(newTheme);
}

// ============================================
// PRINT
// ============================================

/**
 * Trigger print dialog
 */
function triggerPrint() {
    window.print();
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme
    const savedTheme = loadSavedTheme();
    applyTheme(savedTheme);
    
    // Get form elements
    const totalAmountInput = document.getElementById('totalAmount');
    const gstRateSlider = document.getElementById('gstRate');
    const gstRateValue = document.getElementById('gstRateValue');
    const upiIdInput = document.getElementById('upiId');
    const advancePercentSlider = document.getElementById('advancePercent');
    const advancePercentValue = document.getElementById('advancePercentValue');
    
    // Event listeners for inputs
    totalAmountInput.addEventListener('input', handleInputChange);
    upiIdInput.addEventListener('input', handleInputChange);
    
    gstRateSlider.addEventListener('input', function() {
        gstRateValue.textContent = this.value + '%';
        handleInputChange();
    });
    
    advancePercentSlider.addEventListener('input', function() {
        advancePercentValue.textContent = this.value + '%';
        handleInputChange();
    });
    
    // Theme toggle
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    
    // Print button
    document.getElementById('printBtn').addEventListener('click', triggerPrint);
    

    
    // Initial update
    handleInputChange();
});
