package com.nyx.athena.controller

import com.nyx.athena.service.EnrolmentService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.util.*

@RestController
@RequestMapping("/api")
class EnrolmentController {
    @Autowired
    private lateinit var enrolmentService: EnrolmentService

    @PostMapping("/enrolment/enrol/{courseId}")
    fun enrol(@PathVariable courseId: UUID) {
        enrolmentService.enrol(courseId)
    }
}
