package com.akash.portfolio;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class MailService {
    private static final Logger log = LoggerFactory.getLogger(MailService.class);
    private final JavaMailSender sender;
    private final String to;
    private final String from;

    public MailService(JavaMailSender sender,
                       @Value("${contact.notify-to:}") String to,
                       @Value("${spring.mail.username:}") String from) {
        this.sender = sender; this.to = to; this.from = from;
    }

    /** Runs in the background so a slow or failing mail server never blocks or breaks the form. */
    @Async
    public void notifyOwner(ContactController.ContactRequest r) {
        if (to.isBlank()) { log.warn("MAIL_USER not set - skipping email"); return; }
        try {
            SimpleMailMessage m = new SimpleMailMessage();
            m.setFrom(from);
            m.setTo(to);
            m.setReplyTo(r.email());
            m.setSubject("Portfolio message from " + r.name().replaceAll("[\\r\\n]", " "));
            m.setText("Name: " + r.name() + "\nEmail: " + r.email() + "\n\n" + r.message());
            sender.send(m);
        } catch (Exception e) {
            log.error("Email failed (message is still saved in the database): {}", e.getMessage());
        }
    }
}