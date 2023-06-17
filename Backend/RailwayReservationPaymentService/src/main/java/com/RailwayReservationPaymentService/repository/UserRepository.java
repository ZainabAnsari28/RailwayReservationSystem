package com.RailwayReservationPaymentService.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.RailwayReservationPaymentService.model.UserDetailsData;

public interface UserRepository extends JpaRepository<UserDetailsData, Integer> {

}
