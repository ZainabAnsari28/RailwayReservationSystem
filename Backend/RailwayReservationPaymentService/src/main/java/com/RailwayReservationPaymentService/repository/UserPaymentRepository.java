package com.RailwayReservationPaymentService.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.RailwayReservationPaymentService.model.PaymentDetails;


@Repository
public interface UserPaymentRepository extends JpaRepository<PaymentDetails, Long> {

}
