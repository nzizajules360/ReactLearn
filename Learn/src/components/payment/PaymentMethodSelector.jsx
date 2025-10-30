import React, { useState } from 'react';
import { Smartphone, CreditCard, Check } from 'lucide-react';
import FlutterwavePayment from './FlutterwavePayment';
import StripePayment from './StripePayment';

const PaymentMethodSelector = ({ course, amount, userEmail, userName, phoneNumber, onSuccess, onClose, initialProvider }) => {
  const [selectedMethod, setSelectedMethod] = useState(initialProvider || 'flutterwave');

  const paymentMethods = [
    {
      id: 'flutterwave',
      name: 'Mobile Money',
      description: 'MTN MoMo, Airtel Money',
      icon: Smartphone,
      color: 'from-yellow-400 to-orange-500',
      textColor: 'text-yellow-900',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-300',
      recommended: true
    },
    {
      id: 'stripe',
      name: 'Credit/Debit Card',
      description: 'Visa, Mastercard, Amex',
      icon: CreditCard,
      color: 'from-blue-500 to-indigo-600',
      textColor: 'text-blue-900',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-300',
      recommended: false
    }
  ];

  return (
    <div className="space-y-6">
      {/* Payment Method Selection */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">Choose Payment Method</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {paymentMethods.map((method) => {
            const Icon = method.icon;
            const isSelected = selectedMethod === method.id;
            
            return (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`relative p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                  isSelected
                    ? `${method.borderColor} ${method.bgColor} shadow-lg scale-105`
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                }`}
              >
                {/* Recommended Badge */}
                {method.recommended && (
                  <div className="absolute -top-2 -right-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                    Recommended
                  </div>
                )}

                {/* Selection Indicator */}
                {isSelected && (
                  <div className="absolute top-3 right-3">
                    <div className="w-6 h-6 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  </div>
                )}

                <div className="flex items-start space-x-3">
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${method.color}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-semibold ${isSelected ? method.textColor : 'text-gray-900'}`}>
                      {method.name}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {method.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Payment Component */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        {selectedMethod === 'flutterwave' ? (
          <FlutterwavePayment
            course={course}
            amount={amount}
            userEmail={userEmail}
            userName={userName}
            phoneNumber={phoneNumber}
            onSuccess={onSuccess}
            onClose={onClose}
          />
        ) : (
          <StripePayment
            course={course}
            amount={amount}
            onSuccess={onSuccess}
            onClose={onClose}
          />
        )}
      </div>

      {/* Security Notice */}
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
              <Check className="w-5 h-5 text-emerald-600" />
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-1">100% Secure Payments</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>✓ PCI DSS compliant payment processing</li>
              <li>✓ 256-bit SSL encryption</li>
              <li>✓ Your card details are never stored</li>
              <li>✓ 30-day money-back guarantee</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodSelector;
