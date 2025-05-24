package com.app.backend.repository;

import com.app.backend.model.Bus;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BusRepository extends MongoRepository<Bus, ObjectId> {


    @Query("{ 'from': { $regex: ?0, $options: 'i' }, 'to': { $regex: ?1, $options: 'i' }, 'weekday': { $regex: ?2, $options: 'i' } }")
    List<Bus> findAvailableBuses(String from, String to, String dayOfWeek);

}
