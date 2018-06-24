package com.nyx.athena.controller

import com.nyx.athena.model.Course
import com.nyx.athena.service.CourseService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api")
class CourseController {
    @Autowired
    private lateinit var courseService: CourseService

    @GetMapping("/courses/enrolments")
    fun getEnrolCourses(): Set<Course> = courseService.getEnrolCourses()

    @GetMapping("/courses/all")
    fun getAllCourses(): Set<Course> = courseService.findAll()

    @PostMapping("/courses/save")
    fun saveCourse(@RequestBody course: Course) {
        courseService.save(course)
    }
}
