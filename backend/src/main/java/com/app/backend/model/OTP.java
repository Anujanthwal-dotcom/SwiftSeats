package com.app.backend.model;


import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "otp")
@Data
public class OTP {
    @Id
    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId id;

    private String email;

    private String otp;

    private LocalDateTime timestamp;
}
