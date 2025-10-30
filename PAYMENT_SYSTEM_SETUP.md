# Dual Payment System - Flutterwave & Stripe Integration

## ✅ Payment Options Implemented

Your EcoSwarm platform now supports **two payment methods**:

1. **Flutterwave** - Mobile Money (MTN MoMo & Airtel Money) + Cards
2. **Stripe** - Credit/Debit Cards (Visa, Mastercard, Amex)

---

## 🎯 Features

### **Flutterwave Payment** (Recommended for Rwanda)
- ✅ **MTN Mobile Money** (MTN MoMo)
- ✅ **Airtel Money**
- ✅ Debit/Credit Cards
- ✅ Bank Transfers
- ✅ USSD
- 💰 Currency: **RWF** (Rwandan Franc)

### **Stripe Payment** (International)
- ✅ Visa
- ✅ Mastercard
- ✅ American Express
- ✅ Other major cards
- 💰 Currency: **USD** (US Dollar)

---

## 📂 Files Created/Updated

### **New Components**:

1. **`src/components/payment/PaymentMethodSelector.jsx`**
   - Main component for choosing between Flutterwave and Stripe
   - Displays both payment options with icons
   - Shows "Recommended" badge for Flutterwave (mobile money)
   - Renders appropriate payment form based on selection

2. **`src/components/payment/StripePayment.jsx`**
   - Stripe card payment form
   - Credit card validation
   - Secure payment processing
   - Error handling

3. **Updated: `src/components/payment/FlutterwavePayment.jsx`**
   - Highlights MTN MoMo and Airtel Money
   - Changed currency to RWF
   - Prioritizes mobile money in payment options
   - Shows visual badges for MTN and Airtel

4. **Updated: `src/pages/training/checkout/CheckoutPage.jsx`**
   - Two-step checkout process
   - Integrated PaymentMethodSelector
   - Simplified user information collection
   - Post-payment enrollment handling

---

## 🔄 Payment Flow

### **Step 1: User Information**
```
User clicks "Purchase" on a course/plan
  ↓
Redirected to /training/checkout?course=...
  ↓
Fills in:
  - Email Address
  - Full Name
  - Phone Number (optional, but needed for mobile money)
  ↓
Clicks "Continue to Payment"
```

### **Step 2: Payment Method Selection**
```
User sees two payment options:
  
  [Mobile Money (Recommended)]     [Credit/Debit Card]
  MTN MoMo, Airtel Money           Visa, Mastercard, Amex
  
User clicks their preferred method
  ↓
Appropriate payment form appears
```

### **Step 3A: Flutterwave (Mobile Money)**
```
User sees:
  - Payment summary in RWF
  - MTN MoMo and Airtel Money badges
  - "Pay with Flutterwave" button
  ↓
Clicks button
  ↓
Flutterwave modal opens with options:
  - Mobile Money (MTN/Airtel)
  - Card Payment
  - USSD
  - Bank Transfer
  ↓
User completes payment
  ↓
Success → Enrolled in course
```

### **Step 3B: Stripe (Credit Card)**
```
User sees:
  - Card number field
  - Expiry date field
  - CVV field
  - Name on card field
  ↓
Fills in card details
  ↓
Clicks "Pay with Stripe"
  ↓
Stripe processes payment
  ↓
Success → Enrolled in course
```

---

## 🎨 UI Design

### **Payment Method Selection**:

```
┌─────────────────────────────────────────────────────────────┐
│  Choose Payment Method                                       │
├─────────────────────────┬───────────────────────────────────┤
│  [Recommended]          │                                   │
│  ┌──────────────────┐   │  ┌──────────────────┐            │
│  │ 📱 Mobile Money  │   │  │ 💳 Credit Card   │            │
│  │                  │   │  │                  │            │
│  │ MTN MoMo,        │   │  │ Visa, Mastercard,│            │
│  │ Airtel Money     │   │  │ Amex             │            │
│  └──────────────────┘   │  └──────────────────┘            │
└─────────────────────────┴───────────────────────────────────┘
```

### **Flutterwave Payment UI**:

