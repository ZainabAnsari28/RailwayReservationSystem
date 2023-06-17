package com.RailwayReservationPaymentService.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Max;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Table(name = "passenger_details")
public class Passengers {

	@Id
    @Column(name = "passenger_id")
	private int passengerId;
	
	@Size(min = 3, message = "Name should be minimum of 3 characters")
	private String name;

	@NotNull
	@Max(value = 99, message = "Age cannot be more than 99")
	private int age;

	@NotNull
	@Size(max = 6, message = "Either male,female or other ")
	private String gender;
	
	@NotNull
	private long  pnrNo;
	
	


	public Passengers() {
		super();
	}
	
	

	public Passengers(int passengerId, String Name,  int age, String gender,  long pnrNo) {
		super();
		this.passengerId = passengerId;
		this.setName(Name);
		
		this.setAge(age);
		this.setGender(gender);
		
		this.setPnrNo(pnrNo);
	}



	public String getName() {
		return name;
	}



	public void setName(String name) {
		this.name = name;
	}



	public int getAge() {
		return age;
	}



	public void setAge(int age) {
		this.age = age;
	}



	public String getGender() {
		return gender;
	}



	public void setGender(String gender) {
		this.gender = gender;
	}



	public long getPnrNo() {
		return pnrNo;
	}



	public void setPnrNo(long pnrNo) {
		this.pnrNo = pnrNo;
	}



	@Override
	public String toString() {
		return "Passengers [passengerId=" + passengerId + ", name=" + name + ", age=" + age + ", gender=" + gender
				+ ", pnrNo=" + pnrNo + "]";
	}
	


}
