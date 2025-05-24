package com.app.backend.response;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegisterResponse {
    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId id;
    private String message;
    private boolean status;
    private String token;
}
