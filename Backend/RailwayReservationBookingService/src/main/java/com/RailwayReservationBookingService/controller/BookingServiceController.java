package com.RailwayReservationBookingService.controller;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.RailwayReservationBookingService.dto.BookingResponseDto;
import com.RailwayReservationBookingService.exception.ResourceNotFoundException;
import com.RailwayReservationBookingService.model.Passengers;
import com.RailwayReservationBookingService.model.TrainDetails;
import com.RailwayReservationBookingService.model.UserDetails;
import com.RailwayReservationBookingService.repository.PassengerRepository;
import com.RailwayReservationBookingService.service.BookingServiceImpl;

@Component
@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/user")
public class BookingServiceController {
	@Autowired
	private BookingServiceImpl bookingServiceImpl;

	@Autowired
	private RestTemplate restTemplate;
	
	@Autowired
	private PassengerRepository psgR;

	private UserDetails userDetails;

	

	@GetMapping("/all")
	
	public List<UserDetails> getAll() {
		return bookingServiceImpl.getAll();
	}

	@GetMapping("/getDetailsByPnrNo/{pnrNo}")
	public UserDetails getUserDetailsById(@PathVariable long pnrNo) {
		return bookingServiceImpl.getUserDetailsById(pnrNo);
	}
 
	
	
	@PostMapping("/book")
	public ResponseEntity<?> addUserDetails(@Valid @RequestBody UserDetails userDetails) {
		System.out.println(userDetails);
	//userDetails.setId(bookingServiceImpl.getSequenceNumber(UserDetails.SEQUENCE_NAME));
	  long number = (long) Math.floor(Math.random() * 9_000_000_000L) + 1_000_000_000L;
		userDetails.setPnrNo(number);
		userDetails.setPayment("pending");
		userDetails.setBookingStatus("Booked");

		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		LocalDate localDate = LocalDate.parse(userDetails.getDate(), formatter);
		java.sql.Date sqlDate = java.sql.Date.valueOf(localDate);
		userDetails.setJourneyDate(sqlDate);
			
	int trainNo = userDetails.getTrainNo();
   int totalpassenger = userDetails.getPassengerNo();

    userDetails.setPassengerNo(totalpassenger);
    	UserDetails saveUser =bookingServiceImpl.addUserBookingDetails(userDetails);
    	
    System.out.println(userDetails.getPassengers()+"Get Passenger");
    
    List<Passengers> pass = userDetails.getPassengers().stream()
    	    .map(ans1 -> {
    	    	Passengers p=new Passengers();
    	        p.setPnrNo(saveUser.getPnrNo());
    	        p.setName(ans1.getName());
    	        p.setAge(ans1.getAge());
    	        p.setGender(ans1.getGender());
    	        p.setBookingId(saveUser.getId());
    	        return p;
    	    })
    	    .collect(Collectors.toList());
    
    pass=psgR.saveAll(pass);
	restTemplate.getForObject("http://localhost:8080/admin/updateSeats/" + trainNo + "/" + totalpassenger,
			TrainDetails.class);
	BookingResponseDto b=new BookingResponseDto(saveUser,pass);
	
	return new ResponseEntity<Object>(b,HttpStatus.OK);
	}


	@PutMapping("/cancel/{pnrNo}")
	public ResponseEntity<String> cancelUserDetailsById(@PathVariable long pnrNo) {
		try {String msg ="Ticket cancelled Successfully";
		bookingServiceImpl.cancelUserBookingDetails(pnrNo);
		bookingServiceImpl.updateUserBookingtDetails(pnrNo);
		
		return ResponseEntity.ok(msg);
		}catch(ResourceNotFoundException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Booking is not available with this PNR :"+pnrNo);
		}catch(Exception e) {return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something Went Wrong");}
		
		
		
	}
}