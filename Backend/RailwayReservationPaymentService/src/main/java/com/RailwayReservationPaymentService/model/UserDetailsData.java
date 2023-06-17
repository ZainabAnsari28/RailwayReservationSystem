package com.RailwayReservationPaymentService.model;



import java.sql.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.Max;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Table(name = "booking_details")
public class UserDetailsData {
	@Transient
	public static final String SEQUENCE_NAME = "users_sequence";

	
	
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
	
	@NotNull
	@Column(name="pnr_no")
	private long pnrNo;

	@NotNull
	@Max(value = 99999, message = "Train number cannot exceed 5 digits")
	@Column(name="train_no")
	private int trainNo;

	@NotNull
	@Size(min = 5, message = "Train name should be minimum of 5 characters")
	@Column(name="train_name")
	private String trainName;

	@NotNull
	@Size(min = 2, message = "Start Station should be minimum of 2 characters")
	@Column(name="source_station")
	private String sourceStation;

	@NotNull
	@Size(min = 2, message = "Destination Station should be minimum of 2 characters")
	@Column(name="destination_station")
	private String destinationStation;
	
	@Column(name="journey_date")
	private Date journeyDate;
	public Date getJourneyDate() {
		return journeyDate;
	}
	
	@Transient
	private String date;

	public void setJourneyDate(Date journeyDate) {
		this.journeyDate = journeyDate;
	}
	
	public String getDate() {
		return this.date;
	}

	@NotNull
	@Column(name="passenger_no")
	private int passengerNo;

	@NotNull
	@Size(min = 2, message = "Class type should be minimum of 2 characters")
	@Column(name="class_type")
	private String classType;


	private String payment;
	 @Transient
	    private List<Passengers> passengerDetails;

	public List<Passengers> getPassengerDetails() {
		return passengerDetails;
	}

	public void setPassengerDetails(List<Passengers> passengerDetails) {
		this.passengerDetails = passengerDetails;
	}

	public UserDetailsData() {
		super();
	}

	public UserDetailsData(@NotNull Integer id, @NotNull long pnrNo,

			@NotNull @Max(value = 99999, message = "Train number cannot exceed 5 digits") int trainNo,
			@NotNull @Size(min = 5, message = "Train name should be minimum of 5 characters") String trainName,
			@NotNull @Size(min = 2, message = "Start Station should be minimum of 2 characters") String sourceStation,
			@NotNull @Size(min = 2, message = "Destination Station should be minimum of 2 characters") String destinationStation,
			@NotNull @Size(min = 2, message = "Class type should be minimum of 2 characters") String classType,
		   @NotNull String payment, @NotNull int passengerNo, List<Passengers> passengerDetails) {
		super();
		this.id = id;
		this.pnrNo = pnrNo;

		this.trainNo = trainNo;
		this.trainName = trainName;
		this.sourceStation = sourceStation;
		this.destinationStation = destinationStation;
		this.classType = classType;
		this.passengerNo=passengerNo;

		this.payment = payment;
		this.passengerDetails = passengerDetails;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public long getPnrNo() {
		return pnrNo;
	}

	public void setPnrNo( long pnrNo) { 

		this.pnrNo = pnrNo;
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

	public String getClassType() {
		return classType;
	}

	public void setClassType(String classType) {
		this.classType = classType;
	}


	public String getPayment() {
		return payment;
	}

	public void setPayment(String payment) {
		this.payment = payment;
	}

	public static String getSequenceName() {
		return SEQUENCE_NAME;
	}

	@Override
	public String toString() {
		return "UserDetails [id=" + id + ", pnrNo=" + pnrNo + ", trainNo=" + trainNo + ", trainName=" + trainName
				+ ", sourceStation=" + sourceStation + ", destinationStation=" + destinationStation + ", classType="
				+ classType + ", payment=" + payment + "]";
	}

	public int getPassengerNo() {
		return passengerNo;
	}

	public void setPassengerNo(int passengerNo) {
		this.passengerNo = passengerNo;
	}


	
	

}