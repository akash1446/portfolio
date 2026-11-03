package com.akash.portfolio;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "contact_messages")
public class ContactMessage {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, length = 100) private String name;
    @Column(nullable = false, length = 150) private String email;
    @Column(nullable = false, length = 2000) private String message;
    @Column(nullable = false) private LocalDateTime createdAt = LocalDateTime.now();

    protected ContactMessage() {}
    public ContactMessage(String name, String email, String message) {
        this.name = name; this.email = email; this.message = message;
    }
}