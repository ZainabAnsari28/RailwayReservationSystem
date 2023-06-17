package com.Railway_Reservation_Api_Gateway.config;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GatewayConfig {
	@Bean
	public RouteLocator myRoutes(RouteLocatorBuilder routeLocatorBuilder) {
		return routeLocatorBuilder.routes()
				/** Routes For User MicroServices Starts **/
				.route(p -> p.path("/user/signup").uri("http://localhost:8081"))
				.route(p -> p.path("/user/allusers").uri("http://localhost:8081"))
				.route(p -> p.path("/user/update").uri("http://localhost:8081"))
				.route(p -> p.path("/user/delete").uri("http://localhost:8081"))
				.route(p -> p.path("/user/alltrains").uri("http://localhost:8081"))
				.route(p -> p.path("/user/status").uri("http://localhost:8081"))
				.route(p -> p.path("/user/trainNo").uri("http://localhost:8081"))
				.route(p -> p.path("/user/route").uri("http://localhost:8081"))
				/** Routes For User MicroServices Ends **/
				/** Routes For Admin MicroServices Starts **/
				.route(p -> p.path("/admin/all").uri("http://localhost:8080"))
				.route(p -> p.path("/admin/trainNo").uri("http://localhost:8080"))
				.route(p -> p.path("/admin/addtrain").uri("http://localhost:8080"))
				.route(p -> p.path("/admin/update").uri("http://localhost:8080"))
				.route(p -> p.path("/admin/delete").uri("http://localhost:8080"))
				.route(p -> p.path("/admin/updateSeats").uri("http://localhost:8080"))
				/** Routes For Admin MicroServices Ends **/
				/** Routes For Booking MicroServices Starts **/
				.route(p -> p.path("/user/all").uri("http://localhost:8085"))
				.route(p -> p.path("/user/getDetailsByPnrNo").uri("http://localhost:8085"))
				.route(p -> p.path("/user/book").uri("http://localhost:8085"))
				.route("cancelByPnrNo",
						t -> t.path("/user/cancel/**")
								.filters(rw -> rw.rewritePath("/user/cancel/(?<segment>.*)", "/user/cancel/${segment}"))
								.uri("http://localhost:8085/user/cancel/"))
				/** Routes For Booking MicroServices Ends **/
				/** Routes For Payment MicroServices Starts **/
				.route(p -> p.path("/pay/add").uri("http://localhost:8082"))
				.route("cancelByPnrNo",
						t -> t.path("/pay/cancel/**")
								.filters(rw -> rw.rewritePath("/pay/cancel/(?<segment>.*)", "/pay/cancel/${segment}"))
								.uri("http://localhost:8082/pay/cancel/"))
				/** Routes For Payment MicroServices Ends **/
				.build();
	}

}