package com.CaseStudy.AdminSecurity.model;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="admin_security")
public class UserModel {
  
	
	@Id
	private String Id;
	private String username;
	private String password;
	
	public UserModel() {
		}

	public String getId() {
		return Id;
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
}