```
┌─────────────────────────────────────────────────────────────┐
│  Payment Summary                                            │
│  Course: IoT Fundamentals                                   │
│  Total: 50,000 RWF                                          │
├─────────────────────────────────────────────────────────────┤
│  Pay with Mobile Money                                      │
│  ┌────────────┐  ┌────────────┐                            │
│  │ MTN MoMo   │  │ Airtel $   │                            │
│  │ (Yellow)   │  │ (Red)      │                            │
│  └────────────┘  └────────────┘                            │
│  Also supports Cards & Bank Transfers                       │
├─────────────────────────────────────────────────────────────┤
│  [Pay 50,000 RWF with Flutterwave]                          │
│  🔒 Secure payment powered by Flutterwave                   │
└─────────────────────────────────────────────────────────────┘
```

### **Stripe Payment UI**:

```
┌─────────────────────────────────────────────────────────────┐
│  Payment Summary                                            │
│  Course: IoT Fundamentals                                   │
│  Total: $50.00                                              │
├─────────────────────────────────────────────────────────────┤
│  Card Number              🔒 Secured by Stripe              │
│  [1234 5678 9012 3456]                                      │
├───────────────────────────┬─────────────────────────────────┤
│  Expiry Date              │  CVV                            │
│  [MM/YY]                  │  [123]                          │
├───────────────────────────┴─────────────────────────────────┤
│  Name on Card                                               │
│  [John Doe]                                                 │
├─────────────────────────────────────────────────────────────┤
│  [Pay $50.00 with Stripe]                                   │
│  🔒 256-bit SSL encryption                                  │
└─────────────────────────────────────────────────────────────┘
```

---

## ⚙️ Configuration

### **Environment Variables**:

Add to `.env` file:

```bash
# Flutterwave
VITE_FLUTTERWAVE_PUBLIC_KEY=FLWPUBK-your-public-key-here

# Stripe (if you want to use real Stripe)
VITE_STRIPE_PUBLIC_KEY=pk_test_your-stripe-key-here
```

### **Getting API Keys**:

**Flutterwave**:
1. Sign up at https://flutterwave.com/
2. Go to Settings → API
3. Copy Public Key (starts with `FLWPUBK-`)
4. Add to `.env` file

**Stripe**:
1. Sign up at https://stripe.com/
2. Go to Developers → API keys
3. Copy Publishable key (starts with `pk_test_` or `pk_live_`)
4. Add to `.env` file

---

## 💰 Currency Configuration

### **Flutterwave - RWF (Rwandan Franc)**:
```javascript
currency: 'RWF'  // Rwandan Franc
```

**Conversion**: 
- If your course price is $50 USD
- Convert to RWF: $50 × 1,300 = 65,000 RWF (approximate)

### **Stripe - USD (US Dollar)**:
```javascript
currency: 'USD'  // US Dollar
```

**Note**: Update course prices in the database to support both currencies, or implement automatic conversion.

---

## 🧪 Testing

### **Test Flutterwave Mobile Money**:

**Test Phone Numbers**:
- MTN Rwanda: `+250780000001`
- Airtel Rwanda: `+250730000001`

**Test PIN**: Use any 4-digit PIN for test mode

**Test Cards**:
```
Card Number: 5531 8866 5214 2950
Expiry: 09/32
CVV: 564
PIN: 3310
OTP: 12345
```

### **Test Stripe Cards**:

**Success**:
```
Card: 4242 4242 4242 4242
Expiry: Any future date
CVV: Any 3 digits
```

**Decline**:
```
Card: 4000 0000 0000 0002
```

**3D Secure**:
```
Card: 4000 0025 0000 3155
```

---

## 📡 Backend Integration

### **Enrollment Endpoint**:

The checkout page calls this endpoint after successful payment:

```javascript
POST /api/training/enroll
Headers: {
  'Authorization': 'Bearer <token>',
  'Content-Type': 'application/json'
}
Body: {
  courseId: "iot-fundamentals",
  amount: 65000,
  transactionId: "flw_12345678",
  paymentMethod: "mobilemoney",
  billingCycle: "one-time"
}
```

**Add this endpoint to `backend/server.js`**:

