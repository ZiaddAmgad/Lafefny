/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LandingPage from './pages/Index';
import Sign from './pages/Sign';
import About from './pages/About';
import Destinations from './pages/Destinations';
import Tours from './pages/Tours';
import TourDetails from './pages/TourDetails';
import Activities from './pages/Activities';
import ActivityDetails from './pages/ActivityDetails';
import HistoricalPlaces from './pages/HistoricalPlaces'
import HistoricalPlaceDetails from './pages/HistoricalPlaceDetails';
import Home from './components/GuestHome';
import { CurrencyProvider } from './context/CurrencyContext';
import Tutorial from './components/Tutorial';
import AdminUserManagement from './components/AdminUserManagement';
import AddAdmin from './components/AddAdmin';
import AddTourismGovernor from './components/AddTourismGovernor';
import AdminComplaintDetail from './components/AdminComplaintDetail';
import AdminComplaintList from './components/AdminComplaintList';
import ComplaintForm from './components/ComplaintForm';
import CreatePromoCode from './components/CreatePromoCode';
import EditActivityCategory from './components/EditActivityCategory';
import ActivityCategoryList from './components/ActivityCategoryList';
import PreferenceTagList from './components/PreferenceTagList';
import AddActivityCategory from './components/AddActivityCategory';
import AddPreferenceTag from './components/AddPreferenceTag';

import AddActivity from './components/AddActivity';
import EditActivity from './components/EditActivity';
import ActivityList from './components/ActivityList';

import GuestActivityList from './components/GuestActivityList';
import GuestItineraryList from './components/Guest-ItineraryList';
import GuestMuseumList from './components/GuestMuseumList';

import TouristActivityList from './components/TouristActivityList';
import TouristItineraryList from './components/Tourist-ItineraryList';
import TouristMuseumList from './components/TouristMuseumList';
import AddTouristItinerary from './components/AddTouristItinerary';
import EditTouristItinerary from './components/EditTourist-Itinerary';
import ActivityDetail from './components/ActivityDetail';
import ItineraryDetail from './components/ItineraryDetail';
import MuseumDetail from './components/MuseumDetail';
import TouristItineraryDetail from './components/tourist-ItineraryDetail';

import GuideTouristItineraryList from './components/TourGuideItineraries';
import  AddItinerary from './components/AddItinerary';
import  EditItinerary from './components/EditItinerary';
import  ItineraryList from './components/ItineraryList';

import  AddMuseum from './components/AddMuseum';
import  MuseumList from './components/MuseumList';

import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';
import ProductList from './components/ProductList';

import TouristProductList from './components/TouristProductList';
import TouristViewAllItineraries from './components/TouristViewAll-Itineraries';
import TouristSelectPreferences from './components/touristSelectPreferences';

import AdminHome from './components/AdminHome';
import AdvertiserHome from './components/AdvertiserHome';
import SellerHome from './components/SellerHome';
import TourGuideHome from './components/TourGuideHome';
import TouristHome from './components/TouristHome';
import TourismGovernorHome from './components/TourismGovernorHome';

import AddMuseumTag from './components/AddMuseumTag';
import EditPreferenceTag from './components/EditPreferenceTag';
import EditMuseum from './components/EditMuseum';
import MapMarker from './components/Map'

import UpdateTouristInfo from './components/EditTouristInfo';
import TouristInfo from './components/GetTouristInfo';
import UpdateTourGuideInfo from './components/EditTourGuideInfo';
import UpdateSellerInfo from './components/EditSellerInfo';
import SellerInfo from './components/SellerInfo';
import UpdateAdvertiserInfo from './components/EditAdvertiserInfo';
import ChangePassword from './components/ChangePassword';
import TouristHistory from './components/TouristHistory';
import TouristComplaintList from './components/TouristComplaintList'

import './styles/styles.css'
import UploadAdvertiserDocs from './components/UploadAdvertiserDocs';
import UploadSellerDocs from './components/UploadSellerDocs';
import UploadTourGuideDocs from './components/UploadTourGuideDocs'

