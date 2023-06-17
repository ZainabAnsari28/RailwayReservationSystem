package com.RailwayReservationBookingService.service;


import java.util.ArrayList;
import java.util.List;



import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.RailwayReservationBookingService.exception.ResourceNotFoundException;
import com.RailwayReservationBookingService.model.Passengers;
import com.RailwayReservationBookingService.model.UserDetails;
import com.RailwayReservationBookingService.repository.BookingRepository;
import com.RailwayReservationBookingService.repository.PassengerRepository;


@Service
public class BookingServiceImpl implements BookingService {

	int id;



	@Autowired
	private BookingRepository bookingRepository;
   
	@Autowired
	private PassengerRepository passengerRepository;

	@Override
	public List<UserDetails> getAll() {
		List<UserDetails> userDetails = new ArrayList<UserDetails>();
		bookingRepository.findAll().forEach(userDetails1 -> userDetails.add(userDetails1));
		System.out.println(userDetails+"User Details");
		return userDetails;
	}

	@Override
	public UserDetails getUserDetailsById(long pnrNo) {
		List<UserDetails> userDetails = bookingRepository.findAll();
		for (UserDetails x : userDetails) {
			if (x.getPnrNo() == pnrNo) {
				id = x.getId();
			}
		}
		return bookingRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("No ticket is booked with PNR Number : " + pnrNo));
	}
	@Transactional
	@Override
	public UserDetails addUserBookingDetails(UserDetails userDetails) {
		userDetails=bookingRepository.save(userDetails);
		return userDetails;

	}

	@Override
	public String cancelUserBookingDetails(long pnrNo) {
		
		String msg = ("Your booking ticket with PNR Number : " + pnrNo + " is cancelled. "
				+ "Your payment amount will be credited to your account within 5 to 7 days..!!!");
		List<UserDetails> userDetails = bookingRepository.findAll();
		for (UserDetails x : userDetails) {
			if (x.getPnrNo() == pnrNo ) {
				System.out.println(x.getBookingStatus()+"Booking Status");
				id = x.getId();
				
			}
		}
		UserDetails existingDetails = bookingRepository.findById(id).orElseThrow(
				() -> new ResourceNotFoundException("Cannot delete as booking is not done with PNR Number : " + pnrNo));
		bookingRepository.save(existingDetails);

		return msg;
	}

	public void updateUserBookingtDetails(long pnrNo) {
		List<UserDetails> userDetails = bookingRepository.findAll();
		for (UserDetails x : userDetails) {
			if (x.getPnrNo() == pnrNo) {
				x.setBookingStatus("Cancelled");
				x.setPayment("refund issued");
				bookingRepository.save(x);
			}
		}
	}
	
}