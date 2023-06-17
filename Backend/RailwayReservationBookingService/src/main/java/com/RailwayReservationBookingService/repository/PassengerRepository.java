package com.RailwayReservationBookingService.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.RailwayReservationBookingService.model.Passengers;


@Repository
public interface PassengerRepository extends JpaRepository<Passengers, Integer> {


}