/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe('pk_test_51QP8ZuEtF2Lqtv9O8kg1FunK3YF9xXxeVt1oSsxe07QZHIZUOShRYHBjTYUrFcY61iQzfljEA6AT3ozj44mfPM9I00c9XZdQuA');

const TouristItineraryPay = () => {
  const location = useLocation();
  const { touristId, itineraryId } = location.state || {};
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [promoCode, setPromoCode] = useState('');
  const [discountedPrice, setDiscountedPrice] = useState(null);
  const [promoError, setPromoError] = useState('');
  const [notification, setNotification] = useState(null);
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const navigate = useNavigate(); 
  // Fetch booking details
  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const bookingResponse = await axios.get(`${import.meta.env.VITE_API_URL}/itineraries/${itineraryId}`);
        setBooking(bookingResponse.data);
        setDiscountedPrice(bookingResponse.data.price); // Set initial price
      } catch (err) {
        setError('Failed to fetch booking details');
      } finally {
        setLoading(false);
      }
    };

    if (itineraryId && touristId) {
      fetchBooking();
    }
  }, [itineraryId, touristId]);

  // Apply promo code
  const handleApplyPromoCode = async () => {
    setPromoError('');
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/promos/validate`, {
        promoCode,
        touristId,
        originalPrice: booking.price, // Pass the original price to the backend
      });
      setDiscountedPrice(response.data.discountedPrice); // Update the discounted price
    } catch (err) {
      setPromoError(err.response?.data?.message || 'Error validating promo code');
      setDiscountedPrice(booking.price); // Reset to original price on error
    }
  };

  // Handle card payment
  const handleCardPayment = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Payment failed",
        description: error.message
      });
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/touristItinerary/${itineraryId}/payment`, {
        method: 'card',
        paymentMethodId: paymentMethod.id,
        touristId,
        amount: discountedPrice, // Send the discounted price
      });
      toast({
        title: "Payment Successful",
        description: "Your tour has been booked successfully!"
      });
      setTimeout(() => navigate('/tours'), 1500);
    } catch (err) {
      console.error('Payment error:', err);
      toast({
        variant: "destructive",
        title: "Payment failed",
        description: "An error occurred while processing your payment."
      });
    }
  };

  // Handle wallet payment
  const handleWalletPayment = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/touristItinerary/${itineraryId}/payment`, {
        method: 'wallet',
        touristId,
        amount: discountedPrice, // Send the discounted price
      });
      const { remainingBalance } = response.data;
      toast({
        title: "Payment Successful",
        description: `Your tour has been booked successfully! Remaining balance: ${remainingBalance} EGP`
      });
      setTimeout(() => navigate('/tours'), 1500);
    } catch (err) {
      console.error('Wallet payment error:', err);
      toast({
        variant: "destructive",
        title: "Payment failed",
        description: "An error occurred while processing your payment."
      });
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary mb-6">
              Tourist Itinerary Payment
            </h1>
          </div>
          
          <div className="flex justify-center">
            {booking && (
              <Card className="overflow-hidden hover:shadow-lg transition-shadow w-full max-w-md">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h2 className="text-xl font-semibold text-primary mb-2">{booking.name}</h2>
                      <p className="text-primary mb-2">Original Price: {booking.price} EGP</p>
                      <p className="text-primary mb-2">
                        Discounted Price: {discountedPrice !== null && discountedPrice !== undefined
                          ? discountedPrice.toFixed(2)
                          : booking.price} EGP
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Enter promo code"
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                      <Button onClick={handleApplyPromoCode} className="w-full">Apply Promo Code</Button>
                      {promoError && <p style={{ color: 'red' }}>{promoError}</p>}
                    </div>
                    
                    <form onSubmit={handleCardPayment} className="space-y-4">
                      <CardElement className="p-2 border border-gray-300 rounded" />
                      <Button type="submit" disabled={!stripe} className="w-full">Pay with Card</Button>
                    </form>
                    <Button onClick={handleWalletPayment} className="w-full">Pay with Wallet</Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const TouristItineraryPayWrapper = () => (
  <Elements stripe={stripePromise}>
    <TouristItineraryPay />
  </Elements>
);

export default TouristItineraryPayWrapper;
