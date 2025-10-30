import React from 'react';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import { Smartphone } from 'lucide-react';

const FlutterwavePayment = ({ course, amount, userEmail, userName, phoneNumber, onSuccess, onClose }) => {
  const paymentAmount = amount || course?.price || 0;
  const courseName = course?.title || 'Selected Item';
  
  const config = {
    public_key: import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY || 'FLWPUBK-your-public-key',
    tx_ref: Date.now().toString(),
    amount: paymentAmount,
    currency: 'RWF', // Rwandan Franc for MTN/Airtel Rwanda
    payment_options: 'mobilemoney,card', // Prioritize mobile money
    customer: {
      email: userEmail || 'customer@example.com',
      phone_number: phoneNumber || '',
      name: userName || 'Customer',
    },
    customizations: {
      title: 'EcoSwarm Training',
      description: `Payment for ${courseName}`,
      logo: window.location.origin + '/logo.svg',
    },
    meta: {
      consumer_id: Date.now(),
      consumer_mac: 'kjs9s8ss7dd'
    }
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
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="font-semibold text-yellow-900 mb-2">Payment Summary</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-yellow-600">Course:</span>
            <span className="text-yellow-900 font-medium">{courseName}</span>
          </div>
          {course?.instructor && (
            <div className="flex justify-between">
              <span className="text-yellow-600">Instructor:</span>
              <span className="text-yellow-900">{course.instructor}</span>
            </div>
          )}
          <div className="flex justify-between text-lg font-bold border-t border-yellow-200 pt-2 mt-2">
            <span className="text-yellow-900">Total:</span>
            <span className="text-yellow-900">{paymentAmount.toFixed(2)} RWF</span>
          </div>
        </div>
      </div>

      {/* Mobile Money Options */}
      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Pay with Mobile Money</h4>
        <div className="grid grid-cols-2 gap-3 mb-3">
          {/* MTN Mobile Money */}
          <div className="bg-yellow-400 text-gray-900 rounded-lg p-3 text-center">
            <Smartphone className="w-6 h-6 mx-auto mb-1" />
            <p className="text-xs font-bold">MTN MoMo</p>
          </div>
          {/* Airtel Money */}
          <div className="bg-red-500 text-white rounded-lg p-3 text-center">
            <Smartphone className="w-6 h-6 mx-auto mb-1" />
            <p className="text-xs font-bold">Airtel Money</p>
          </div>
        </div>
        <p className="text-xs text-center text-gray-600">
          Also supports Cards & Bank Transfers
        </p>
      </div>

      <button
        onClick={handlePayment}
        className="w-full px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-600 text-white font-semibold rounded-lg hover:from-yellow-600 hover:to-orange-700 transition-all duration-200 flex items-center justify-center shadow-lg"
      >
        <Smartphone className="w-5 h-5 mr-2" />
        Pay {paymentAmount.toFixed(2)} RWF with Flutterwave
      </button>

      <p className="text-xs text-center text-gray-600">
        🔒 Secure payment powered by Flutterwave. Your details are safe.
      </p>
    </div>
  );
};

export default FlutterwavePayment;
