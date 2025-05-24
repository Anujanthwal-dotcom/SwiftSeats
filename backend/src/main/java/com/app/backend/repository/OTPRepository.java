package com.app.backend.repository;

import com.app.backend.model.OTP;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OTPRepository extends MongoRepository<OTP, ObjectId> {
    OTP findByEmail(String email);
    void deleteByEmail(String email);
}
