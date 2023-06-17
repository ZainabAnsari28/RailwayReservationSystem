package com.RailwayReservationPaymentService.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.RailwayReservationPaymentService.model.PaymentDetails;
import com.RailwayReservationPaymentService.service.PaymentServiceImpl;


@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/pay")
public class PaymentController {
   @Autowired
   PaymentServiceImpl paymentServiceImpl;

	@GetMapping("/all")
	public List<PaymentDetails> getAll() {
		return paymentServiceImpl.getAll();
	}

	@PostMapping("/add")
	public String addPaymentDetails(@Valid @RequestBody PaymentDetails payment) {
	
		paymentServiceImpl.proceedToPay(payment);
		paymentServiceImpl.updateUserPaymentDetails(payment.getPnrNo());
		String sentMsg = "Your payment is successful";
		return sentMsg;
	}

	@RequestMapping(value = "/cancel/{pnrNo}", method = { RequestMethod.GET, RequestMethod.DELETE })
	public String deletePaymentDetails(@PathVariable long pnrNo) {
		return paymentServiceImpl.deletePayment(pnrNo);
	}


}