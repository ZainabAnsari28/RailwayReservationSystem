package com.RailwayReservationAdminManagement.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.RailwayReservationAdminManagement.model.TrainDetails;

public interface AdminService 
{
	public List<TrainDetails> getAllDetails();
	public TrainDetails getDetailsByTrainNo(int trainNo);
	public TrainDetails addTrainDetails(TrainDetails trainDetails);
	public TrainDetails updateTrainDetails(int trainNo,TrainDetails trainDetails);
	public ResponseEntity<TrainDetails> deleteTrainDetails(int trainNo);

}