```javascript
app.post('/api/training/enroll', authMiddleware, async (req, res) => {
  try {
    const { courseId, amount, transactionId, paymentMethod, billingCycle } = req.body;
    const userId = req.user.id;

    // Save enrollment
    await pool.query(
      `INSERT INTO enrollments (user_id, course_id, amount, transaction_id, payment_method, billing_cycle, enrolled_at)
       VALUES (?, ?, ?, ?, ?, ?, NOW())`,
      [userId, courseId, amount, transactionId, paymentMethod, billingCycle]
    );

    // Update user access
    await pool.query(
      `INSERT INTO course_access (user_id, course_id, access_granted_at, expires_at)
       VALUES (?, ?, NOW(), ?)`,
      [userId, courseId, billingCycle === 'one-time' ? null : 'DATE_ADD(NOW(), INTERVAL 1 MONTH)']
    );

    res.json({ message: 'Enrollment successful', courseId });
  } catch (error) {
    console.error('Enrollment error:', error);
    res.status(500).json({ message: 'Enrollment failed' });
  }
});
```

---

## 🗄️ Database Tables

### **Enrollments Table**:

```sql
CREATE TABLE IF NOT EXISTS enrollments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  course_id VARCHAR(100) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  transaction_id VARCHAR(255) UNIQUE,
  payment_method VARCHAR(50),
  billing_cycle VARCHAR(20),
  enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### **Course Access Table**:

```sql
CREATE TABLE IF NOT EXISTS course_access (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  course_id VARCHAR(100) NOT NULL,
  access_granted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  UNIQUE KEY unique_user_course (user_id, course_id)
);
```

---

## 🎨 Color Scheme

### **Flutterwave (Mobile Money)**:
- Background: Yellow/Orange gradient
- Button: `from-yellow-500 to-orange-600`
- Badge: MTN Yellow (#FFCC00), Airtel Red (#FF0000)

### **Stripe (Cards)**:
- Background: Blue gradient  
- Button: `from-blue-500 to-blue-600`
- Icon: Credit Card blue

### **Selection States**:
- Selected: Border green with green background tint
- Unselected: Gray border
- Hover: Shadow and slight scale

---

## 🔐 Security

### **PCI Compliance**:
- ✅ No card data stored on your server
- ✅ Stripe and Flutterwave are PCI DSS Level 1 certified
- ✅ All payments encrypted with SSL
- ✅ Tokenization used for sensitive data

### **Best Practices**:
1. Always use HTTPS in production
2. Never log payment details
3. Store only transaction IDs, not card numbers
4. Validate payment webhooks from Flutterwave/Stripe
5. Implement rate limiting on payment endpoints

---

## 📊 Payment Analytics

Track these metrics:

```javascript
// Payment method usage
SELECT 
  payment_method,
  COUNT(*) as count,
  SUM(amount) as total_revenue
FROM enrollments
GROUP BY payment_method;

// Mobile money vs cards
SELECT 
  CASE 
    WHEN payment_method = 'mobilemoney' THEN 'Mobile Money'
    WHEN payment_method = 'card' THEN 'Cards'
    ELSE 'Other'
  END as method_type,
  COUNT(*) as transactions
FROM enrollments
GROUP BY method_type;
```

---

## 🚀 Going Live

### **Flutterwave Production**:
1. Complete KYC verification
2. Get live API keys
3. Update `.env` with live keys
4. Test in production mode
5. Enable webhook URLs

### **Stripe Production**:
1. Complete business verification
2. Activate account
3. Get live API keys
4. Update `.env` with live keys
5. Set up webhooks

### **Webhook URLs**:
```
Flutterwave: https://yourdomain.com/api/webhooks/flutterwave
Stripe: https://yourdomain.com/api/webhooks/stripe
```

---

## ✅ Summary

Your payment system now offers:

✅ **Flexible payment options** for different user preferences
✅ **Mobile money** for Rwanda/Africa (MTN, Airtel)
✅ **International cards** via Stripe
✅ **Clear visual indicators** of payment methods
✅ **Secure, PCI-compliant** payment processing
✅ **Automatic enrollment** after successful payment
✅ **Two-step checkout** for better UX

Users can now pay however they prefer! 🎉💳📱