import AdminItineraryList from './components/Admin-ItineraryList';
import AdminActivityList from './components/Admin-ActivityList';
import AdminSalesReport from './components/AdminSalesReport';
import SellerDelete from './components/SellerDelete';
import DeleteAccount from './components/DeleteAccount'


import TransportationBooking from './components/TransportationBooking';
import BookHotels from './components/BookHotels';
import RoomDetails from './components/RoomDetails';
import BookFlights from './components/BookFlights'

import TouristWishlist from './components/TouristWishlist';
import TouristCart from './components/TouristCart';
import ProtectedRoute from './components/ProtectedRoute';
import AdminNumberOfUsers from './components/AdminNumberOfUsers';
import ItineraryReport from './components/ItineraryReport';
import ActivityReport from './components/ActivityReport';
import ForgotPassword from './components/ForgetPassword';
import TouristPayment from './components/TouristPayment';
import TouristITpay from './components/TouristItineraryPay';
import ManageAddresses from './components/ManageAddresses';
import CheckoutPage from './components/CheckoutPage';
import MyOrders from './components/MyOrders';
import OrderDetails from './components/OrderDetails';
import TouristAllPay from './components/TouristAllPay';
import AddProductPage from './pages/AddProduct';
import Bookmarks from './pages/Bookmarks'
import ManageMuseums from './components/ManageMuseums';

const queryClient = new QueryClient();

