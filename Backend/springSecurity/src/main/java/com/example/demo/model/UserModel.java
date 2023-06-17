package com.example.demo.model;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "user_sign_up")
public class UserModel {


	
	private String name;
	@Id
	private String username;
	
	private String emailId;
	private Long contact;
	
	private String password;
	private String confirmpassword;
	public UserModel(){
		super();
	}


	public UserModel(String name, String emailId, Long contact, String username, String password,
			String confirmpassword) {
		super();
		this.name = name;
		this.emailId = emailId;
		this.contact = contact;
		this.username = username;
		this.password = password;
		this.confirmpassword = confirmpassword;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmailId() {
		return emailId;
	}

	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}

	public Long getContact() {
		return contact;
	}

	public void setContact(Long contact) {
		this.contact = contact;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getConfirmpassword() {
		return confirmpassword;
	}

	public void setConfirmpassword(String confirmpassword) {
		this.confirmpassword = confirmpassword;
	}

	@Override
	public String toString() {
		return "UserSignUp [name=" + name + ", emailId=" + emailId + ", contact=" + contact
				+ ", username=" + username + ", password=" + password + ", confirmpassword=" + confirmpassword + "]";
	}
} 