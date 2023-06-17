package com.RailwayReservationAdminManagement.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.RailwayReservationAdminManagement.exception.ResourceNotFoundException;
import com.RailwayReservationAdminManagement.model.TrainDetails;
import com.RailwayReservationAdminManagement.repository.AdminRepository;

@Service
public class AdminServiceImpl implements AdminService {
	@Autowired
	private AdminRepository adminRepository;

	@Override
	public List<TrainDetails> getAllDetails() {
		List<TrainDetails> trainDetails = new ArrayList<TrainDetails>();
		adminRepository.findAll().forEach(trainDetailsadd -> trainDetails.add(trainDetailsadd));
		if(!trainDetails.isEmpty()) {
			 return trainDetails;
		}else {
			throw new ResourceNotFoundException("No train available");
		}
		
	}

	@Override
	public TrainDetails getDetailsByTrainNo(int trainNo) {
		return adminRepository.findById(trainNo)
				.orElseThrow(() -> new ResourceNotFoundException("Train not found with number : " + trainNo));
	}

	@Override
	public TrainDetails addTrainDetails(TrainDetails trainDetails) {
		if(trainDetails.getTrainName().isEmpty() || trainDetails.getTrainName().length() == 0) {
		    throw new ResourceNotFoundException("Input field is empty");
		}
		TrainDetails t =adminRepository.save(trainDetails);
		return t;
	}

	@Override
	public TrainDetails updateTrainDetails(int trainNo, TrainDetails trainDetails) {
		TrainDetails existingDetails = adminRepository.findById(trainNo)
				.orElseThrow(() -> new ResourceNotFoundException(
						"Cannot update the given train details, as train not found with number : " + trainNo));
		existingDetails.setTrainNo(trainDetails.getTrainNo());
		existingDetails.setTrainName(trainDetails.getTrainName());
		existingDetails.setSourceStation(trainDetails.getSourceStation());
		existingDetails.setDestinationStation(trainDetails.getDestinationStation());
		existingDetails.setArrivalTime(trainDetails.getArrivalTime());
		existingDetails.setDeptTime(trainDetails.getDeptTime());
		existingDetails.setDuration(trainDetails.getDuration());
		existingDetails.setNoOfSeats(trainDetails.getNoOfSeats());
		existingDetails.setFirstClassACFare(trainDetails.getFirstClassACFare());
		existingDetails.setTwoTierAcFare(trainDetails.getTwoTierAcFare());
		existingDetails.setThreeTierAcFare(trainDetails.getThreeTierAcFare());
		existingDetails.setSleeperFare(trainDetails.getSleeperFare());
		return adminRepository.save(existingDetails);
	}

	@Override
	public ResponseEntity<TrainDetails> deleteTrainDetails(int trainNo) {
		TrainDetails existingDetails = adminRepository.findById(trainNo).orElseThrow(
				() -> new ResourceNotFoundException("Cannot delete as train not found with number : " + trainNo));
		adminRepository.delete(existingDetails);
		return ResponseEntity.ok().build();
	}
	

}