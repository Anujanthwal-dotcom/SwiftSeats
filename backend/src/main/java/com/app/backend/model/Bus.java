package com.app.backend.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalTime;

@Document(collection = "buses")
@Data
public class Bus {

    @Id
    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId id;

    private String name;

    private String ownerEmail;

    private String from;

    private String to;

    private int seats;

    private int maxSeats;

    private String weekday;

    @JsonFormat(pattern = "HH:mm")
    private LocalTime timestamp;
}
