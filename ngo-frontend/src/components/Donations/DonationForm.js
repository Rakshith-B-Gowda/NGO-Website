import React, { useState, useContext } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import useDonationService from "../../services/donationService";
import { AuthContext } from "../../context/AuthContext";

const DonationForm = () => {
  const { user } = useContext(AuthContext);
  const donationService = useDonationService();

  const [donation, setDonation] = useState({
    donationType: "",
    amount: "",
    frequency: "",
    tributeType: "",
    honoreeName: "",
    message: "",
    termsAccepted: false,
  });

  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [donorInfo, setDonorInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    anonymous: false,
  });

  const validateDonationType = (donationType) => {
    if (!donationType.trim()) {
      return "Donation type is required";
    }
    return "";
  };

  const validateAmount = (amount) => {
    if (!amount) {
      return "Amount is required";
    }
    if (isNaN(amount) || Number(amount) <= 0) {
      return "Amount must be a positive number";
    }
    return "";
  };

  const validateTermsAccepted = (termsAccepted) => {
    if (!termsAccepted) {
      return "You must accept the terms and conditions";
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDonation((prevDonation) => ({ ...prevDonation, [name]: value }));
  };

  const handleDonorInfoChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDonorInfo((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleDonationDetailsChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDonation((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({});
    setError("");
    setSuccessMessage("");

    const donationTypeError = validateDonationType(donation.donationType);
    const amountError = validateAmount(donation.amount);
    const termsError = validateTermsAccepted(donation.termsAccepted);

    if (donationTypeError || amountError || termsError) {
      setErrors({
        donationType: donationTypeError,
        amount: amountError,
        termsAccepted: termsError,
      });
      window.scrollTo(0, 0); // Scroll to top on validation error
      return;
    }

    const donationData = {
      userId: user.userId,
      donationType: donation.donationType,
      amount: parseFloat(donation.amount),
      frequency: donation.frequency,
      tributeType: donation.tributeType,
      honoreeName: donation.honoreeName,
      message: donation.message,
      donorInfo: donorInfo.anonymous ? null : donorInfo,
    };

    try {
      await donationService.createDonation(donationData);
      setSuccessMessage("Donation successful! Thank you for your contribution.");
      setDonation({
        donationType: "",
        amount: "",
        frequency: "",
        tributeType: "",
        honoreeName: "",
        message: "",
        termsAccepted: false,
      });
      setDonorInfo({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        anonymous: false,
      });
      window.scrollTo(0, 0); // Scroll to top on success
    } catch (err) {
      setError(err.response && err.response.data ? err.response.data.message : "An error occurred");
      window.scrollTo(0, 0); // Scroll to top on error
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center">Make a Donation</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      <Form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: "600px" }}>
        <Form.Group controlId="formDonationType">
          <Form.Label>Donation Type</Form.Label>
          <Form.Select
            name="donationType"
            value={donation.donationType}
            isInvalid={!!errors.donationType}
            onChange={handleChange}
          >
            <option value="">Select Donation Type</option>
            <option value="MONEY">Money</option>
            <option value="CLOTHES">Clothes</option>
            <option value="FOOD">Food</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">{errors.donationType}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formAmount" className="mt-3">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter amount"
            name="amount"
            value={donation.amount}
            isInvalid={!!errors.amount}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">{errors.amount}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formFrequency" className="mt-3">
          <Form.Label>Donation Frequency</Form.Label>
          <Form.Select name="frequency" value={donation.frequency} onChange={handleDonationDetailsChange}>
            <option value="">Select Frequency</option>
            <option value="ONE_TIME">One-Time</option>
            <option value="MONTHLY">Monthly</option>
            <option value="ANNUALLY">Annually</option>
          </Form.Select>
        </Form.Group>

        <Form.Group controlId="formTributeType" className="mt-3">
          <Form.Label>Tribute Gift</Form.Label>
          <Form.Check
            type="radio"
            label="In Honor Of"
            name="tributeType"
            value="HONOR"
            checked={donation.tributeType === "HONOR"}
            onChange={handleDonationDetailsChange}
          />
          <Form.Check
            type="radio"
            label="In Memory Of"
            name="tributeType"
            value="MEMORY"
            checked={donation.tributeType === "MEMORY"}
            onChange={handleDonationDetailsChange}
          />
          {donation.tributeType && (
            <Form.Control
              type="text"
              placeholder="Honoree Name"
              name="honoreeName"
              value={donation.honoreeName}
              onChange={handleDonationDetailsChange}
              className="mt-2"
            />
          )}
        </Form.Group>

        <Form.Group controlId="formAnonymous" className="mt-3">
          <Form.Check
            type="checkbox"
            label="Make this donation anonymous"
            name="anonymous"
            checked={donorInfo.anonymous}
            onChange={handleDonorInfoChange}
          />
        </Form.Group>

        {!donorInfo.anonymous && (
          <>
            <Form.Group controlId="formFirstName" className="mt-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" name="firstName" value={donorInfo.firstName} onChange={handleDonorInfoChange} />
            </Form.Group>

            <Form.Group controlId="formLastName" className="mt-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" name="lastName" value={donorInfo.lastName} onChange={handleDonorInfoChange} />
            </Form.Group>

            <Form.Group controlId="formEmail" className="mt-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" name="email" value={donorInfo.email} onChange={handleDonorInfoChange} />
            </Form.Group>

            <Form.Group controlId="formPhone" className="mt-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="tel" name="phone" value={donorInfo.phone} onChange={handleDonorInfoChange} />
            </Form.Group>
          </>
        )}

        <Form.Group controlId="formComments" className="mt-3">
          <Form.Label>Comments or Special Instructions</Form.Label>
          <Form.Control as="textarea" rows={3} name="message" value={donation.message} onChange={handleDonationDetailsChange} />
        </Form.Group>

        <Form.Group controlId="formTerms" className="mt-3">
          <Form.Check
            type="checkbox"
            label="I agree to the terms and conditions"
            name="termsAccepted"
            checked={donation.termsAccepted}
            isInvalid={!!errors.termsAccepted}
            onChange={handleDonationDetailsChange}
          />
          <Form.Control.Feedback type="invalid">{errors.termsAccepted}</Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-4 w-100">
          Donate
        </Button>
      </Form>
    </Container>
  );
};

export default DonationForm;
