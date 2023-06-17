package com.RailwayUserManagenet.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.RailwayUserManagenet.model.TrainDetails;
import com.RailwayUserManagenet.model.UserSignUp;
import com.RailwayUserManagenet.service.SignUpService;
import com.RailwayUserManagenet.service.UserServiceImpl;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/users")
public class UserManagementController {
	@Autowired
	private SignUpService signUpService;

	@Autowired
	private UserServiceImpl userServiceImpl;

	/** This Method Is Used To Add User Details **/
	@PostMapping("/signup")
	public ResponseEntity<String> saveUser(@RequestBody UserSignUp userSignUp) {
		try {
			boolean usernameExists = signUpService.checkUsernameExists(userSignUp.getUsername());
	        if (usernameExists) {
	            return ResponseEntity.status(HttpStatus.CONFLICT).body("Username already exists");
	        }

	        signUpService.addUser(userSignUp);
	        return ResponseEntity.ok("Added successfully");
		} catch (Exception e) {
			System.out.println(e);
			e.printStackTrace();
			return  ResponseEntity.status(HttpStatus.NOT_FOUND).body("Username already exist!!");
		}
		
		
	
	}
	

	/** This Method Is Used To Display All Users **/
	@GetMapping("/allusers")
	public List<UserSignUp> findAllUsers() {
		return signUpService.getuser();
	}

	/** This Method Is Used To Display All Trains Available For The Users **/
	@GetMapping("/alltrains")
	public List<TrainDetails> getAllDetails() {
		return userServiceImpl.getAllDetails();
	}

	/** This Method Is Used To Display Train Details Using TrainNo **/
	@GetMapping("/trainNo/{trainNo}")
	public TrainDetails getDetailsByTrainNo(@PathVariable Integer trainNo) {
		return userServiceImpl.getDetailsByTrainNo(trainNo);
	}

	/**
	 * This Method Is Used To Display Train Details Using Source And Destination
	 **/
	@GetMapping("/route/{sourceStation}/{destinationStation}")
	public List<TrainDetails> getTrainDetailsByStartStation(@PathVariable String sourceStation,
			@PathVariable String destinationStation) {
		return userServiceImpl.getTrainDetailsByEndPoints(sourceStation, destinationStation);
	}

}
