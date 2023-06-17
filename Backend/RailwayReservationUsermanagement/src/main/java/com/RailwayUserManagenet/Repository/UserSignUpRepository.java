package com.RailwayUserManagenet.Repository;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.RailwayUserManagenet.model.UserSignUp;

@Repository
public interface UserSignUpRepository extends JpaRepository<UserSignUp, Integer> {
	 @Query("SELECT CASE WHEN COUNT(u) > 0 THEN true ELSE false END FROM UserSignUp u WHERE u.username = ?1")
	    boolean existsByUsername(String username);
}
