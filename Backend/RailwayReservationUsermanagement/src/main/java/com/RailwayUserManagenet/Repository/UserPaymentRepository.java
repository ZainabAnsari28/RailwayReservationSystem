package com.RailwayUserManagenet.Repository;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.RailwayUserManagenet.model.PaymentDetails;


@Repository
public interface UserPaymentRepository extends JpaRepository<PaymentDetails, Long> {

}
