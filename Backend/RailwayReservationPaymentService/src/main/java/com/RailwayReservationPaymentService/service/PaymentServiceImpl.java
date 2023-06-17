package com.RailwayReservationPaymentService.service;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.RailwayReservationPaymentService.exception.ResourceNotFoundException;
import com.RailwayReservationPaymentService.model.PaymentDetails;
import com.RailwayReservationPaymentService.model.UserDetailsData;
import com.RailwayReservationPaymentService.repository.UserPaymentRepository;
import com.RailwayReservationPaymentService.repository.UserRepository;


@Service
public class PaymentServiceImpl implements PaymentService {
	int id;



	@Autowired
	UserPaymentRepository userPaymentRepository;

	@Autowired
	UserRepository userRepo;

	@Override
	public List<PaymentDetails> getAll() {
		List<PaymentDetails> payDetails = userPaymentRepository.findAll();
		return payDetails;
	}

	@Override
	public String proceedToPay(PaymentDetails payment) {
		long pnrNo = payment.getPnrNo();
		List<UserDetailsData> det = userRepo.findAll();
		for (UserDetailsData x : det) {
			if (x.getPnrNo() == pnrNo) {
				id = x.getId();
			}
		}
		userRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException(
				"Cannot proceed the payment request as booking is not done with PNR Number : " + pnrNo));
		userPaymentRepository.save(payment);

		return ("Your payment for PNR Number " + payment.getPnrNo() + " is Successful...!!!");
	}

	@Override
	public String deletePayment(long pnrNo) {
		userPaymentRepository.deleteById(pnrNo);
		return "You payment for " + pnrNo + " will be credited to your account within 7 days..";
	}

	/** To Update Payment Field In User Details After Successful Payment **/
	public void updateUserPaymentDetails(long pnrNo) {
		List<UserDetailsData> details = userRepo.findAll();
		for (UserDetailsData x : details) {
			// System.out.println(x);
			if (x.getPnrNo() == pnrNo) {
				x.setPayment("Successful");
				userRepo.save(x);
			}
		}
	}



}