package com.RailwayReservationAdminManagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.RailwayReservationAdminManagement.model.TrainDetails;


public interface AdminRepository  extends JpaRepository<TrainDetails,Integer>	{

}
