package com.daksh.springboard;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.scheduling.annotation.EnableScheduling;

import java.io.File;
import java.nio.file.Files;
import java.util.List;


@SpringBootApplication
@EnableScheduling
public class SpringboardApplication {

	public static void main(String[] args) {
		loadEnv();
		SpringApplication.run(SpringboardApplication.class, args);
	}

	@Bean
	public CommandLineRunner updateSchema(JdbcTemplate jdbcTemplate) {
		return args -> {
			try {
				jdbcTemplate.execute("ALTER TABLE clip MODIFY COLUMN content LONGTEXT");
				System.out.println("[DB] Upgraded clip.content column to LONGTEXT");
			} catch (Exception e) {
				// Handled gracefully if table does not exist or database dialect differs
			}
		};
	}

	private static void loadEnv() {
		String[] possiblePaths = {".env", "springboard/.env", "../springboard/.env"};
		for (String path : possiblePaths) {
			File file = new File(path);
			if (file.exists() && file.isFile()) {
				try {
					List<String> lines = Files.readAllLines(file.toPath());
					for (String line : lines) {
						String trimmed = line.trim();
						if (trimmed.isEmpty() || trimmed.startsWith("#")) {
							continue;
						}
						int eqIdx = trimmed.indexOf('=');
						if (eqIdx > 0) {
							String key = trimmed.substring(0, eqIdx).trim();
							String value = trimmed.substring(eqIdx + 1).trim();
							if ((value.startsWith("\"") && value.endsWith("\"")) ||
								(value.startsWith("'") && value.endsWith("'"))) {
								value = value.substring(1, value.length() - 1);
							}
							if (System.getProperty(key) == null && System.getenv(key) == null) {
								System.setProperty(key, value);
							}
						}
					}
					System.out.println("[ENV] Successfully loaded environment variables from " + file.getAbsolutePath());
					break;
				} catch (Exception e) {
					System.err.println("[ENV] Could not load .env file: " + e.getMessage());
				}
			}
		}
	}

}

