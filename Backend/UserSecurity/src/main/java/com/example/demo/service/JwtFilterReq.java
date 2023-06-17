package com.example.demo.service;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Service;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.demo.utils.JwtUtils;

@Service
public class JwtFilterReq extends OncePerRequestFilter{

	@Autowired
	private JwtUtils jwtUtil;
	
	@Autowired
	private UserService userservice;
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		String authorizationHeader= request.getHeader("Authorization");
		
		String username=null;
		String jwtToken =null;
		if (authorizationHeader != null && authorizationHeader.startsWith("bearer ")) {
			jwtToken= authorizationHeader.substring(7);
			username=jwtUtil.extractUsername(jwtToken);
			}
		if (username != null && SecurityContextHolder.getContext().getAuthentication()==null) {
			UserDetails currentUserDetails=userservice.loadUserByUsername(username);
			Boolean token= jwtUtil.validateToken(jwtToken, currentUserDetails);
			if (token) {
			UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken=
					new UsernamePasswordAuthenticationToken(currentUserDetails, null, currentUserDetails.getAuthorities());
			usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource()
					.buildDetails(request));
			SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
			}
		}
		filterChain.doFilter(request, response);
	}

}
