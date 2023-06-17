package com.RailwayReservationPaymentService.service;

import java.util.List;

import com.RailwayReservationPaymentService.model.PaymentDetails;

public interface PaymentService 
{
	public List<PaymentDetails> getAll();
	public String proceedToPay(PaymentDetails payment);
	public String deletePayment(long pnrNo);
}

