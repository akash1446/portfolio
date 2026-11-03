package com.akash.portfolio;

import com.fasterxml.jackson.annotation.JsonAlias;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = {"http://localhost:5500", "http://127.0.0.1:5500"}) // only needed if you use VS Code Live Server
public class ContactController {

    public record ContactRequest(
        @NotBlank @Size(max = 100) String name,
        @NotBlank @Email @Size(max = 150) String email,
        @JsonAlias({"msg", "text"}) @NotBlank @Size(max = 2000) String message,   // also accepts the old field name "msg"
        String website) {}   // "website" is a hidden honeypot field: real people leave it empty

    private final ContactRepository repo;
    private final MailService mail;

    public ContactController(ContactRepository repo, MailService mail) {
        this.repo = repo; this.mail = mail;
    }

    @PostMapping
    public ResponseEntity<Map<String, String>> submit(@Valid @RequestBody ContactRequest r) {
        if (r.website() != null && !r.website().isBlank()) {          // bot: pretend success, store nothing
            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("status", "ok"));
        }
        repo.save(new ContactMessage(r.name().trim(), r.email().trim(), r.message().trim()));
        mail.notifyOwner(r);
        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("status", "ok"));
    }
}