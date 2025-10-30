import React from 'react';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import { CreditCard } from 'lucide-react';

const FlutterwavePayment = ({ course, userEmail, userName, onSuccess, onClose }) => {
  const config = {
    public_key: import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY || 'FLWPUBK-your-public-key',
    tx_ref: Date.now().toString(),
    amount: course.price,
    currency: 'USD',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: userEmail,
      phone_number: '',
      name: userName,
    },
    customizations: {
      title: 'EcoSwarm Training',
      description: `Payment for ${course.title}`,
      logo: 'https://your-logo-url.com/logo.png',
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  const handlePayment = () => {
    handleFlutterPayment({
      callback: (response) => {
        console.log('Payment response:', response);
        closePaymentModal();
        
        if (response.status === 'successful') {
          // Payment successful
          onSuccess(response);
        } else {
          alert('Payment was not successful. Please try again.');
        }
      },
      onClose: () => {
        console.log('Payment modal closed');
        if (onClose) onClose();
      },
    });
  };

  return (
    <div className="space-y-4">
      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
        <h3 className="font-semibold text-emerald-900 mb-2">Payment Summary</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-emerald-600">Course:</span>
            <span className="text-emerald-900 font-medium">{course.title}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-emerald-600">Instructor:</span>
            <span className="text-emerald-900">{course.instructor}</span>
          </div>
          <div className="flex justify-between text-lg font-bold border-t border-emerald-200 pt-2 mt-2">
            <span className="text-emerald-900">Total:</span>
            <span className="text-emerald-900">${course.price.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <button
        onClick={handlePayment}
        className="w-full px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold rounded-lg hover:from-emerald-600 hover:to-green-700 transition-all duration-200 flex items-center justify-center"
      >
        <CreditCard className="w-5 h-5 mr-2" />
        Pay ${course.price.toFixed(2)} with Flutterwave
      </button>

      <p className="text-xs text-center text-emerald-600">
        Secure payment powered by Flutterwave. Your card details are safe.
      </p>
    </div>
  );
};

export default FlutterwavePayment;
