package com.RailwayUserManagenet.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.RailwayUserManagenet.Repository.UserSignUpRepository;
import com.RailwayUserManagenet.model.UserSignUp;


@Service
public class SignUpService {

	@Autowired
	private UserSignUpRepository userSignUpRepository;

	public UserSignUp addUser(UserSignUp userSignUp) {
		return userSignUpRepository.save(userSignUp);
	}
	public boolean checkUsernameExists(String username) {
	    // Implement a method to check if the username already exists in the repository
	    // Return true if the username exists, false otherwise
	    return userSignUpRepository.existsByUsername(username);
	}

	public List<UserSignUp> getuser() {
		List<UserSignUp> s = (List<UserSignUp>) userSignUpRepository.findAll();
		return s;
	}

	

}