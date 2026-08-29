package com.daksh.springboard;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;


@SpringBootApplication
@EnableScheduling
public class SpringboardApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringboardApplication.class, args);
	}

}
