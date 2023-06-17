package com.RailwayReservationBookingService.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "passenger_details")
public class Passengers {

	public int getPassengerId() {
		return passengerId;
	}



	public void setPassengerId(int passengerId) {
		this.passengerId = passengerId;
	}



	public Integer getBookingId() {
		return bookingId;
	}



	public void setBookingId(Integer bookingId) {
		this.bookingId = bookingId;
	}



	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "passenger_id")
	private int passengerId;
	
	private String name;

	private int age;

	private String gender;
	
	@Column(name="pnr_no")
	private long  pnrNo;
	
	@Column(name="booking_id")
	private Integer bookingId;
	
	


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
