package com.RailwayUserManagenet.service;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.RailwayUserManagenet.Repository.UserRepository;
import com.RailwayUserManagenet.exception.ResourceNotFoundException;

import com.RailwayUserManagenet.model.TrainDetails;


@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserRepository userRepository;



	@Override
	public List<TrainDetails> getAllDetails() {
		List<TrainDetails> trainDetails = new ArrayList<TrainDetails>();
		userRepository.findAll().forEach(trainDetails1 -> trainDetails.add(trainDetails1));
		return trainDetails;
	}

	

	@Override
	public TrainDetails getDetailsByTrainNo(int trainNo) {
		return userRepository.findById(trainNo)
				.orElseThrow(() -> new ResourceNotFoundException("Train not found with number : " + trainNo));
	}

	@Override
	public List<TrainDetails> getTrainDetailsByEndPoints(String sourceStation, String destinationStation) {
		List<TrainDetails> detList = userRepository.findAll();
		List<TrainDetails> req = new ArrayList<TrainDetails>();
		for (TrainDetails tr : detList) {
			String stat = tr.getSourceStation();
			String dest = tr.getDestinationStation();
			if (stat.equals(sourceStation) && dest.equals(destinationStation)) {
				req.add(tr);
			}
		}
		return req;
	}

}