package com.RailwayUserManagenet.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.RailwayUserManagenet.model.TrainDetails;

@Repository
public interface UserRepository extends JpaRepository<TrainDetails, Integer> {

}
