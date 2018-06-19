package com.nyx.athena.controller

import com.nyx.athena.model.Course
import com.nyx.athena.service.CourseService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api")
class CourseController {
    @Autowired
    private lateinit var courseService: CourseService

    @GetMapping("/courses/all")
    fun getAllCourses(): Set<Course> = courseService.findAll()
}