const App = () => {

  return (
    <AuthProvider>
      <CurrencyProvider>
      <QueryClientProvider client={queryClient}>
      <TooltipProvider>
      <Toaster />
      <Sonner />
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/sign" element={<Sign />} />
          <Route path="/about" element={<About />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/tours" element={<Tours />} />
          <Route path="/tours/:id" element={<TourDetails />} />
          <Route path="/guestHome" element={<Home />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/activities/:id" element={<ActivityDetails />} />
          <Route path="/guest-Itineraries" element={<GuestItineraryList />} />
          <Route path="/historicalPlaces" element={<HistoricalPlaces />} />
          <Route path="/historicalPlaces/:id" element={<HistoricalPlaceDetails />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/guest-itinerary/:id" element={<TourDetails />} />

          {/* Admin Routes */}
          <Route path="/adminHome" element={<ProtectedRoute allowedRoles={['Admin']}><AdminHome /></ProtectedRoute>} />
          <Route path="/users" element={<ProtectedRoute allowedRoles={['Admin']}><AdminUserManagement /></ProtectedRoute>} />
          <Route path="/add-admin" element={<ProtectedRoute allowedRoles={['Admin']}><AddAdmin /></ProtectedRoute>} />
          <Route path="/add-tourism-governor" element={<ProtectedRoute allowedRoles={['Admin']}><AddTourismGovernor /></ProtectedRoute>} />
          <Route path="/admin/complaints" element={<ProtectedRoute allowedRoles={['Admin']}><AdminComplaintList /></ProtectedRoute>} />
          <Route path="/admin/complaints/:id" element={<ProtectedRoute allowedRoles={['Admin']}><AdminComplaintDetail /></ProtectedRoute>} />
          <Route path="/admin-itineraries" element={<ProtectedRoute allowedRoles={['Admin']}><AdminItineraryList /></ProtectedRoute>} />
          <Route path="/admin-activities" element={<ProtectedRoute allowedRoles={['Admin']}><AdminActivityList /></ProtectedRoute>} />
          <Route path="/numberOfUsers" element={<ProtectedRoute allowedRoles={['Admin']}><AdminNumberOfUsers/></ProtectedRoute>} />
          <Route path="/create-promo-code" element={<ProtectedRoute allowedRoles={['Admin']}><CreatePromoCode/></ProtectedRoute>} />
          <Route path="/admin/sales-report" element={<ProtectedRoute allowedRoles={['Admin']}><AdminSalesReport/></ProtectedRoute>} />
          {/* Tourist Routes */}
          <Route path="/touristHome" element={<ProtectedRoute allowedRoles={['Tourist']}><TouristHome /></ProtectedRoute>} />
          <Route path="/touristActivities" element={<ProtectedRoute allowedRoles={['Tourist']}><TouristActivityList /></ProtectedRoute>} />
          <Route path="/tourist-Itineraries" element={<ProtectedRoute allowedRoles={['Tourist']}><TouristItineraryList /></ProtectedRoute>} />
          <Route path="/touristAll-Itineraries" element={<ProtectedRoute allowedRoles={['Tourist']}><TouristViewAllItineraries /></ProtectedRoute>} />
          <Route path="/touristMuseums" element={<ProtectedRoute allowedRoles={['Tourist']}><TouristMuseumList /></ProtectedRoute>} />
          <Route path="/touristProducts" element={<ProtectedRoute allowedRoles={['Tourist']}><TouristProductList /></ProtectedRoute>} />
          
          
          <Route path="/touristHistory/:userID" element={<ProtectedRoute allowedRoles={['Tourist']}><TouristHistory /></ProtectedRoute>} />
          <Route path="/my-complaints" element={<ProtectedRoute allowedRoles={['Tourist']}><TouristComplaintList /></ProtectedRoute>} />
          <Route path="/tourist/wishlist" element={<ProtectedRoute allowedRoles={['Tourist']}><TouristWishlist /></ProtectedRoute>} />
          <Route path="/tourist/cart" element={<ProtectedRoute allowedRoles={['Tourist']}><TouristCart /></ProtectedRoute>} />
          <Route path="/touristEditInfo" element={<ProtectedRoute allowedRoles={['Tourist']}><UpdateTouristInfo /></ProtectedRoute>} />
          <Route path="/viewTouristInfo" element={<ProtectedRoute allowedRoles={['Tourist']}><TouristInfo /></ProtectedRoute>} />
          <Route path="/touristSelectPreferences" element={<ProtectedRoute allowedRoles={['Tourist']}><TouristSelectPreferences /></ProtectedRoute>} />
          <Route path="/tourist/payment" element={<ProtectedRoute allowedRoles={['Tourist']}><TouristPayment /></ProtectedRoute>} />
          <Route path="/tourist/Itinerarypayment" element={<ProtectedRoute allowedRoles={['Tourist']}><TouristITpay /></ProtectedRoute>} />
          <Route path="/manage-addresses" element={<ProtectedRoute allowedRoles={['Tourist']}><ManageAddresses /></ProtectedRoute>} />
          <Route path="/checkout" element={<ProtectedRoute allowedRoles={['Tourist']}><CheckoutPage /></ProtectedRoute>} />
          <Route path="/my-orders" element={<ProtectedRoute allowedRoles={['Tourist']}><MyOrders /></ProtectedRoute>} />
          <Route path="/order-details/:orderId" element={<ProtectedRoute allowedRoles={['Tourist']}><OrderDetails /></ProtectedRoute>} />
          <Route path="/tourist/AllPay" element={<ProtectedRoute allowedRoles={['Tourist']}><TouristAllPay /></ProtectedRoute>} />
          <Route path="/tutorial" element={<ProtectedRoute allowedRoles={['Tourist']}><Tutorial /></ProtectedRoute>} />

          {/* Tour Guide Routes */}
          <Route path="/tourGuideHome" element={<ProtectedRoute allowedRoles={['TourGuide']}><TourGuideHome /></ProtectedRoute>} />
          <Route path="/guide-tourist-Itineraries" element={<ProtectedRoute allowedRoles={['TourGuide']}><GuideTouristItineraryList /></ProtectedRoute>} />
          <Route path="/viewTourGuideInfo" element={<ProtectedRoute allowedRoles={['TourGuide']}><UpdateTourGuideInfo /></ProtectedRoute>} />
          <Route path="/uploadTourGuideDocs" element={<ProtectedRoute allowedRoles={['TourGuide']}><UploadTourGuideDocs /></ProtectedRoute>} />
          <Route path="/add-itinerary" element={<ProtectedRoute allowedRoles={['TourGuide']}><AddItinerary /></ProtectedRoute>} />
          <Route path="/TourGuide-Itinerary" element={<ProtectedRoute allowedRoles={['TourGuide']}><ItineraryList /></ProtectedRoute>} />
          <Route path="/edit-itinerary/:id" element={<ProtectedRoute allowedRoles={['TourGuide']}><EditItinerary /></ProtectedRoute>} />
          <Route path="/add-tourist-itinerary" element={<ProtectedRoute allowedRoles={['TourGuide']}><AddTouristItinerary /></ProtectedRoute>} />
          <Route path="/edit-tourist-itinerary/:id" element={<ProtectedRoute allowedRoles={['TourGuide']}><EditTouristItinerary /></ProtectedRoute>} />
          
          {/* Seller Routes */}
          <Route path="/sellerHome" element={<ProtectedRoute allowedRoles={['Seller']}><SellerHome /></ProtectedRoute>} />
          <Route path="/editSellerInfo" element={<ProtectedRoute allowedRoles={['Seller']}><UpdateSellerInfo /></ProtectedRoute>} />
          <Route path="/viewSellerInfo" element={<ProtectedRoute allowedRoles={['Seller']}><UpdateSellerInfo /></ProtectedRoute>} />
          <Route path="/seller-delete/:id" element={<ProtectedRoute allowedRoles={['Seller']}><SellerDelete /></ProtectedRoute>} />
          <Route path="/uploadSellerDocs" element={<ProtectedRoute allowedRoles={['Seller']}><UploadSellerDocs /></ProtectedRoute>} />
          <Route path="/products" element={<ProtectedRoute allowedRoles={['Seller', 'Admin']}><ProductList /></ProtectedRoute>} />
          <Route path="/add-product" element={<ProtectedRoute allowedRoles={['Seller', 'Admin']}><AddProduct /></ProtectedRoute>} />
          <Route path="/edit-product/:id" element={<ProtectedRoute allowedRoles={['Seller', 'Admin']}><EditProduct /></ProtectedRoute>} />
          <Route path="/add-product" element={<ProtectedRoute allowedRoles={['Seller', 'Admin']}><AddProductPage /></ProtectedRoute>} />


          {/* Advertiser Routes */}
          <Route path="/advertiserHome" element={<ProtectedRoute allowedRoles={['Advertiser']}><AdvertiserHome /></ProtectedRoute>} />
          <Route path="/viewAdvertiserInfo" element={<ProtectedRoute allowedRoles={['Advertiser']}><UpdateAdvertiserInfo /></ProtectedRoute>} />
          <Route path="/uploadAdvertiserDocs" element={<ProtectedRoute allowedRoles={['Advertiser']}><UploadAdvertiserDocs /></ProtectedRoute>} />
          <Route path="/advertiserActivities" element={<ProtectedRoute allowedRoles={['Advertiser']}><ActivityList /></ProtectedRoute>} />
          <Route path="/add-activity" element={<ProtectedRoute allowedRoles={['Advertiser']}><AddActivity /></ProtectedRoute>} />
          <Route path="/edit-activity/:id" element={<ProtectedRoute allowedRoles={['Advertiser']}><EditActivity /></ProtectedRoute>} />

          {/* Tourism Governor Routes */}
          <Route path="/TourismGovernorHome" element={<ProtectedRoute allowedRoles={['TourismGovernor']}><TourismGovernorHome /></ProtectedRoute>} />
          <Route path="/edit-category/:id" element={<ProtectedRoute allowedRoles={['TourismGovernor', 'Admin']}><EditActivityCategory /></ProtectedRoute>} />
          <Route path="/add-activityCategory" element={<ProtectedRoute allowedRoles={['TourismGovernor', 'Admin']}><AddActivityCategory /></ProtectedRoute>} />
          <Route path="/add-preferenceTag" element={<ProtectedRoute allowedRoles={['TourismGovernor', 'Admin']}><AddPreferenceTag /></ProtectedRoute>} />
          <Route path="/activityCategories" element={<ProtectedRoute allowedRoles={['TourismGovernor', 'Admin']}><ActivityCategoryList /></ProtectedRoute>} />
          <Route path="/preferenceTags" element={<ProtectedRoute allowedRoles={['TourismGovernor', 'Admin']}><PreferenceTagList /></ProtectedRoute>} />
          <Route path="/edit-tag/:id" element={<ProtectedRoute allowedRoles={['TourismGovernor', 'Admin']}><EditPreferenceTag /></ProtectedRoute>} />
          <Route path="/add-museum-tag" element={<ProtectedRoute allowedRoles={['TourismGovernor']}><AddMuseumTag /></ProtectedRoute>} />
          <Route path="/add-museum" element={<ProtectedRoute allowedRoles={['TourismGovernor']}><AddMuseum /></ProtectedRoute>} />
          <Route path="/manage-museums" element={<ProtectedRoute allowedRoles={['TourismGovernor']}><ManageMuseums /></ProtectedRoute>} />
          <Route path="/edit-museum/:id" element={<ProtectedRoute allowedRoles={['TourismGovernor']}><EditMuseum /></ProtectedRoute>} />

          {/* Shared Protected Routes (accessible by all authenticated users) */}
          <Route path="/activities/:id" element={<ProtectedRoute allowedRoles={['Tourist', 'TourGuide', 'Advertiser', 'Seller', 'Admin', 'TourismGovernor']}><ActivityDetail /></ProtectedRoute>} />
          <Route path="/itineraries/:id" element={<ProtectedRoute allowedRoles={['Tourist', 'TourGuide', 'Advertiser', 'Seller', 'Admin', 'TourismGovernor']}><ItineraryDetail /></ProtectedRoute>} />
          <Route path="/museums/:id" element={<ProtectedRoute allowedRoles={['Tourist', 'TourGuide', 'Advertiser', 'Seller', 'Admin', 'TourismGovernor']}><MuseumDetail /></ProtectedRoute>} />
          <Route path="/complaints" element={<ProtectedRoute allowedRoles={['Tourist', 'TourGuide', 'Advertiser', 'Seller']}><ComplaintForm /></ProtectedRoute>} />
          <Route path="/changePassword" element={<ProtectedRoute allowedRoles={['Tourist', 'TourGuide', 'Advertiser', 'Seller', 'Admin', 'TourismGovernor']}><ChangePassword /></ProtectedRoute>} />
          <Route path="/delete-account" element={<ProtectedRoute allowedRoles={['Tourist', 'TourGuide', 'Advertiser', 'Seller']}><DeleteAccount /></ProtectedRoute>} />
          <Route path="/map" element={<ProtectedRoute allowedRoles={['Tourist', 'TourGuide', 'Advertiser', 'Seller', 'Admin', 'TourismGovernor']}><MapMarker /></ProtectedRoute>} />

          {/* Transportation Routes (Tourist only) */}
          <Route path="/transportation-booking" element={<ProtectedRoute allowedRoles={['Tourist']}><TransportationBooking /></ProtectedRoute>} />
          <Route path="/book-flights" element={<ProtectedRoute allowedRoles={['Tourist']}><BookFlights /></ProtectedRoute>} />
          <Route path="/book-hotels" element={<ProtectedRoute allowedRoles={['Tourist']}><BookHotels /></ProtectedRoute>} />
          <Route path="/room-details/:hotelId" element={<ProtectedRoute allowedRoles={['Tourist']}><RoomDetails /></ProtectedRoute>} />

          {/* Reports (Admin only) */}
          <Route path="/viewItinerariesReport" element={<ProtectedRoute allowedRoles={['Admin','TourGuide']}><ItineraryReport /></ProtectedRoute>} />
          <Route path="/ActivityReport" element={<ProtectedRoute allowedRoles={['Admin','Advertiser']}><ActivityReport /></ProtectedRoute>} />
        </Routes>
      </Router>
      </TooltipProvider>
    </QueryClientProvider>
    </CurrencyProvider>
    </AuthProvider>
  );
};

export default App;
