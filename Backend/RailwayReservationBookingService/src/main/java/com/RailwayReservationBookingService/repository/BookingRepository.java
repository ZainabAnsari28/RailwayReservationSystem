package com.RailwayReservationBookingService.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.RailwayReservationBookingService.model.UserDetails;

@Repository
public interface BookingRepository extends JpaRepository<UserDetails, Integer> {

}
