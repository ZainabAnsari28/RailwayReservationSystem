package com.RailwayReservationBookingService.dto;


import java.util.List;



import com.RailwayReservationBookingService.model.Passengers;
import com.RailwayReservationBookingService.model.UserDetails;

public class BookingResponseDto {
	
	private int passengerId;
	
	private long  pnrNo;
	
    private Integer userDetailsId;
	private int trainNo;

	private String trainName;

	private String sourceStation;

	private String destinationStation;
	
	private String journeyDate;
	
	
	private int passengerNo;

	private String classType;
	
	private String BookingStatus;
	
	private List<Passengers> pass;
		
	public BookingResponseDto(UserDetails user,List<Passengers> pass) {
		this.pass=pass;
		this.BookingStatus=user.getBookingStatus();
		this.classType=user.getClassType();
		this.destinationStation=user.getDestinationStation();
		this.journeyDate=user.getJourneyDate().toString();
		this.passengerNo=user.getPassengerNo();
		this.pnrNo=user.getPnrNo();
		this.sourceStation=user.getSourceStation();
		this.trainName=user.getTrainName();
		this.trainNo=user.getTrainNo();
		this.userDetailsId=user.getId();
	}

	public int getPassengerId() {
		return passengerId;
	}

	public void setPassengerId(int passengerId) {
		this.passengerId = passengerId;
	}

	public List<Passengers> getPass() {
		return pass;
	}

	public void setPass(List<Passengers> name) {
		this.pass = name;
	}

	public long getPnrNo() {
		return pnrNo;
	}

	public void setPnrNo(long pnrNo) {
		this.pnrNo = pnrNo;
	}

	public Integer getUserDetailsId() {
		return userDetailsId;
	}

	public void setUserDetailsId(Integer userDetailsId) {
		this.userDetailsId = userDetailsId;
	}

	public int getTrainNo() {
		return trainNo;
	}

	public void setTrainNo(int trainNo) {
		this.trainNo = trainNo;
	}

	public String getTrainName() {
		return trainName;
	}

	public void setTrainName(String trainName) {
		this.trainName = trainName;
	}

	public String getSourceStation() {
		return sourceStation;
	}

	public void setSourceStation(String sourceStation) {
		this.sourceStation = sourceStation;
	}

	public String getDestinationStation() {
		return destinationStation;
	}

	public void setDestinationStation(String destinationStation) {
		this.destinationStation = destinationStation;
	}

	public String getJourneyDate() {
		return journeyDate;
	}

	public void setJourneyDate(String journeyDate) {
		this.journeyDate = journeyDate;
	}

	public int getPassengerNo() {
		return passengerNo;
	}

	public void setPassengerNo(int passengerNo) {
		this.passengerNo = passengerNo;
	}

	public String getClassType() {
		return classType;
	}

	public void setClassType(String classType) {
		this.classType = classType;
	}

	public String getBookingStatus() {
		return BookingStatus;
	}

	public void setBookingStatus(String bookingStatus) {
		BookingStatus = bookingStatus;
	}

	public BookingResponseDto() {
		super();
	}
	
	
}
